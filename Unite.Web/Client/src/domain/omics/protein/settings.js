export class Tabs {
  static summary = {
    domain: "summary",
    title: "Summary",
    crumb: "Summary",
    icon: "las la-info-circle"
  };

  static domains = Object.entries(this).map(([key, val]) => val.domain);
}

export default class Settings {
  static domain = "protein";
  static title = "Protein";

  static tabs = Tabs;
}