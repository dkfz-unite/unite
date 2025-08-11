using System.Text.RegularExpressions;
using Unite.Web.Configuration;
using Unite.Web.Configuration.Extensions;
using Unite.Web.Middleware;

var builder = WebApplication.CreateBuilder(args);

builder.Logging.ClearProviders();

builder.Logging.AddConsole();

builder.Services.AddMemoryCache();

builder.Services.AddSpaStaticFiles(configuration =>
{
    configuration.RootPath = "Client/dist";
});

builder.Services.AddAuthentication(options => options.AddJwtAuthenticationOptions())
                .AddJwtBearer(options => options.AddJwtBearerOptions());

var app = builder.Build();

var identitySourceUrl = "/api/identity";
var composerSourceUrl = "/api/composer";
var analysisSourceUrl = "/api/analysis";
var feedDonorsSourceUrl = "/api/feed-donors";
var feedImagesSourceUrl = "/api/feed-images";
var feedSpecimensSourceUrl = "/api/feed-specimens";
var feedOmicsSourceUrl = "/api/feed-omics";
var viewerCxgSourceUrl = @"^\/viewer\/cxg(\d+)";

var identityTargetUrl = $"{EnvironmentConfig.IdentityHost}/api";
var composerTargetUrl = $"{EnvironmentConfig.ComposerHost}/api";
var analysisTargetUrl = $"{EnvironmentConfig.AnalysisHost}/api";
var feedDonorsTargetUrl = $"{EnvironmentConfig.FeedDonorsHost}/api";
var feedImagesTargetUrl = $"{EnvironmentConfig.FeedImagesHost}/api";
var feedSpecimensTargetUrl = $"{EnvironmentConfig.FeedSpecimensHost}/api";
var feedOmicsTargetUrl = $"{EnvironmentConfig.FeedOmicsHost}/api";
var viewerCxgTargetUrl = $"{EnvironmentConfig.ViewerCxgHost}";

app.UseProxy(options =>
{
    options.Map(
        (path, query) => path.StartsWith(identitySourceUrl),
        (path, query) => $"{path.Replace(identitySourceUrl, identityTargetUrl)}{query}"
    );
    options.Map(
        (path, query) => path.StartsWith(composerSourceUrl),
        (path, query) => $"{path.Replace(composerSourceUrl, composerTargetUrl)}{query}"
    );
    options.Map(
        (path, query) => path.StartsWith(analysisSourceUrl),
        (path, query) => $"{path.Replace(analysisSourceUrl, analysisTargetUrl)}{query}"
    );
    options.Map(
        (path, query) => path.StartsWith(feedDonorsSourceUrl),
        (path, query) => $"{path.Replace(feedDonorsSourceUrl, feedDonorsTargetUrl)}{query}"
    );
    options.Map(
        (path, query) => path.StartsWith(feedImagesSourceUrl),
        (path, query) => $"{path.Replace(feedImagesSourceUrl, feedImagesTargetUrl)}{query}"
    );
    options.Map(
        (path, query) => path.StartsWith(feedSpecimensSourceUrl),
        (path, query) => $"{path.Replace(feedSpecimensSourceUrl, feedSpecimensTargetUrl)}{query}"
    );
    options.Map(
        (path, query) => path.StartsWith(feedOmicsSourceUrl),
        (path, query) => $"{path.Replace(feedOmicsSourceUrl, feedOmicsTargetUrl)}{query}"
    );
    options.Map(
        (path, query) => Regex.Match(path, viewerCxgSourceUrl).Success,
        (path, query) =>
        {
            var match = Regex.Match(path, viewerCxgSourceUrl);
            var number = match.Groups[1].Value;
            var host = viewerCxgTargetUrl.Replace("{n}", $"{number:00}");
            return $"{host}{path}{query}";
        }
    );
});


app.UseHsts();

app.UseHttpsRedirection();

app.UseSpaStaticFiles();

app.UseSpa(spa =>
{
    spa.Options.SourcePath = "Client";
});

app.Run();
