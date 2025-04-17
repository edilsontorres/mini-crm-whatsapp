

namespace MiniCrm.Api.Dtos.Webhook
{
    public class OutgoingMessageDto
    {
        public string PhoneNumber { get; set; } = null!;
        public string Message { get; set; } = null!;
    }
}