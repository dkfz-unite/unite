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

  static domains = Object.entries(this).map(([key, val]) => val.domain); 
}

export default class Settings {
  static domain = "ssm";
  static title = "Simple Somatic Mutation (SSM)";

  static tabs = Tabs;
}