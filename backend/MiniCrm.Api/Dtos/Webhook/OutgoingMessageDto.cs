

namespace MiniCrm.Api.Dtos.Webhook
{
    public class OutgoingMessageDto
    {
        public int ConversationId { get; set; }
        public string PhoneNumber { get; set; } = null!;
        public string Message { get; set; } = null!;
        public bool IsFromClient { get; set; }
    }
}