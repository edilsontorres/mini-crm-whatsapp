using MiniCrm.Api.Entities;

namespace MiniCrm.Api.Dtos
{
    public class MessageDto
    {
        public int Id { get; set; }
        public string Content { get; set; } = null!;
        public DateTime SentAt { get; set; }
        public bool IsFromClient { get; set; }
        public string? FilePath { get; set; }
        public MessageType Type { get; set; }
        public string? PublicUrl { get; set; }
        public string PhoneNumber { get; set; } = null!;
    }
}