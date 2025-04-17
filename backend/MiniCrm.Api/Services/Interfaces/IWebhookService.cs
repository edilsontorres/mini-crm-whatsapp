using MiniCrm.Api.Dtos.Webhook;

namespace MiniCrm.Api.Services.Interfaces
{
    public interface IWebhookService
    {
        Task HandleIncomingMessageAsync(IncomingMessageDto dto);
        Task SendMessageToClientAsync(OutgoingMessageDto dto);
    }
}