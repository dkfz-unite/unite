import ModelsApi from "@/domain/_shared/entries/api";

export default class ImagesApi extends ModelsApi {
  constructor(type) {
    super(`images/${type}`);
  }
}
