namespace Unite.Web.Configuration;

public static class EnvironmentConfig
{
    public static string IdentityHost => Environment.GetEnvironmentVariable("UNITE_IDENTITY_HOST");
    public static string ComposerHost => Environment.GetEnvironmentVariable("UNITE_COMPOSER_HOST");
    public static string DonorsFeedHost => Environment.GetEnvironmentVariable("UNITE_DONORS_FEED_HOST");
    public static string SpecimensFeedHost => Environment.GetEnvironmentVariable("UNITE_SPECIMENS_FEED_HOST");
    public static string ImagesFeedHost => Environment.GetEnvironmentVariable("UNITE_IMAGES_FEED_HOST");
    public static string GenomeFeedHost => Environment.GetEnvironmentVariable("UNITE_GENOME_FEED_HOST");
}
