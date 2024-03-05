import { TabsBase } from "../_shared/image/settings";

export class Tabs extends TabsBase {
  static domains = [...TabsBase.domains, ...Object.entries(this).map(([key, value]) => value.domain)];
}

export default class Settings {
  static domain = "mri";
  static title = "MR Image";

  static tabs = Tabs;
}