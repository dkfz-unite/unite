import DomainApi from "@/domain/_shared/api/domain-api";

export default class ImagesApi extends DomainApi {
  constructor(type) {
    super(`images/${type}`);
  }
}
