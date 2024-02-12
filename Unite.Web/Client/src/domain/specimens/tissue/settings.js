import SettingsBase, { TabsBase } from "../_shared/specimen/settings";

export class Tabs extends TabsBase {
}

export default class Settings extends SettingsBase {
  static domain = "material";
  static title = "Material";

  static tabs = Tabs;
}