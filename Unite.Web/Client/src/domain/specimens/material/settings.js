import SettingsBase, { TabsBase } from "../_shared/specimen/settings";

export class Tabs extends TabsBase {
  static domains = [...TabsBase.domains, ...Object.entries(this).map(([key, value]) => value.domain)];
}

export default class Settings extends SettingsBase {
  static domain = "material";
  static title = "Material";

  static tabs = Tabs;
}