using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniCrm.Api.Entities;

namespace MiniCrm.Api.Dtos
{
    public class CreateMediaMessageDto
    {
        public int ConversationId { get; set; }
        public string? Content { get; set; }
        public bool IsFromClient { get; set; }
        public IFormFile File { get; set; } = null!;
        public MessageType Type { get; set; }
    }
}