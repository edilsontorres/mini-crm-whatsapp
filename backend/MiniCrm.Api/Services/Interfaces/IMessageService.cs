using MiniCrm.Api.Dtos;

namespace MiniCrm.Api.Services.Interfaces
{
    public interface IMessageService
    {
        Task<List<MessageDto>> ListByConversationAsync(int conversationId);
    }
}