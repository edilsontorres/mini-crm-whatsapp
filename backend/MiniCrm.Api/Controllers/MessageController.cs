using Microsoft.AspNetCore.Mvc;
using MiniCrm.Api.Dtos;
using MiniCrm.Api.Services.Interfaces;

namespace MiniCrm.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MessageController : Controller
    {
        private readonly IMessageService _messageService;

        public MessageController(IMessageService messageService)
        {
            _messageService = messageService;
        }

        [HttpGet("conversation/{conversationId}")]
        public async Task<ActionResult<List<MessageDto>>> ListByConversationAsync(int conversationId)
        {
            try
            {
                var message = await _messageService.ListByConversationAsync(conversationId);
                return Ok(message);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("conversation/message")]
        public async Task<ActionResult<MessageDto>> SendMessageAsync([FromBody] CreateMessageDto dto)
        {
             try
            {
                var message = await _messageService.SendMessageAsync(dto);
                return Ok(message);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}