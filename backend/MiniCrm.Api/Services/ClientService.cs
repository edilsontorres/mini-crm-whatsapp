using Microsoft.EntityFrameworkCore;
using MiniCrm.Api.Data;
using MiniCrm.Api.Dtos;
using MiniCrm.Api.Entities;
using MiniCrm.Api.Services.Interfaces;

namespace MiniCrm.Api.Services
{
    public class ClientService : IClientService
    {
        private readonly MiniCrmContext _context;
        public ClientService(MiniCrmContext context)
        {
            _context = context;
        }

        public async Task<ClientDto> RegisterAsync(CreateClientDto dto)
        {
            var clientDb = await _context.Clients.FirstOrDefaultAsync(c => c.PhoneNumber == dto.PhoneNumber);

            if (clientDb != null) throw new Exception("Já existe cliente cadastrado com este número");

            var client = new Client
            {
                Id = Guid.NewGuid(),
                Name = dto.Name,
                PhoneNumber = dto.PhoneNumber,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            };

            _context.Clients.Add(client);
            await _context.SaveChangesAsync();

            return new ClientDto
            {
                Id = client.Id,
                Name = client.Name,
                PhoneNumber = client.PhoneNumber,
                IsActive = client.IsActive,
                CreatedAt = client.CreatedAt
            };
        }

        public async Task<ClientDto> UpdateAsync(Guid id, UpdateClientDto dto)
        {
            var clientDb = await _context.Clients.FindAsync(id);

            if (clientDb == null) throw new Exception("Cliente não encontrado!");

            //Se dto.Name não for nulo, usa ele.Caso contrário, mantém o valor atual de client.Name
            clientDb.Name = dto.Name ?? clientDb.Name;
            clientDb.IsActive = dto.IsActive ?? clientDb.IsActive;

            _context.Clients.Update(clientDb);
            await _context.SaveChangesAsync();

            return new ClientDto
            {
                Id = clientDb.Id,
                Name = clientDb.Name,
                PhoneNumber = clientDb.PhoneNumber,
                IsActive = clientDb.IsActive,
                CreatedAt = clientDb.CreatedAt
            };
        }

        public async Task<IEnumerable<ClientDto>> GetAllAsync(bool includeInactive = false)
        {
            var query = _context.Clients.AsQueryable();

            if (!includeInactive)
                query = query.Where(c => c.IsActive);

            var clients = await query
                .OrderByDescending(c => c.LastMessageAt ?? c.CreatedAt)
                .ToListAsync();

            return clients.Select(c => new ClientDto
            {
                Id = c.Id,
                Name = c.Name,
                PhoneNumber = c.PhoneNumber,
                IsActive = c.IsActive,
                CreatedAt = c.CreatedAt,
                LastMessageAt = c.LastMessageAt
            });
        }

    }
}