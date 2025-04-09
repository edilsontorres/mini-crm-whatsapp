
namespace MiniCrm.Api.Dtos
{
    public class ResponseUserDto
    {
        public Guid Id {get; set;}
        public string Name {get; set;} = string.Empty; 
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string Token {get; set;} = string.Empty;
    }
}