import SearchPageStore from "@/_shared/store/search-page-store";

class GeneStore {
  namespaced = true;

  modules = {
    donors: new SearchPageStore(),
    ssms: new SearchPageStore(),
    cnvs: new SearchPageStore(),
    svs: new SearchPageStore()
  };

  state = () => ({
  });

  actions = {
      clearState({state, dispatch}) {
        dispatch("donors/clear");
        dispatch("ssms/clear");
        dispatch("cnvs/clear");
        dispatch("svs/clear");
      }
  }
}

export default GeneStore;