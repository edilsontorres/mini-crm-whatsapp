using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiniCrm.Api.Dtos
{
    public class CreateClientDto
    {
        public string Name {get; set;} = String.Empty;
        public string PhoneNumber {get; set;} = String.Empty;
    }
}