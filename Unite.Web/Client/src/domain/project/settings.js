export class Tabs {
  static summary = {
    domain: "summary",
    title: "Summary",
    crumb: "Summary",
    icon: "las la-info-circle"
  };
  static donors = {
    domain: "donors",
    title: "Donors",
    crumb: "Donors",
    icon: "las la-user-circle"
  };
  static specimens = {
    domain: "specimens",
    title: "Specimens",
    crumb: "Specimens",
    icon: "las la-microscope"
  };
  static images = {
    domain: "images",
    title: "Images",
    crumb: "Images",
    icon: "las la-x-ray"
  };
  static genes = {
    domain: "genes",
    title: "Genes",
    crumb: "Genes",
    icon: "svguse:/icons.svg#u-gene"
  };
  static variants = {
    domain: "variants",
    title: "Variants",
    crumb: "Variants",
    icon: "svguse:/icons.svg#u-sm",
  };

  static domains = Object.entries(this).map(([key, val]) => val.domain);
}

export default class Settings {
  static domain = "project";
  static title = "Project";
  static tabs = Tabs;
}