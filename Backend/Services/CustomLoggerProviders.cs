using Microsoft.Extensions.Logging;
using System.Collections.Concurrent;

namespace Backend_WanderGuide.Services
{
    public class CustomLoggerProvider : ILoggerProvider
    {
        private readonly ConcurrentDictionary<string, CustomLogger> _loggers = new();

        public ILogger CreateLogger(string categoryName)
        {
            return _loggers.GetOrAdd(categoryName, name => new CustomLogger(name));
        }

        public void Dispose()
        {
            _loggers.Clear();
        }
    }
}
