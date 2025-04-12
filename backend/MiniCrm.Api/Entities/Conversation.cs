using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace MiniCrm.Api.Entities
{
    public class Conversation
    {
        public int Id { get; set; }
        public Guid ClientId { get; set; }
        public Client Client {get; set;} = null!;
        public Guid? UserId { get; set; } // Nullable
        public User? User { get; set; }
        public DateTime? AssignedAt { get; set; }
        public DateTime StartedAt { get; set; } = DateTime.UtcNow;
        public DateTime? FinishedAt { get; set; }
        public ConversationStatus Status { get; set; } = ConversationStatus.Open;
        public ICollection<Message>? Messages { get; set; }

    }

    public enum ConversationStatus
    {
        Open = 0,
        InProgress = 1,
        Finished = 2
    }
}