using System;
using System.IO;
using Microsoft.Extensions.Logging;

namespace Backend_WanderGuide.Services
{
    public class CustomLogger : ILogger
    {
        private readonly string _categoryName;
        private readonly string _logFilePath;
        private static readonly object _lock = new(); // Ensures thread safety

        public CustomLogger(string categoryName)
        {
            _categoryName = categoryName;
            _logFilePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "logs", "app.log");

            // Ensure the directory existscd l
            var logDirectory = Path.GetDirectoryName(_logFilePath);
            if (!Directory.Exists(logDirectory))
            {
                Directory.CreateDirectory(logDirectory);
            }
        }

        public IDisposable? BeginScope<TState>(TState state) => null; // No scope implementation needed

        public bool IsEnabled(LogLevel logLevel) => logLevel != LogLevel.None;

        public void Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception? exception, Func<TState, Exception?, string> formatter)
        {
            if (!IsEnabled(logLevel))
                return;

            string logMessage = $"{DateTime.Now:yyyy-MM-dd HH:mm:ss} [{logLevel}] {_categoryName}: {formatter(state, exception)}";

            if (exception != null)
            {
                logMessage += $"\nException: {exception.Message}\nStackTrace: {exception.StackTrace}";
            }

            // Write to Console
            Console.WriteLine(logMessage);

            // Write to Log File (Thread-Safe)
            lock (_lock)
            {
                File.AppendAllText(_logFilePath, logMessage + Environment.NewLine);
            }
        }
    }
}
