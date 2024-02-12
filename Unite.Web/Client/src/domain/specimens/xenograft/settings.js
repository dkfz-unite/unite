import SettingsBase, { TabsBase } from "../_shared/specimen/settings";

export class Tabs extends TabsBase {
  static drugs = {
    domain: "drugs",
    title: "Drugs",
    crumb: "Drugs",
    icon: "las la-capsules"
  };  
  static interventions = {
    domain: "interventions",
    title: "Interventions",
    crumb: "Interventions",
    icon: "las la-syringe"
  };
}

export default class Settings extends SettingsBase {
  static domain = "xenograft";
  static title = "Xenograft";

  static tabs = Tabs;
}