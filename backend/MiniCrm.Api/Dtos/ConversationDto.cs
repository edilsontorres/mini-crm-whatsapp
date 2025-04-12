using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiniCrm.Api.Dtos
{
    public class ConversationDto
    {
        public int Id {get;set;}
        public string ClientNumber {get;set;} = null!;
        public Guid ClientId {get;set;}
        public string ClientName {get;set;} = null!;
        public Guid? UserId {get;set;}
        public string? UserName {get;set;} 
        public string Status {get;set;} = null!;
        public DateTime StartedAt {get;set;} 
        public DateTime? AssignedAt {get;set;} 
        public DateTime? FinishedAt {get;set;}
        
    }
}