using Microsoft.Extensions.Logging;
using System;
using System.IO;

public class FileLogger : ILogger
{
    private readonly string _filePath;
    private static readonly object _lock = new object();

    public FileLogger(string filePath)
    {
        _filePath = filePath;
    }

    public IDisposable BeginScope<TState>(TState state) => null;

    public bool IsEnabled(LogLevel logLevel) => true;

    public void Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception exception, Func<TState, Exception, string> formatter)
    {
        if (formatter == null)
        {
            throw new ArgumentNullException(nameof(formatter));
        }

        string message = $"{DateTime.UtcNow}: {logLevel} - {formatter(state, exception)}{Environment.NewLine}";

        lock (_lock) // Prevents multiple threads from writing at the same time
        {
            File.AppendAllText(_filePath, message);
        }
    }
}
