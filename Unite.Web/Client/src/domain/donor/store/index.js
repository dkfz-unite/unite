import { Tabs } from "../settings";
import SearchPageStore from "@/_shared/store/search-page-store";

class DonorStore {
  namespaced = true;

  modules = {
    [Tabs.mris.domain]: new SearchPageStore(),
    [Tabs.genes.domain]: new SearchPageStore(),
    [Tabs.ssms.domain]: new SearchPageStore(),
    [Tabs.cnvs.domain]: new SearchPageStore(),
    [Tabs.svs.domain]: new SearchPageStore()
  };

  state = () => ({
  });

  actions = {
    clearState({ state, dispatch }) {
      dispatch(`${Tabs.mris.domain}/clear`);
      dispatch(`${Tabs.genes.domain}/clear`);
      dispatch(`${Tabs.ssms.domain}/clear`);
      dispatch(`${Tabs.cnvs.domain}/clear`);
      dispatch(`${Tabs.svs.domain}/clear`);
    }
  }
}

export default DonorStore;