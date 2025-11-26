using System.Text.Json;

public class GlobalMiddleware
{
    private readonly RequestDelegate _next;

    public GlobalMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context)
    {
        var ip = context.Connection.RemoteIpAddress?.ToString();
        var agent = context.Request.Headers["User-Agent"].ToString();
        var path = context.Request.Path.ToString();
        var timestamp = DateTime.UtcNow.ToString("yyyy-MM-dd HH:mm:ss");

        // JWT'den username okunur
        var username = context.User?.Identity?.IsAuthenticated == true
            ? context.User.Identity.Name
            : "Anonymous";

        var log = new
        {
            IP = ip,
            UserAgent = agent,
            Username = username,
            Path = path,
            Timestamp = timestamp
        };

        Console.WriteLine("---- GLOBAL REQUEST LOG ----");
        Console.WriteLine(JsonSerializer.Serialize(log, new JsonSerializerOptions { WriteIndented = true }));

        await _next(context);
    }
}
