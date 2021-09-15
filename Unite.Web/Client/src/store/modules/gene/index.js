import SearchCriteria from "../../../services/criteria/criteria.search.js";

const module = {
    namespaced: true,

    state: () => ({
        donorsSearchCriteria: new SearchCriteria(),
        mutationsSearchCriteria: new SearchCriteria(),
        donorsSelected: [],
        mutationsSelected: []
    }),

    actions: {
        clearState({state}) {
            state.donorsSearchCriteria = new SearchCriteria();
            state.mutationsSearchCriteria = new SearchCriteria();
            state.donorsSelected = [];
            state.mutationsSelected = [];
        }
    }
}

export default module;