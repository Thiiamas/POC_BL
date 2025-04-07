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
        private List<FilterGroupDTO> _filtersGroups;
        private List<FilterDTO> _mockFilters;

        public MusicController(ILogger<WeatherForecastController> logger, DataBuilder musicDtoBuilder)
        {
            _logger = logger;
            _musicDtoBuilder = musicDtoBuilder;

            _filtersGroups = new List<FilterGroupDTO>
            {
                new FilterGroupDTO
                {
                    Id = 1,
                    Name = "Classic Games",
                    Description = "Filter group for classic retro games"
                },
                new FilterGroupDTO
                {
                    Id = 2,
                    Name = "Modern Games",
                    Description = "Filter group for modern games"
                },
                new FilterGroupDTO
                {
                    Id = 2,
                    Name = "Shitty games",
                    Description = "Filter group for shitty games"
                }
            };

            _mockFilters = new List<FilterDTO>
            {
                new FilterDTO { Name = "Game", Value = "Super Mario World" },
                new FilterDTO { Name = "Game", Value = "The Legend of Zelda" },
                new FilterDTO { Name = "Game", Value = "Metroid" },
                new FilterDTO { Name = "Console", Value = "SNES" },
                new FilterDTO { Name = "Console", Value = "NES" },
                new FilterDTO { Name = "Console", Value = "Game Boy" },
                new FilterDTO { Name = "Year", Value = "1990" },
                new FilterDTO { Name = "Year", Value = "1991" },
                new FilterDTO { Name = "Year", Value = "1992" },
                new FilterDTO { Name = "Genre", Value = "Platformer" },
                new FilterDTO { Name = "Genre", Value = "Adventure" },
                new FilterDTO { Name = "Genre", Value = "Action" }
            };
        }

        [HttpGet(Name = "GetMusic")]
        public IEnumerable<MusicDTO> Get(string filters)
        {
            if (filters == "")
                return _musicDtoBuilder.musics.Take(5);
            return _musicDtoBuilder.musics.Take(10);
        }

        [HttpGet("games", Name = "GetGames")]
        public IEnumerable<string> GetGames(int? take)
        {
            if (take == null)
                return _musicDtoBuilder.musics.Select(x => x.Game).ToHashSet();
            return _musicDtoBuilder.musics.Select(x => x.Game).ToHashSet().Take((int)take);
        }

        [HttpGet("filterGroups", Name = "GetFilterGroups")]
        public IEnumerable<FilterGroupDTO> GetFilterGroups()
        {
            return _filtersGroups.Take(5);
        }

        [HttpGet("filterGroups/{id}", Name = "GetFilterGroupById")]
        public ActionResult<FilterGroupDTO> GetFilterGroupById(int id)
        {
            var filterGroup = _filtersGroups.FirstOrDefault(fg => fg.Id == id);
            if (filterGroup == null)
            {
                return NotFound();
            }

            return Ok(filterGroup);
        }

        [HttpGet("filters", Name = "GetFilters")]
        public IEnumerable<FilterDTO> GetFilters()
        {
            return _mockFilters;
        }

        [HttpPost("filtered", Name = "GetFilteredMusic")]
        public IEnumerable<MusicDTO> GetFilteredMusic([FromBodyAttribute] List<FilterDTO> filters)
        {
            IEnumerable<MusicDTO> result = _musicDtoBuilder.musics;
            foreach (FilterDTO filter in filters)
            {
                var name = filter.Name.ToLower();
                var value = filter.Value.ToLower();
                if (string.IsNullOrEmpty(name))
                    continue;
                if (string.Compare(name, "Game", StringComparison.OrdinalIgnoreCase) == 0)
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
