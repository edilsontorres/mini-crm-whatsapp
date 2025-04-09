using MiniCrm.Api.Entities;

namespace MiniCrm.Api.Services.Interfaces
{
    public interface IJwtService
    {
        String GenerateToken(User user);
    }
}