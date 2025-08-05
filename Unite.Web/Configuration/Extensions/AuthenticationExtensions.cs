using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.IdentityModel.Tokens;

namespace Unite.Web.Configuration.Extensions;

public static class AuthenticationExtensions
{
    private static IMemoryCache _cache;

    public static void AddJwtAuthenticationOptions(this AuthenticationOptions options)
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    }

    public static void AddJwtBearerOptions(this JwtBearerOptions options)
    {
        options.RequireHttpsMetadata = false;
        options.SaveToken = true;

        options.TokenValidationParameters = new TokenValidationParameters
        {
            IssuerSigningKey = new SymmetricSecurityKey(ApiConfig.Key),
            ValidateIssuerSigningKey = true,
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = false
        };

        options.Events = new JwtBearerEvents
        {
            OnTokenValidated = async context =>
            {
                var cache = ResolveCache(context.HttpContext);
                var actor = context.Principal?.FindFirst(claim => claim.Type == ClaimTypes.Actor)?.Value;
                var name = context.Principal?.FindFirst(claim => claim.Type == ClaimTypes.Name)?.Value;
                var key = context.Principal?.FindFirst(claim => claim.Type == ClaimTypes.Sid)?.Value;

                if (!string.Equals(actor, "Worker", StringComparison.InvariantCultureIgnoreCase))
                {
                    context.Success();
                    context.Request.Headers.Remove("Authorization");
                    return;
                }

                if (string.IsNullOrEmpty(key))
                {
                    context.Fail("Token identifier is not specified.");
                    context.Request.Headers.Remove("Authorization");
                    return;
                }

                if (!cache.TryGetValue(key, out _))
                {
                    var valid = await ValidateWorker(key);

                    if (valid)
                    {
                        cache.Set(key, true, TimeSpan.FromMinutes(5));
                        context.Success();
                        return;
                    }
                    else
                    {
                        context.Fail($"Failed to validate worker with id '{key}'");
                        context.Request.Headers.Remove("Authorization");
                        return;
                    }
                }

                context.Success();
            }
        };
    }

    private static IMemoryCache ResolveCache(HttpContext context)
    {
        _cache ??= context.RequestServices.GetRequiredService<IMemoryCache>();

        return _cache;
    }

    private static async Task<bool> ValidateWorker(string id)
    {
        using var handler = new HttpClientHandler { UseProxy = false };
        using var client = new HttpClient(handler);

        var url = $"{EnvironmentConfig.IdentityHost}/api/worker/token/{id}/active";
        var response = await client.GetAsync(url);

        return response.IsSuccessStatusCode;
    }
}
