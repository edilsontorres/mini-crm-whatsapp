using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniCrm.Api.Dtos;

namespace MiniCrm.Api.Services.Interfaces
{
    public interface IConversationService
    {
        Task<ConversationDto> AssignAsync(int conversationId, Guid userId);
        Task<ConversationDto> FinishAsync(int conversationId);
    }
}