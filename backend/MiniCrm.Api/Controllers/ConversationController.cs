using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MiniCrm.Api.Data;
using MiniCrm.Api.Dtos;
using MiniCrm.Api.Entities;
using MiniCrm.Api.Services.Interfaces;

namespace MiniCrm.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ConversationController : Controller
    {
        private readonly IConversationService _conversationService;
        private readonly MiniCrmContext _context;
        public ConversationController(IConversationService conversationService, MiniCrmContext context)
        {
            _conversationService = conversationService;
            _context = context;
        }

        [HttpPut("{id}/assing")]
        public async Task<ActionResult<ConversationDto>> AssignConversation(int id, [FromBody] AssignConversationDto dto)
        {
            try
            {
                var conversation = await _conversationService.AssignAsync(id, dto.UserId);
                return Ok(conversation);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("fake")]
        public async Task<IActionResult> CreateFakeConversation()
        {
            var client = await _context.Clients.FirstOrDefaultAsync();
            if (client == null) return BadRequest("Nenhum cliente encontrado");

            var conversation = new Conversation
            {
                ClientId = client.Id,
                StartedAt = DateTime.UtcNow,
                Status = ConversationStatus.Open
            };

            _context.Conversations.Add(conversation);
            await _context.SaveChangesAsync();

            return Ok(new { conversation.Id });
        }


    }


}