
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace MiniCrm.Api.Dtos
{
    public class LoginUserDto
    {
        [Required(ErrorMessage = "Informe um email")]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Informe a senha")]
        public string Password { get; set; } = string.Empty;

    }
}