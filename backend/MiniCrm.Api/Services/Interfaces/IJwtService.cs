using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiniCrm.Api.Entities;

namespace MiniCrm.Api.Services.Interfaces
{
    public interface IJwtService
    {
        String GenerateToken(User user);
    }
}