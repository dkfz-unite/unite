import SettingsBase, { TabsBase } from "../_shared/specimen/settings";

export class Tabs extends TabsBase {
  static drugs = {
    domain: "drugs",
    title: "Drugs",
    crumb: "Drugs",
    icon: "las la-capsules"
  }
}

export default class Settings extends SettingsBase {
  static domain = "line";
  static title = "Cell Line";

  static tabs = Tabs;
}