import SearchPageStore from "@/_shared/store/search-page-store";

class ImageStore {
  namespaced = true;

  modules = {
    genes: new SearchPageStore(),
    ssms: new SearchPageStore(),
    cnvs: new SearchPageStore(),
    svs: new SearchPageStore()
  };

  state = () => ({

  });

  actions = {
    clearState({ state, dispatch }) {
      dispatch("genes/clear");
      dispatch("ssms/clear");
      dispatch("cnvs/clear");
      dispatch("svs/clear");
    }
  }
}

export default ImageStore;