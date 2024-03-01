import ModelsApi from "@/domain/_shared/entries/api";
import Settings from "../settings";

export default class GenesApi extends ModelsApi {
  constructor() {
    super(Settings.domain);
  }
}
