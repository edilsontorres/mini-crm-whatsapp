
namespace MiniCrm.Api.Dtos
{
    public class ListAssignedConversationDto
    {
        public int Id { get; set; }
        public string PhoneNumber { get; set; } = null!;
        public Guid ClientId { get; set; }
        public string ClientName { get; set; } = null!;
        public DateTime StartedAt { get; set; }
        public DateTime? AssignedAt { get; set; }
    }
}