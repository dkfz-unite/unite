import { Tabs } from "../settings";
import SearchPageStore from "@/_shared/store/search-page-store";

class SsmStore {
  namespaced = true;

  modules = {
    [Tabs.donors.domain]: new SearchPageStore()
  };

  state = () => ({

  });

  actions = {
    clearState({ state, dispatch }) {
      dispatch(`${Tabs.donors.domain}/clear`)
    }
  }
}

export default SsmStore;