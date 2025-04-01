import settings from "@/settings";
import ModelsApi from "@/domain/_shared/entries/api";
import Settings from "../settings";

export default class ProjectsApi extends ModelsApi {
  feedUrl = `${settings.urls.donors}`;

  constructor() {
    super(Settings.domain);
  }
}
