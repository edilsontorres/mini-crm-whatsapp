using Microsoft.EntityFrameworkCore;
using MiniCrm.Api.Data;
using MiniCrm.Api.Dtos;
using MiniCrm.Api.Entities;
using MiniCrm.Api.Services.Interfaces;

namespace MiniCrm.Api.Services
{
    public class ConversationService : IConversationService
    {
        private readonly MiniCrmContext _context;

        public ConversationService(MiniCrmContext context)
        {
            _context = context;

        }
        public async Task<ConversationDto> AssignAsync(int conversationId, Guid userId)
        {
            var conversation = await _context.Conversations
                                            .Include(c => c.User)
                                            .Include(c => c.Client)
                                            .FirstOrDefaultAsync(c => c.Id == conversationId);

            if (conversation == null) throw new Exception("Conversa não encontrada!");
            if (conversation.Status != ConversationStatus.Open) throw new Exception("Mensagem já esta em atendimento ou finalizada");

            conversation.UserId = userId;
            conversation.AssignedAt = DateTime.UtcNow;
            conversation.Status = ConversationStatus.InProgress;

            _context.Conversations.Update(conversation);
            await _context.SaveChangesAsync();

            return new ConversationDto
            {
                Id = conversation.Id,
                ClientNumber = conversation.Client.PhoneNumber,
                ClientName = conversation.Client.Name,
                UserId = conversation.UserId,
                UserName = conversation.User?.Name,
                Status = conversation.Status.ToString(),
                StartedAt = conversation.StartedAt,
                AssignedAt = conversation.AssignedAt,
                FinishedAt = conversation.FinishedAt
            };

        }

        public async Task<ConversationDto> FinishAsync(int conversationId)
        {
            var conversation = await _context.Conversations
                                            .Include(c => c.User)
                                            .Include(c => c.Client)
                                            .FirstOrDefaultAsync(c => c.Id == conversationId);

            if (conversation == null) throw new Exception("Conversa não encontrada!");
            if (conversation.Status != ConversationStatus.InProgress) throw new Exception("Mensagem não esta em atendimento ou já foi finalizada");

            conversation.Status = ConversationStatus.Finished;
            conversation.FinishedAt = DateTime.UtcNow;

            _context.Conversations.Update(conversation);
            await _context.SaveChangesAsync();

            return new ConversationDto
            {
                Id = conversation.Id,
                ClientNumber = conversation.Client.PhoneNumber,
                ClientName = conversation.Client.Name,
                UserId = conversation.UserId,
                UserName = conversation.User?.Name,
                Status = conversation.Status.ToString(),
                StartedAt = conversation.StartedAt,
                AssignedAt = conversation.AssignedAt,
                FinishedAt = conversation.FinishedAt
            };

        }

        public async Task<List<WaitingConversationDto>> GetWaitingConversationsAsync()
        {
            var conversation = await _context.Conversations
                                            .Include(c => c.Client)
                                            .Where(c => c.Status == ConversationStatus.Open && c.User == null)
                                            .OrderBy(c => c.StartedAt)
                                            .ToListAsync();

            return conversation.Select(c => new WaitingConversationDto
            {
                Id = c.Id,
                ClientName = c.Client.Name,
                PhoneNumber = c.Client.PhoneNumber,
                StartedAt = c.StartedAt
            }).ToList();
        }
    }
}