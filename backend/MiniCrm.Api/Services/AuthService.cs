using Microsoft.EntityFrameworkCore;
using MiniCrm.Api.Data;
using MiniCrm.Api.Dtos;
using MiniCrm.Api.Entities;
using MiniCrm.Api.Services.Interfaces;
using MiniCrm.Api.Services.JwtService;

namespace MiniCrm.Api.Services
{
    public class AuthService : IAuthService
    {
        private readonly MiniCrmContext _context;
        private readonly TokenService _tokenService;
        public AuthService(MiniCrmContext context, TokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        public async Task<ResponseUserDto> RegisterAsync(RegisterUserDto dto)
        {
            var userDb = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
            if (userDb != null)
            {
                throw new Exception("Email já cadastrado");
            }

            var passwordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);

            var user = new User
            {
                Id = Guid.NewGuid(),
                Name = dto.Name,
                Email = dto.Email,
                PasswordHash = passwordHash,
                IsActive = true,
                CreatedAt = DateTime.UtcNow

            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new ResponseUserDto
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email
            };
        }

        public async Task<ResponseUserDto> LoginAsync(LoginUserDto dto)
        {
            var userDb = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
            if (userDb != null && userDb.IsActive == true)
            {
                
                bool passwordValid = BCrypt.Net.BCrypt.Verify(dto.Password, userDb.PasswordHash);
                
                if (!passwordValid)
                {
                    throw new Exception("Usuário ou senha inválidos");
                }

                var token = _tokenService.GenerateToken(userDb);

                return new ResponseUserDto
                {
                    Name = userDb.Name,
                    Email = userDb.Email,
                    Token = token
                };
            }

            throw new Exception("Usuário ou senha inválidos");

        }
    }
}