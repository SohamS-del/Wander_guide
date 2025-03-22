using System.Diagnostics;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace Backend_WanderGuide.Middleware
{
    public class LoggingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<LoggingMiddleware> _logger;

        public LoggingMiddleware(RequestDelegate next, ILogger<LoggingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task Invoke(HttpContext context)
        {
            var stopwatch = Stopwatch.StartNew();
            _logger.LogInformation("LoggingMiddleware is processing request...");//ConfigurationDebugViewContext 

            // Log Incoming Request
            var request = await FormatRequest(context.Request);
            _logger.LogInformation($" Incoming Request: {request}");

            // Proceed with the request pipeline
            var originalBodyStream = context.Response.Body;
            using var responseBody = new MemoryStream();
            context.Response.Body = responseBody;

            try
            {
                await _next(context);
                stopwatch.Stop();

                // Log Outgoing Response
                var response = await FormatResponse(context.Response);
                _logger.LogInformation($" Response: {response} | Time Taken: {stopwatch.ElapsedMilliseconds}ms");

                // Copy response stream back to original response body
                responseBody.Seek(0, SeekOrigin.Begin);
                await responseBody.CopyToAsync(originalBodyStream);
            }
            catch (Exception ex)
            {
                stopwatch.Stop();
                _logger.LogError($" Exception: {ex.Message} | StackTrace: {ex.StackTrace} | Time Taken: {stopwatch.ElapsedMilliseconds}ms");
                throw;
            }
        }

        // Helper method to format incoming request
        private async Task<string> FormatRequest(HttpRequest request)
        {
            request.EnableBuffering(); // Allows reading the body multiple times
            var body = request.Body;
            var buffer = new byte[Convert.ToInt32(request.ContentLength ?? 0)];
            await request.Body.ReadAsync(buffer.AsMemory(0, buffer.Length));
            var requestBody = Encoding.UTF8.GetString(buffer);
            request.Body.Position = 0; // Reset body stream position

            return $"{request.Method} {request.Path} {request.QueryString} | Body: {requestBody}";
        }

        // Helper method to format outgoing response
        private async Task<string> FormatResponse(HttpResponse response)
        {
            response.Body.Seek(0, SeekOrigin.Begin);
            var buffer = new byte[response.Body.Length];
            await response.Body.ReadAsync(buffer.AsMemory(0, buffer.Length));
            response.Body.Seek(0, SeekOrigin.Begin);
            return $"Status: {response.StatusCode} | Body: {Encoding.UTF8.GetString(buffer)}";
        }

    }
}
