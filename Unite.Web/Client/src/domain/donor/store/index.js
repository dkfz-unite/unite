import SearchPageStore from "@/_shared/store/search-page-store";

class DonorStore {
    namespaced = true;

    modules = {
        mris: new SearchPageStore(),
        genes: new SearchPageStore(),
        ssms: new SearchPageStore(),
        cnvs: new SearchPageStore(),
        svs: new SearchPageStore()
    };

    state = () => ({
    });

    actions = {
        clearState({state, dispatch}) {
            dispatch("mris/clear");
            dispatch("genes/clear");
            dispatch("ssms/clear");
            dispatch("cnvs/clear");
            dispatch("svs/clear");
        }
    }
}

export default DonorStore;