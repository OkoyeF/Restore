using System;
using System.Net;
using System.Text.Json;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Mvc; 

namespace API.Middleware
{
    public class ExceptionMiddleware : IMiddleware
    {
        private readonly IHostEnvironment _env;
        private readonly ILogger<ExceptionMiddleware> _logger;

        public ExceptionMiddleware(IHostEnvironment env, ILogger<ExceptionMiddleware> logger)
        {
            _env = env;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                if (context.Request.Method != HttpMethods.Get && context.Request.Method != HttpMethods.Post)
                {
                    context.Response.ContentType = "application/json";
                    context.Response.StatusCode = (int)HttpStatusCode.MethodNotAllowed;
                    await context.Response.WriteAsJsonAsync(new { error = "Method not allowed." });
                    return;
                }

                // Call the next middleware in the pipeline
                await next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception ex)
        {
            _logger.LogError(ex, "An error occurred while processing the request.");
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            var response = new ProblemDetails
            {
                Status = 500,
                Detail = _env.IsDevelopment() 
                    ? ex.StackTrace?.ToString()
                    : null,
                Title = ex.Message
            };

            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };

            var json = JsonSerializer.Serialize(response, options);

            await context.Response.WriteAsync(json);
        }
    }
}