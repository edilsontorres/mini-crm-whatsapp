using System.ComponentModel.DataAnnotations;

namespace MiniCrm.Api.Dtos
{
    public class RegisterUserDto
    {
        [Required(ErrorMessage = "Informe um nome")]
        public string Name { get; set; } = string.Empty;
        [Required(ErrorMessage = "Informe um email")]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        [Required]
        public string Password { get; set; } = string.Empty;
    }
}