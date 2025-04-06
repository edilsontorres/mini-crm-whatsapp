using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiniCrm.Api.Entities
{
    public class Message
    {

        public int Id { get; set; }

        public int ConversationId { get; set; }

        public Conversation Conversation { get; set; } = null!;

        public string Content { get; set; } = null!;

        public DateTime SentAt { get; set; } = DateTime.UtcNow;

        public bool IsFromClient { get; set; }
    }


}