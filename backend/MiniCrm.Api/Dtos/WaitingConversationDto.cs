using MiniCrm.Api.Entities;

namespace MiniCrm.Api.Dtos
{
    public class WaitingConversationDto
    {
        public int Id { get; set; }
        public Guid ClientId { get; set; }
        public string ClientName { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public DateTime StartedAt { get; set; }
        public ConversationStatus Status { get; set; }
    }
}