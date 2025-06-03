using MiniCrm.Api.Entities;

namespace MiniCrm.Api.Dtos.Webhook
{
    public class OutgoingMessageDto
    {
        public int ConversationId { get; set; }
        public string PhoneNumber { get; set; } = null!;
        public string? Content { get; set; }
        public bool IsFromClient { get; set; }
        public IFormFile? File { get; set; }
        public MessageType Type { get; set; }
    }
}