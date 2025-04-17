using Microsoft.EntityFrameworkCore;
using MiniCrm.Api.Data;
using MiniCrm.Api.Dtos.Webhook;
using MiniCrm.Api.Entities;
using MiniCrm.Api.Services.Interfaces;

namespace MiniCrm.Api.Services
{
    public class WebhookService : IWebhookService
    {
        private readonly MiniCrmContext _context;
        private readonly HttpClient _httpClient;

        public WebhookService(MiniCrmContext context, HttpClient httpClient)
        {
            _context = context;
            _httpClient = httpClient;
        }
        public async Task HandleIncomingMessageAsync(IncomingMessageDto dto)
        {
            var client = await _context.Clients.FirstOrDefaultAsync(c => c.PhoneNumber == dto.PhoneNumber);
            if (client == null)
            {
                client = new Client
                {
                    Name = "Client",
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
            var response = await _httpClient.PostAsJsonAsync("http://localhost:3000/api/send-message", new
            {
                phoneNumber = dto.PhoneNumber,
                message = dto.Message
                
            });

            if (!response.IsSuccessStatusCode)
            {
                throw new Exception("Erro ao enviar mensagem ao microserviço.");
            }
        }
    }
}