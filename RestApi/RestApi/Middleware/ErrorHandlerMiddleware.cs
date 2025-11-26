public class ErrorHandlerMiddleware
{
    private readonly RequestDelegate _next;
    private readonly IHostEnvironment _env;
    private readonly ILogger<ErrorHandlerMiddleware> _logger;

    public ErrorHandlerMiddleware(RequestDelegate next, 
                                  IHostEnvironment env,
                                  ILogger<ErrorHandlerMiddleware> logger)
    {
        _next = next;
        _env = env;
        _logger = logger;
    }

    public async Task Invoke(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception error)
        {
            var response = context.Response;
            response.ContentType = "application/json";

            response.StatusCode = error switch
            {
                UnauthorizedAccessException => StatusCodes.Status401Unauthorized,
                KeyNotFoundException => StatusCodes.Status404NotFound,
                ArgumentException => StatusCodes.Status400BadRequest,
                _ => StatusCodes.Status500InternalServerError
            };

            var isDev = _env.IsDevelopment();

                        // Tüm logu string olarak oluştur
            var logText = BuildLogMessage(error, context);

            // ✔️ Günlük log dosyasına async yaz
            // milisaniye bilgisi
            var logWriteStart = DateTime.Now;
            await WriteLogToFileAsync(logText);
            var logWriteEnd = DateTime.Now;
            var logWriteDuration = (logWriteEnd - logWriteStart).TotalMilliseconds;
            Console.WriteLine($"Log yazma süresi: {logWriteDuration} ms");

            // ✔️ Developer ortamında console’a hata yaz
            if (isDev)
            {
                _logger.LogError(error, $"[DEV ERROR] {error.Message}");
                Console.WriteLine("----- DEV ERROR -----");
                Console.WriteLine($"Message : {error.Message}");
                Console.WriteLine($"Type    : {error.GetType().Name}");
                Console.WriteLine($"Stack   : {error.StackTrace}");
                Console.WriteLine("----------------------");
            }
            else
            {
                // Production'da sadece önemli hataları logla
                _logger.LogError(error, $"[PROD ERROR] {error.Message}");
            }

            // ✔️ API'ye dönecek JSON
            var result = isDev
                ? System.Text.Json.JsonSerializer.Serialize(new
                {
                    status = false,
                    message = error.Message,
                    //exception = error.GetType().Name,
                    //stackTrace = error.StackTrace
                })
                : System.Text.Json.JsonSerializer.Serialize(new
                {
                    status = false,
                    message = "Bir hata oluştu, lütfen daha sonra tekrar deneyiniz."
                });

            await response.WriteAsync(result);
        }
    }

        private static string BuildLogMessage(Exception error, HttpContext context)
    {
                return $@"
        -------------------------- ERROR --------------------------
        Date      : {DateTime.Now:yyyy-MM-dd HH:mm:ss}
        Day       : {DateTime.Now:dddd}
        Path      : {context.Request.Path}
        Method    : {context.Request.Method}
        Message   : {error.Message}
        Type      : {error.GetType().Name}
        Stack     : {error.StackTrace}
        -----------------------------------------------------------
        ";
            }

    private async Task WriteLogToFileAsync(string text)
    {
        try
        {
            // ✔️ logs klasörünü oluştur
            var logFolder = Path.Combine(AppContext.BaseDirectory, "logs");
            if (!Directory.Exists(logFolder))
                Directory.CreateDirectory(logFolder);

            // ✔️ Gün ismine göre log dosyası
            var fileName = $"{DateTime.Now:yyyy-MM-dd}-{DateTime.Now:dddd}.log";
            var filePath = Path.Combine(logFolder, fileName);

            // ✔️ Async append
            await File.AppendAllTextAsync(filePath, text);
        }
        catch (Exception ex)
        {
            // Log dosyasına yazılamazsa en azından console'a yaz
            Console.WriteLine("LOG WRITE ERROR: " + ex.Message);
        }
    }
    
}
