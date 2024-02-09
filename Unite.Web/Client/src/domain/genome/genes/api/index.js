import Settings from "../settings";
import DomainApi from "@/domain/_shared/api/domain-api";

export default class GenesApi extends DomainApi {
  constructor() {
    super(Settings.domain);
  }
}
