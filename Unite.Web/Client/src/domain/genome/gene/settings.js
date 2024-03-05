export class Tabs {
  static summary = {
    domain: "summary",
    title: "Summary",
    crumb: "Summary",
    icon: "las la-info-circle"
  };
  static protein = {
    domain: "protein",
    title: "Protein",
    crumb: "Protein",
    icon: "svguse:/icons.svg#u-lolliplot"
  };
  static donors = {
    domain: "donors",
    title: "Donors",
    crumb: "Donors",
    icon: "las la-user-circle"
  };
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

  static domains = Object.entries(this).map(([key, val]) => val.domain);
}

export default class Settings {
  static domain = "gene";
  static title = "Gene";

  static tabs = Tabs;
}