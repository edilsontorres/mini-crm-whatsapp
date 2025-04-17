using Microsoft.AspNetCore.Mvc;
using MiniCrm.Api.Dtos.Webhook;
using MiniCrm.Api.Services.Interfaces;


namespace MiniCrm.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WebhookController : Controller
    {
        private readonly IWebhookService _webhookService;
        public WebhookController(IWebhookService webhookService)
        {
            _webhookService = webhookService;
        }

        [HttpPost]
        public async Task<ActionResult> HandleIncomingMessageAsync(IncomingMessageDto dto)
        {
            try
            {
                await _webhookService.HandleIncomingMessageAsync(dto);
                return Ok(new {message = "Mesangem processada com sucesso!"});
            }
            catch(Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("respond")]
        public async Task<ActionResult> SendMessageToClientAsync(OutgoingMessageDto dto)
        {
            try
            {
                await _webhookService.SendMessageToClientAsync(dto);
                return Ok(new {message = "Mensagem enviada com sucesso!"});
            }
            catch(Exception ex)
            {
                return BadRequest(new {message = ex.Message});
            }
        }
    }
}