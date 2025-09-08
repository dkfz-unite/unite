using System.Text.RegularExpressions;
using Unite.Web.Configuration;
using Unite.Web.Configuration.Extensions;
using Unite.Web.Middleware;
// using Yarp.ReverseProxy.Configuration;

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

// builder.Services.AddReverseProxy().LoadFromMemory(
//     routes:
//     [
//         new RouteConfig
//         {
//             RouteId = "identity", ClusterId = "identity",
//             Match = new() { Path = "/api/identity/{**catch-all}" },
//             Transforms = [ new Dictionary<string, string> { ["PathRemovePrefix"] = "/api/identity" }]
//         },
//         new RouteConfig
//         {
//             RouteId = "composer", ClusterId = "composer",
//             Match = new() { Path = "/api/composer/{**catch-all}" },
//             Transforms = [ new Dictionary<string, string> { ["PathRemovePrefix"] = "/api/composer" }]
//         },
//         new RouteConfig
//         {
//             RouteId = "analysis", ClusterId = "analysis",
//             Match = new() { Path = "/api/analysis/{**catch-all}" },
//             Transforms = [ new Dictionary<string, string> { ["PathRemovePrefix"] = "/api/analysis" }]
//         },
//         new RouteConfig
//         {
//             RouteId = "feed-donors", ClusterId = "feed-donors",
//             Match = new() { Path = "/api/feed-donors/{**catch-all}" },
//             Transforms = [ new Dictionary<string, string> { ["PathRemovePrefix"] = "/api/feed-donors" }]
//         },
//         new RouteConfig
//         {
//             RouteId = "feed-images", ClusterId = "feed-images",
//             Match = new() { Path = "/api/feed-images/{**catch-all}" },
//             Transforms = [ new Dictionary<string, string> { ["PathRemovePrefix"] = "/api/feed-images" }]
//         },
//         new RouteConfig
//         {
//             RouteId = "feed-specimens", ClusterId = "feed-specimens",
//             Match = new() { Path = "/api/feed-specimens/{**catch-all}" },
//             Transforms = [ new Dictionary<string, string> { ["PathRemovePrefix"] = "/api/feed-specimens" }]
//         },
//         new RouteConfig
//         {
//             RouteId = "feed-omics", ClusterId = "feed-omics",
//             Match = new() { Path = "/api/feed-omics/{**catch-all}" },
//             Transforms = [ new Dictionary<string, string> { ["PathRemovePrefix"] = "/api/feed-omics" }]
//         }
//     ],
//     clusters:
//     [
//         new ClusterConfig
//         {
//             ClusterId = "identity",
//             Destinations = new Dictionary<string, DestinationConfig> { ["d1"] = new DestinationConfig{ Address = $"{EnvironmentConfig.IdentityHost}/api/" } }
//         },
//         new ClusterConfig
//         {
//             ClusterId = "composer",
//             Destinations = new Dictionary<string, DestinationConfig> { ["d1"] = new DestinationConfig{ Address = $"{EnvironmentConfig.ComposerHost}/api/" } }
//         },
//         new ClusterConfig
//         {
//             ClusterId = "analysis",
//             Destinations = new Dictionary<string, DestinationConfig> { ["d1"] = new DestinationConfig{ Address = $"{EnvironmentConfig.AnalysisHost}/api/" } }
//         },
//         new ClusterConfig
//         {
//             ClusterId = "feed-donors",
//             Destinations = new Dictionary<string, DestinationConfig> { ["d1"] = new DestinationConfig{ Address = $"{EnvironmentConfig.FeedDonorsHost}/api/" } }
//         },
//         new ClusterConfig
//         {
//             ClusterId = "feed-images",
//             Destinations = new Dictionary<string, DestinationConfig> { ["d1"] = new DestinationConfig{ Address = $"{EnvironmentConfig.FeedImagesHost}/api/" } }
//         },
//         new ClusterConfig
//         {
//             ClusterId = "feed-specimens",
//             Destinations = new Dictionary<string, DestinationConfig> { ["d1"] = new DestinationConfig{ Address = $"{EnvironmentConfig.FeedSpecimensHost}/api/" } }
//         },
//         new ClusterConfig
//         {
//             ClusterId = "feed-omics",
//             Destinations = new Dictionary<string, DestinationConfig> { ["d1"] = new DestinationConfig{ Address = $"{EnvironmentConfig.FeedOmicsHost}/api/" } }
//         }
//     ]
// );

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

// app.MapReverseProxy();

app.UseSpaStaticFiles();

app.UseSpa(spa =>
{
    spa.Options.SourcePath = "Client";
});

app.Run();
