namespace Unite.Web.Configuration;

public static class EnvironmentConfig
{
    public static string ComposerHost => Environment.GetEnvironmentVariable("UNITE_COMPOSER_HOST");
}
