using API.Data.DTO;
using API.Data.Mock;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Text.Json;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MusicController : ControllerBase
    {
        DataBuilder _musicDtoBuilder;

        private readonly ILogger<WeatherForecastController> _logger;

        public MusicController(ILogger<WeatherForecastController> logger, DataBuilder musicDtoBuilder)
        {
            _logger = logger;
            _musicDtoBuilder = musicDtoBuilder;
        }

        [HttpGet(Name = "GetMusic")]
        public IEnumerable<MusicDTO> Get(string filters)
        {
            if(filters == "")
                return _musicDtoBuilder.musics.Take(5);
            return _musicDtoBuilder.musics.Take(10);

        }

        [HttpGet("games",Name = "GetGames")]
        public IEnumerable<string> GetGames(int? take)
        {
            if (take == null)
                return _musicDtoBuilder.musics.Select(x => x.Game).ToHashSet();
            return _musicDtoBuilder.musics.Select(x => x.Game).ToHashSet().Take((int)take);
        }

        [HttpPost("filtered", Name = "GetFilteredMusic")]
        public IEnumerable<MusicDTO> GetFilteredMusic([FromBodyAttribute] List<FilterDTO> filters)
        {
            IEnumerable<MusicDTO> result = _musicDtoBuilder.musics;
            //filters.Add(new FilterDTO
            //{
            //    Name = "Game",
            //    Value = "Super Mario World"
            //});
            foreach (FilterDTO filter in filters)
            {
                var name = filter.Name.ToLower();
                var value = filter.Value.ToLower();
                if (string.IsNullOrEmpty(name))
                    continue;
                if(string.Compare(name,"Game",StringComparison.OrdinalIgnoreCase) == 0)
                {
                    result = result.Where(music => music.Game.ToLower() == value);
                }
                if (string.Compare(name, "console", StringComparison.OrdinalIgnoreCase) == 0)
                {
                    result = result.Where(music => music.Console.ToLower() == value);
                }
            }
            
            return result.Take(20);
        }
    }
}
