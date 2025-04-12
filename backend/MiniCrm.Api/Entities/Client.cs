
namespace MiniCrm.Api.Entities
{
    public class Client
    {
        public Guid Id {get; set;}
        public string Name {get; set;} = String.Empty;
        public string PhoneNumber {get; set;} = String.Empty;
        public bool IsActive {get; set;} = true;
        public DateTime CreatedAt {get; set;} = DateTime.UtcNow;
        public DateTime? LastMessageAt {get; set;}
        public ICollection<Conversation> Conversations { get; set; } = new List<Conversation>();

    }
}