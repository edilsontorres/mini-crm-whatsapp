using MiniCrm.Api.Dtos;

namespace MiniCrm.Api.Services.Interfaces
{
    public interface IClientService
    {
        Task<ClientDto> RegisterAsync(CreateClientDto dto);
        Task<ClientDto> UpdateAsync(Guid id, UpdateClientDto dto);
        Task<IEnumerable<ClientDto>> GetAllAsync(bool includeInactive = false);

    }
}