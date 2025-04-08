using MiniCrm.Api.Dtos;

namespace MiniCrm.Api.Services.Interfaces
{
    public interface IAuthService
    {
        Task<ResponseUserDto> RegisterAsync(RegisterUserDto dto);
        Task<string> LoginAsync(LoginUserDto dto); 
    }
}