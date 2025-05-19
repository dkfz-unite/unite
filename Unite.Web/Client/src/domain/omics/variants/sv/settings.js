export class Tabs {
  static summary = {
    domain: "summary",
    title: "Summary",
    crumb: "Summary",
    icon: "las la-info-circle"
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
  static domain = "sv";
  static title = "Structural Variant (SV)";

  static tabs = Tabs;
}