using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiniCrm.Api.Services.Interfaces
{
    public interface IConvertAudioService
    {
        Task<string> ConvertAudioToMp3Async(string inputPath);
    }
}