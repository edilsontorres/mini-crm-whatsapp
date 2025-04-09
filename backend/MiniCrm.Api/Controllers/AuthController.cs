using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MiniCrm.Api.Data;
using MiniCrm.Api.Dtos;
using MiniCrm.Api.Entities;
using MiniCrm.Api.Services;
using MiniCrm.Api.Services.Interfaces;

namespace MiniCrm.Api.Controllers
{
    
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly IAuthService _authService;
        private readonly MiniCrmContext _context;

        public AuthController(IAuthService authService, MiniCrmContext context)
        {
            _authService = authService;
            _context = context;

        }

        [HttpPost("register")]
        public async Task<ActionResult> Register([FromBody] RegisterUserDto dto)
        {
            if (dto == null) return BadRequest(new { message = "Dados inválidos" });

            try
            {
                await _authService.RegisterAsync(dto);
                return StatusCode(201);
            }
            catch (Exception ex)
            {

                return BadRequest(new { message = ex.Message });
            }

        }

        [HttpPost("login")]
        public async Task<ActionResult<ResponseUserDto>> Login([FromBody] LoginUserDto dto)
        {
            try
            {
                var user = await _authService.LoginAsync(dto);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }

        }

        [Authorize]
        [HttpGet("me")]
        public async Task<ActionResult<ResponseUserDto>> Me()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null) return Unauthorized();

            var userDb = await _context.Users.FindAsync(Guid.Parse(userId));

            if (userDb == null || !userDb.IsActive) return NotFound("Usuário não encontrado ou inativo");
            var response = new ResponseUserDto
            {
                Name = userDb.Name,
                Email = userDb.Email,
                Token = "" // opcional, pode omitir se não for necessário retornar o token de novo
            };

            return Ok(response);

        }
    }
}