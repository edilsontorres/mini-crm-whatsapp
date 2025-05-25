using Microsoft.EntityFrameworkCore;
using MiniCrm.Api.Data;
using MiniCrm.Api.Dtos;
using MiniCrm.Api.Dtos.Webhook;
using MiniCrm.Api.Entities;
using MiniCrm.Api.Services.Interfaces;

namespace MiniCrm.Api.Services
{
    public class WebhookService : IWebhookService
    {
        private readonly MiniCrmContext _context;
        private readonly HttpClient _httpClient;
        private readonly IWebHostEnvironment _env;
        private readonly IHttpContextAccessor _httpContextAccessor;



        public WebhookService(MiniCrmContext context, HttpClient httpClient, IWebHostEnvironment env, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpClient = httpClient;
            _env = env;
            _httpContextAccessor = httpContextAccessor;

        }
        public async Task HandleIncomingMessageAsync(IncomingMessageDto dto)
        {
            var client = await _context.Clients.FirstOrDefaultAsync(c => c.PhoneNumber == dto.PhoneNumber);
            if (client == null)
            {
                client = new Client
                {
                    Name = dto.ClientName ?? "Client",
                    PhoneNumber = dto.PhoneNumber,
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow
                };

                _context.Clients.Add(client);
                await _context.SaveChangesAsync();
            }

            var conversation = await _context.Conversations
                                    .Where(c => c.ClientId == client.Id && c.Status != ConversationStatus.Finished)
                                    .OrderByDescending(c => c.StartedAt)
                                    .FirstOrDefaultAsync();

            if (conversation == null)
            {
                conversation = new Conversation
                {
                    ClientId = client.Id,
                    StartedAt = DateTime.UtcNow,
                    Status = ConversationStatus.Open
                };

                _context.Conversations.Add(conversation);
                await _context.SaveChangesAsync();
            }

            var message = new Message
            {
                ConversationId = conversation.Id,
                Content = dto.Message,
                SentAt = DateTime.UtcNow,
                IsFromClient = true
            };

            _context.Messages.Add(message);
            client.LastMessageAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }

        public async Task SendMessageToClientAsync(OutgoingMessageDto dto)
        {

            var conversation = await _context.Conversations.FindAsync(dto.ConversationId);
            if (conversation == null) throw new Exception("Conversa não encontrada!");

            var message = new Message
            {
                ConversationId = dto.ConversationId,
                Content = dto.Content,
                SentAt = DateTime.UtcNow,
                IsFromClient = false
            };

            _context.Messages.Add(message);
            await _context.SaveChangesAsync();

            var response = await _httpClient.PostAsJsonAsync("http://localhost:3000/api/send-message", new
            {
                phoneNumber = dto.PhoneNumber,
                content = dto.Content,
                isFromClient = false
            });



            if (!response.IsSuccessStatusCode)
            {
                var messageErrorResponse = await response.Content.ReadAsStringAsync();
                throw new Exception($"Erro microserviço - Status: {(int)response.StatusCode} - Conteúdo: {messageErrorResponse}");
            }
        }

        public async Task SendMediaMessageToClientAsync(OutgoingMessageDto dto)
        {
            if (dto.File == null || dto.File.Length == 0)
                throw new ArgumentException("Arquivo inválido.");

            string subfolder = dto.Type switch
            {
                MessageType.Audio => "Audios",
                MessageType.Image => "Images",
                MessageType.File => "Files",
                MessageType.Video => "Videos",
                _ => throw new ArgumentException("Tipo de mídia inválido.")
            };

            string folderPath = Path.Combine(_env.WebRootPath, "Uploads", subfolder);
            Directory.CreateDirectory(folderPath);

            string fileName = $"{Guid.NewGuid()}_{dto.File.FileName}";
            string filePath = Path.Combine(folderPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await dto.File.CopyToAsync(stream);
            }

            var message = new Message
            {
                ConversationId = dto.ConversationId,
                Content = dto.Content ?? string.Empty,
                FilePath = $"/Uploads/{subfolder}/{fileName}",
                SentAt = DateTime.UtcNow,
                IsFromClient = dto.IsFromClient,
                Type = dto.Type
            };

            _context.Messages.Add(message);
            await _context.SaveChangesAsync();

            var response = await _httpClient.PostAsJsonAsync("http://localhost:3000/api/send-media-message", new MessageDto
            {
                PhoneNumber = dto.PhoneNumber,
                Id = message.Id,
                Content = message.Content ?? string.Empty,
                FilePath = message.FilePath,
                IsFromClient = message.IsFromClient,
                SentAt = message.SentAt,
                Type = message.Type,
                PublicUrl = $"{_httpContextAccessor?.HttpContext?.Request.Scheme}://{_httpContextAccessor?.HttpContext?.Request.Host}{message.FilePath}"

            });

            if (!response.IsSuccessStatusCode)
            {
                var messageErrorResponse = await response.Content.ReadAsStringAsync();
                throw new Exception($"Erro microserviço - Status: {(int)response.StatusCode} - Conteúdo: {messageErrorResponse}");
            }
        }
    }
}