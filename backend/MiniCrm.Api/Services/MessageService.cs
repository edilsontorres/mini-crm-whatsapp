using Microsoft.EntityFrameworkCore;
using MiniCrm.Api.Data;
using MiniCrm.Api.Dtos;
using MiniCrm.Api.Entities;
using MiniCrm.Api.Services.Interfaces;

namespace MiniCrm.Api.Services
{
    public class MessageService : IMessageService
    {
        private readonly MiniCrmContext _context;
        private readonly IWebHostEnvironment _env;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public MessageService(MiniCrmContext context, IWebHostEnvironment env, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _env = env;
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<List<MessageDto>> ListByConversationAsync(int conversationId)
        {
            var messages = await _context.Messages
                .Where(m => m.ConversationId == conversationId)
                .OrderBy(m => m.SentAt)
                .ToListAsync();

            return messages.Select(m => new MessageDto
            {
                Id = m.Id,
                Content = m.Content,
                IsFromClient = m.IsFromClient,
                SentAt = m.SentAt,
                Type = m.Type,
                PublicUrl = $"{_httpContextAccessor?.HttpContext?.Request.Scheme}://{_httpContextAccessor?.HttpContext?.Request.Host}{m.FilePath}"
            }).ToList();
        }

        public async Task<MessageDto> SendMessageAsync(CreateMessageDto dto)
        {
            var conversation = await _context.Conversations.FindAsync(dto.ConversationId);
            if (conversation == null) throw new Exception("Conversa não encontrada!");

            var message = new Message
            {
                ConversationId = dto.ConversationId,
                Content = dto.Content,
                IsFromClient = dto.IsFromClient,
                SentAt = DateTime.UtcNow
            };

            _context.Messages.Add(message);
            await _context.SaveChangesAsync();

            return new MessageDto
            {
                Id = message.Id,
                Content = message.Content,
                IsFromClient = message.IsFromClient,
                SentAt = message.SentAt
            };
        }

        public async Task<MessageDto> CreateMediaMessageAsync(CreateMediaMessageDto dto)
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

            return new MessageDto
            {
                Id = message.Id,
                Content = message.Content,
                FilePath = message.FilePath,
                IsFromClient = message.IsFromClient,
                SentAt = message.SentAt,
                Type = message.Type,
                PublicUrl = $"{_httpContextAccessor?.HttpContext?.Request.Scheme}://{_httpContextAccessor?.HttpContext?.Request.Host}{message.FilePath}"
            };
        }
    }
}