import ModelsApi from "@/domain/_shared/entries/api";

export default class VariantsApi extends ModelsApi {
  constructor(type) {
    super(`variants/${type}`);
  }
}
