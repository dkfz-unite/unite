namespace Unite.Web.Middleware;

public class ProxyOptions
{
    protected record Rule(Func<string, string, bool> Match, Func<string, string, string> Path);

    protected List<Rule> _rules = new List<Rule>();


    public void Map(Func<string, string, bool> source, Func<string, string, string> target)
    {
        _rules.Add(new Rule(source, target));
    }

    public bool Match(string path, string query, out string targetPath)
    {
        var rule = _rules.FirstOrDefault(rule => rule.Match(path, query));

        targetPath = rule?.Path(path, query);

        return rule != null;
    }
}
