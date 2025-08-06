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
                    return;
                }

                if (string.IsNullOrEmpty(key))
                {
                    context.Request.Headers.Remove("Authorization");
                    return;
                }

                if (!cache.TryGetValue(key, out _))
                {
                    var valid = await ValidateToken(key);

                    if (valid)
                    {
                        cache.Set(key, true, TimeSpan.FromMinutes(1));
                        return;
                    }
                    else
                    {
                        context.Request.Headers.Remove("Authorization");
                        return;
                    }
                }
            }
        };
    }

    private static IMemoryCache ResolveCache(HttpContext context)
    {
        _cache ??= context.RequestServices.GetRequiredService<IMemoryCache>();

        return _cache;
    }

    private static async Task<bool> ValidateToken(string key)
    {
        using var handler = new HttpClientHandler { UseProxy = false };
        using var client = new HttpClient(handler);

        var url = $"{EnvironmentConfig.IdentityHost}/api/token/{key}/active";
        var response = await client.GetAsync(url);

        return response.IsSuccessStatusCode;
    }
}
