import SearchPageStore from "@/_shared/store/search-page-store";

class SsmStore {
  namespaced = true;

  modules = {
    donors: new SearchPageStore()
  };

  state = () => ({

  });

  actions = {
    clearState({ state, dispatch }) {
      dispatch("donors/clear")
    }
  }
}

export default SsmStore;