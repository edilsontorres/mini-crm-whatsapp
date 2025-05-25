using Microsoft.EntityFrameworkCore;
using MiniCrm.Api.Data;
using MiniCrm.Api.Dtos;
using MiniCrm.Api.Services.Interfaces;

namespace MiniCrm.Api.Services
{
    public class MessageService : IMessageService
    {
        private readonly MiniCrmContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public MessageService(MiniCrmContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
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
                Content = m.Content!,
                IsFromClient = m.IsFromClient,
                SentAt = m.SentAt,
                Type = m.Type,
                PublicUrl = $"{_httpContextAccessor?.HttpContext?.Request.Scheme}://{_httpContextAccessor?.HttpContext?.Request.Host}{m.FilePath}"
            }).ToList();
        }
    }
}