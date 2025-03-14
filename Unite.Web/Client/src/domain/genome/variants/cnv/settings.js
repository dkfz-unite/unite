export class Tabs {
  static summary = {
    domain: "summary",
    title: "Summary",
    crumb: "Summary",
    icon: "las la-info-circle"
  };
  static similars = {
    domain: "similars",
    title: "Similars",
    crumb: "Similars",
    icon: "las la-dna"
  };
  static effects = {
    domain: "effects",
    title: "Effects",
    crumb: "Effects",
    icon: "las la-exclamation-triangle"
  };

  static domains = Object.entries(this).map(([key, val]) => val.domain);
}

export default class Settings {
  static domain = "cnv";
  static title = "Copy Number Variant (CNV)";

  static tabs = Tabs;
}