

namespace MiniCrm.Api.Dtos
{
    public class UpdateClientDto
    {
        public string Name {get; set;} = String.Empty;
        public bool? IsActive {get; set;}
    }
}