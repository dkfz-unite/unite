using System;

namespace Unite.Web.Configuration
{
    public static class EnvironmentConfig
    {
        public static string _defaultComposerHost = "http://composer.unite";

        public static string ComposerHost => GetEnvironmentVariable("UNITE_COMPOSER_HOST", _defaultComposerHost);

        private static string GetEnvironmentVariable(string variable, string defaultValue = null)
        {
            var value = Environment.GetEnvironmentVariable(variable);

            return value ?? defaultValue;
        }
    }
}
