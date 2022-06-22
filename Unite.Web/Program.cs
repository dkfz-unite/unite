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
    options.Map(
        (path, query) => path.StartsWith("/api"),
        (path, query) => $"{EnvironmentConfig.ComposerHost}{path}{query}"
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
