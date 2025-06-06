using System.Diagnostics;
using MiniCrm.Api.Services.Interfaces;

namespace MiniCrm.Api.Services
{
    public class ConvertAudioService : IConvertAudioService
    {
        public async Task<string> ConvertAudioToMp3Async(string inputPath)
        {
            string outputPath = Path.ChangeExtension(inputPath, ".mp3");

            var startInfo = new ProcessStartInfo
            {
                FileName = "ffmpeg",
                Arguments = $"-i \"{inputPath}\" -acodec libmp3lame -ar 44100 -ac 2 \"{outputPath}\"",
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                UseShellExecute = false,
                CreateNoWindow = true
            };

            var process = new Process { StartInfo = startInfo };
            process.Start();

            await process.StandardOutput.ReadToEndAsync();
            await process.StandardError.ReadToEndAsync();
            await process.WaitForExitAsync();

            if (process.ExitCode != 0)
            {
                throw new Exception("Erro ao converter áudio para MP3");
            }
            //Aqui tem o opcional de deletar o arquivo original afim de economizar espaço
            return outputPath;
        }
    }
}