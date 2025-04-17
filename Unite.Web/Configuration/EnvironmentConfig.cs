namespace Unite.Web.Configuration;

public static class EnvironmentConfig
{
    public static string IdentityHost => Environment.GetEnvironmentVariable("UNITE_IDENTITY_HOST");
    public static string ComposerHost => Environment.GetEnvironmentVariable("UNITE_COMPOSER_HOST");
    public static string AnalysisHost => Environment.GetEnvironmentVariable("UNITE_ANALYSIS_HOST");
    public static string FeedDonorsHost => Environment.GetEnvironmentVariable("UNITE_FEED_DONORS_HOST");
    public static string FeedImagesHost => Environment.GetEnvironmentVariable("UNITE_FEED_IMAGES_HOST");
    public static string FeedSpecimensHost => Environment.GetEnvironmentVariable("UNITE_FEED_SPECIMENS_HOST");
    public static string FeedGenomeHost => Environment.GetEnvironmentVariable("UNITE_FEED_GENOME_HOST");
    public static string ViewerCxgHost => Environment.GetEnvironmentVariable("UNITE_VIEWER_CXG_HOST");
}
