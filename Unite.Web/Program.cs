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

app.UseProxy(options =>
{
    //options.Map(
    //    (path, query) => path.StartsWith("/api"),
    //    (path, query) => $"{EnvironmentConfig.ComposerHost}{path}{query}"
    //);
    options.Map(
        (path, query) => path.StartsWith("/composer"),
        (path, query) => $"{path.Replace("/composer", EnvironmentConfig.ComposerHost)}{query}"
    );
    options.Map(
        (path, query) => path.StartsWith("/donors-feed"),
        (path, query) => $"{path.Replace("/donors-feed", EnvironmentConfig.DonorsFeedHost)}{query}"
    );
    options.Map(
        (path, query) => path.StartsWith("/specimens-feed"),
        (path, query) => $"{path.Replace("/specimens-feed", EnvironmentConfig.SpecimensFeedHost)}{query}"
    );
    options.Map(
        (path, query) => path.StartsWith("/images-feed"),
        (path, query) => $"{path.Replace("/images-feed", EnvironmentConfig.ImagesFeedHost)}{query}"
    );
    options.Map(
        (path, query) => path.StartsWith("/genome-feed"),
        (path, query) => $"{path.Replace("/genome-feed", EnvironmentConfig.GenomeFeedHost)}{query}"
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
