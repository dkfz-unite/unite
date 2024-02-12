export class TabsBase {
  static summary = {
    domain: "summary",
    title: "Summary",
    crumb: "Summary",
    icon: "las la-info-circle"
  };
  static ancestry = {
    domain: "ancestry",
    title: "Ancestry",
    crumb: "Ansestry",
    icon: "las la-sitemap"
  };
  static profile = {
    domain: "profile",
    title: "Profile",
    crumb: "Profile",
    icon: "las la-chart-bar"
  };
  static genes = {
    domain: "genes",
    title: "Genes",
    crumb: "Genes",
    icon: "svguse:/icons.svg#u-gene"
  }
  static ssms = {
    domain: "ssms",
    title: "Simple Somatic Mutations (SSM)",
    crumb: "SSMs",
    icon: "svguse:/icons.svg#u-mutation",
  };
  static cnvs = {
    domain: "cnvs",
    title: "Copy Number Variants (CNV)",
    crumb: "CNVs",
    icon: "svguse:/icons.svg#u-cnv",
  };
  static svs = {
    domain: "svs",
    title: "Structural Variants (SV)",
    crumb: "SVs",
    icon: "svguse:/icons.svg#u-sv",
  };
}

export default class SettingsBase {

}