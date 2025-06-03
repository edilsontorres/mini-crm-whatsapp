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
        public async Task<ActionResult> HandleIncomingMessageAsync([FromBody] IncomingMessageDto dto)
        {
            try
            {
                await _webhookService.HandleIncomingMessageAsync(dto);
                return Ok(new { message = "Mesangem processada com sucesso!" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }


        [HttpPost("received-media")]
        public async Task<ActionResult> HandleIncomingMediaMessageAsync([FromForm] IncomingMessageDto dto)
        {
            try
            {
                await _webhookService.HandleIcomingMediaMessageAsync(dto);
                return Ok(new { message = "Mesangem processada com sucesso!" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message});
            }

        }

        [HttpPost("respond")]
        public async Task<ActionResult> SendMessageToClientAsync([FromBody] OutgoingMessageDto dto)
        {

            if (dto.Content == "" || dto.Content == null) return BadRequest(new { message = "Não é possível enviar uma mensagem vazia" });

            try
            {
                await _webhookService.SendMessageToClientAsync(dto);
                return Ok(new { message = "Mensagem enviada com sucesso!" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });

            }
        }

        [HttpPost("respond-media")]
        public async Task<ActionResult> SendMediaMessageToClientAsync([FromForm] OutgoingMessageDto dto)
        {
            try
            {
                await _webhookService.SendMediaMessageToClientAsync(dto);
                return Ok(new { message = "Mensagem enviada com sucesso!" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}