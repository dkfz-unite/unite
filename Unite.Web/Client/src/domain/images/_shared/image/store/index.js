import { TabsBase } from "../settings";
import SearchPageStore from "@/_shared/store/search-page-store";

class ImageStore {
  namespaced = true;

  modules = {
    [TabsBase.genes.domain]: new SearchPageStore(),
    [TabsBase.ssms.domain]: new SearchPageStore(),
    [TabsBase.cnvs.domain]: new SearchPageStore(),
    [TabsBase.svs.domain]: new SearchPageStore()
  };

  state = () => ({

  });

  actions = {
    clearState({ state, dispatch }) {
      dispatch(`${TabsBase.genes.domain}/clear`);
      dispatch(`${TabsBase.ssms.domain}/clear`);
      dispatch(`${TabsBase.cnvs.domain}/clear`);
      dispatch(`${TabsBase.svs.domain}/clear`);
    }
  }
}

export default ImageStore;