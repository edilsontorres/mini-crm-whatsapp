using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        public MessageService(MiniCrmContext context)
        {
            _context = context;
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
                SentAt = m.SentAt
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
    }
}