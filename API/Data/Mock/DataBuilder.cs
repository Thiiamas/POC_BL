using API.Data.DTO;

namespace API.Data.Mock;

public class DataBuilder
{
    string csvPath = ".//Data//Mock/References//data.csv";

    public List<MusicDTO> musics = new();

    public DataBuilder()
    {
        ReBuildFromCsv(csvPath);
    }

    void ReBuildFromCsv(string path)
    {
        var lines = File.ReadAllLines(csvPath);
        using StreamReader sr = new StreamReader(path);
        int lineCount = 0;
        while (sr.ReadLine() is string line && line != null)
        {
            if (lineCount == 0)
            {
                lineCount++;
                continue;
            }
            MusicDTO musicDTO = MusicDTOBuilder.BuildFromCsvLine(line);
            musics.Add(musicDTO);
        }
    }
}
