using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiniCrm.Api.Dtos
{
    public class CreateMessageDto
    {
        public int ConversationId { get; set; }
        public string Content { get; set; } = null!;
        public bool IsFromClient { get; set; }
    }
}