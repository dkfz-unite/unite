export class Tabs {
  static summary = {
    domain: "summary",
    title: "Summary",
    crumb: "Summary",
    icon: "las la-info-circle"
  };
  static clinical = {
    domain: "clinical",
    title: "Clinical Data",
    crumb: "Clinical",
    icon: "las la-stethoscope"
  };
  static treatments = {
    domain: "treatments",
    title: "Treatments",
    crumb: "Treatments",
    icon: "las la-pills"
  };
  static specimens = {
    domain: "specimens",
    title: "Specimens",
    crumb: "Specimens",
    icon: "las la-microscope"
  };
  static mris = {
    domain: "mris",
    title: "Images",
    crumb: "Images",
    icon: "las la-x-ray"
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
  static domain = "donor";
  static title = "Donor";

  static tabs = Tabs;
}