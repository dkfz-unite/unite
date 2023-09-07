import DomainApi from "@/domain/_shared/api/domain-api";

export default class SpecimensApi extends DomainApi {
  constructor(type) {
    super(`specimens/${type}`);
  }
}
