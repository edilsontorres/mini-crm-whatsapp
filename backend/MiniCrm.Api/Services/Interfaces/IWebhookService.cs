using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniCrm.Api.Dtos.Webhook;

namespace MiniCrm.Api.Services.Interfaces
{
    public interface IWebhookService
    {
        Task HandleIncomingMessageAsync(IncomingMessageDto dto);
    }
}