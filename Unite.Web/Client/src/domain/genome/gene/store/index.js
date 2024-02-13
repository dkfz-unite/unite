import { Tabs } from "../settings";
import SearchPageStore from "@/_shared/store/search-page-store";

class GeneStore {
  namespaced = true;

  modules = {
    [Tabs.donors.domain]: new SearchPageStore(),
    [Tabs.ssms.domain]: new SearchPageStore(),
    [Tabs.cnvs.domain]: new SearchPageStore(),
    [Tabs.svs.domain]: new SearchPageStore()
  };

  state = () => ({
  });

  actions = {
      clearState({state, dispatch}) {
        dispatch(`${Tabs.donors.domain}/clear`);
        dispatch(`${Tabs.ssms.domain}/clear`);
        dispatch(`${Tabs.cnvs.domain}/clear`);
        dispatch(`${Tabs.svs.domain}/clear`);
      }
  }
}

export default GeneStore;