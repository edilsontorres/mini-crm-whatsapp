using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiniCrm.Api.Dtos.Webhook
{
    public class IncomingMessageDto
    {
        public string PhoneNumber { get; set; } = null!;
        public string Message { get; set; } = null!;
    }
}