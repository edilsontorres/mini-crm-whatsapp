using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MiniCrm.Api.Dtos;
using MiniCrm.Api.Services.Interfaces;

namespace MiniCrm.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClientController : Controller
    {
        private readonly IClientService _clientService;

        public ClientController(IClientService clientService)
        {
            _clientService = clientService;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> Register([FromBody] CreateClientDto dto)
        {
            try
            {
                var result = await _clientService.RegisterAsync(dto);
                return Ok(new { message = result });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult> Update(Guid id, [FromBody] UpdateClientDto dto)
        {
            try
            {
                var result = await _clientService.UpdateAsync(id, dto);
                return Ok(new { message = result });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClientDto>>> GetAll([FromQuery] bool includeInactive = false)
        {
            var clients = await _clientService.GetAllAsync(includeInactive);
            return Ok(clients);
        }

    }
}