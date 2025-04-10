using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiniCrm.Api.Dtos
{
    public class ClientDto
    {

        public Guid Id { get; set; }
        public string Name { get; set; } = String.Empty;
        public string PhoneNumber { get; set; } = String.Empty;
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? LastMessageAt { get; set; }

    }
}