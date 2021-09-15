import SearchCriteria from "../../../services/criteria/criteria.search.js";

const module = {
    namespaced: true,

    state: () => ({
        genesSearchCriteria: new SearchCriteria(),
        genesSelected: [],
        mutationsSearchCriteria: new SearchCriteria(),
        mutationsSelected: []
    }),

    actions: {
        clearState({state}) {
            state.genesSearchCriteria = new SearchCriteria();
            state.genesSelected = [];
            state.mutationsSearchCriteria = new SearchCriteria();
            state.mutationsSelected = [];
        }
    }
}

export default module;