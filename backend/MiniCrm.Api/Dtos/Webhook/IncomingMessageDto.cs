namespace MiniCrm.Api.Dtos.Webhook
{
    public class IncomingMessageDto
    {
        public string PhoneNumber { get; set; } = null!;
        public string Message { get; set; } = null!;
        public string? ClientName {get; set;}
    }
}