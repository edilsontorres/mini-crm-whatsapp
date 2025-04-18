using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MiniCrm.Api.Data;
using MiniCrm.Api.Dtos;
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

        [HttpGet("waiting")]
        public async Task<ActionResult<WaitingConversationDto>> GetWaitingConversationsAsync()
        {
            try
            {
                var conversations = await _conversationService.GetWaitingConversationsAsync();
                return Ok(conversations);
            }
            catch(Exception ex)
            {
                return BadRequest(new {message = ex.Message});
            }
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

        [HttpPut("{id}/finish")]
        public async Task<ActionResult<ConversationDto>> FinishAsync(int id)
        {
            try
            {
                var conversation = await _conversationService.FinishAsync(id);
                return Ok(conversation);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

    }


}