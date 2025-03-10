using System.Text.RegularExpressions;
using Unite.Web.Configuration;
using Unite.Web.Middleware;

var builder = WebApplication.CreateBuilder(args);

builder.Logging.ClearProviders();

builder.Logging.AddConsole();


builder.Services.AddSpaStaticFiles(configuration =>
{
    configuration.RootPath = "Client/dist";
});


var app = builder.Build();

var identitySourceUrl = "/api/identity";
var composerSourceUrl = "/api/composer";
var analysisSourceUrl = "/api/analysis";
var donorsFeedSourceUrl = "/api/donors-feed";
var imagesFeedSourceUrl = "/api/images-feed";
var specimensFeedSourceUrl = "/api/specimens-feed";
var genomeFeedSourceUrl = "/api/genome-feed";
var viewerCxgSourceUrl = @"^\/viewer\/cxg(\d+)";

var identityTargetUrl = $"{EnvironmentConfig.IdentityHost}/api";
var composerTargetUrl = $"{EnvironmentConfig.ComposerHost}/api";
var analysisTargetUrl = $"{EnvironmentConfig.AnalysisHost}/api";
var donorsFeedTargetUrl = $"{EnvironmentConfig.DonorsFeedHost}/api";
var imagesFeedTargetUrl = $"{EnvironmentConfig.ImagesFeedHost}/api";
var specimensFeedTargetUrl = $"{EnvironmentConfig.SpecimensFeedHost}/api";
var genomeFeedTargetUrl = $"{EnvironmentConfig.GenomeFeedHost}/api";
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
        (path, query) => path.StartsWith(donorsFeedSourceUrl),
        (path, query) => $"{path.Replace(donorsFeedSourceUrl, donorsFeedTargetUrl)}{query}"
    );
    options.Map(
        (path, query) => path.StartsWith(imagesFeedSourceUrl),
        (path, query) => $"{path.Replace(imagesFeedSourceUrl, imagesFeedTargetUrl)}{query}"
    );
    options.Map(
        (path, query) => path.StartsWith(specimensFeedSourceUrl),
        (path, query) => $"{path.Replace(specimensFeedSourceUrl, specimensFeedTargetUrl)}{query}"
    );
    options.Map(
        (path, query) => path.StartsWith(genomeFeedSourceUrl),
        (path, query) => $"{path.Replace(genomeFeedSourceUrl, genomeFeedTargetUrl)}{query}"
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
