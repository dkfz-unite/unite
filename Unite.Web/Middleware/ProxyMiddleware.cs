namespace Unite.Web.Middleware;

public class ProxyMiddleware
{
    private readonly HttpClientHandler _httpClientHandler;
    private readonly HttpClient _httpClient;
    private readonly RequestDelegate _next;
    private readonly ProxyOptions _options;

    public ProxyMiddleware(RequestDelegate next, ProxyOptions options)
    {
        _httpClientHandler = new HttpClientHandler() { UseProxy = false };
        _httpClient = new HttpClient(_httpClientHandler);
        _next = next;
        _options = options;
    }

    public async Task Invoke(HttpContext httpContext)
    {
        var path = httpContext.Request.Path.ToString();
        var query = httpContext.Request.QueryString.ToString();

        if (_options.Match(path, query, out var targetUrl))
        {
            var request = new HttpRequestMessage(new HttpMethod(httpContext.Request.Method), targetUrl);

            // Copy headers from the original request
            foreach (var header in httpContext.Request.Headers)
            {
                request.Headers.TryAddWithoutValidation(header.Key, header.Value.ToArray());
            }

            // Buffer the request body to allow re-reading
            if (httpContext.Request.Body.CanRead)
            {
                httpContext.Request.EnableBuffering(); // Enable request body buffering

                // Create a memory stream to store the request body
                var memoryStream = new MemoryStream();
                await httpContext.Request.Body.CopyToAsync(memoryStream);
                memoryStream.Seek(0, SeekOrigin.Begin); // Reset the stream position

                // Assign the memory stream as the content of the proxied request
                request.Content = new StreamContent(memoryStream);

                // Copy content headers
                foreach (var header in httpContext.Request.Headers)
                {
                    request.Content.Headers.TryAddWithoutValidation(header.Key, header.Value.ToArray());
                }

                // Reset the HttpContext.Request.Body position for further middleware
                memoryStream.Seek(0, SeekOrigin.Begin);
                httpContext.Request.Body = memoryStream;
            }

            // Send the proxied request
            using var response = await _httpClient.SendAsync(request, HttpCompletionOption.ResponseHeadersRead, httpContext.RequestAborted);

            httpContext.Response.StatusCode = (int)response.StatusCode;

            foreach (var header in response.Headers)
            {
                httpContext.Response.Headers[header.Key] = header.Value.ToArray();
            }

            if (response.Content != null)
            {
                foreach (var header in response.Content.Headers)
                {
                    httpContext.Response.Headers[header.Key] = header.Value.ToArray();
                }

                httpContext.Response.Headers.Remove("transfer-encoding");

                await response.Content.CopyToAsync(httpContext.Response.Body);
            }

            return;
        }

        await _next(httpContext);
    }
}



public static class ProxyMiddlewareExtensions
{
    public static IApplicationBuilder UseProxy(this IApplicationBuilder builder, Action<ProxyOptions> configuration = null)
    {
        var options = new ProxyOptions();

        if (configuration != null)
        {
            configuration(options);
        }

        return builder.UseMiddleware<ProxyMiddleware>(options);
    }
}
