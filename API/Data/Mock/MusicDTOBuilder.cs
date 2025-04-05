using API.Data.DTO;
using System.ComponentModel;
using System;

namespace API.Data.Mock
{
    public class MusicDTOBuilder
    {

        public static MusicDTO Build(string music, string game, string flag, string group, string license, string console, string releaseDate, string popularity)
        { 
            return new MusicDTO(music, game, flag, group, license, console, releaseDate, popularity);
    }
    public static MusicDTO BuildFromCsvLine(string csvRow)
        {
            //read csv file and return MusicDTO
            string[] values = csvRow.Split(',');
            string music = values[0];
            string game = values[1];
            string flag = values[2];
            string group = values[3];
            string license = values[4];
            string console = values[5];
            string releaseDate = values[6];
            string popularity = values[7];
            return new MusicDTO(music, game, flag, group, license, console, releaseDate, popularity);
        }

        public static MusicDTO Build()
        {
            return new MusicDTO("Music", "Game", "Flag", "Group", "License", "Console", "Release Date", "Popularity");
        }
    }
}
