namespace API.Data.DTO;

public class MusicDTO

{
    //Music,Game,Flag,Group,License,Console,Release Date,Popularity
    public string Music { get; set; } = string.Empty;
    public string Game { get; set; } = string.Empty;
    public string Flag { get; set; } = string.Empty;
    public string Group { get; set; } = string.Empty;
    public string License { get; set; } = string.Empty;
    public string Console { get; set; } = string.Empty;
    public string ReleaseDate { get; set; } = string.Empty;
    public string Popularity { get; set; } = string.Empty;

    public MusicDTO(string music, string game, string flag, string group, string license, string console, string releaseDate, string popularity)
    {
        Music = music;
        Game = game;
        Flag = flag;
        Group = group;
        License = license;
        Console = console;
        ReleaseDate = releaseDate;
        Popularity = popularity;
    }

}
