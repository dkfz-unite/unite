import DomainApi from "@/domain/_shared/api/domain-api";

export default class VariantsApi extends DomainApi {
  constructor(type) {
    super(`variants/${type}`);
  }
}
