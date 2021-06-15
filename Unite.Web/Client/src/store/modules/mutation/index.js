import SearchCriteria from "../../../services/criteria/criteria.search.js";

const module = {
    namespaced: true,

    state: () => ({
        donorsSearchCriteria: new SearchCriteria(),
        donorsSelected: []
    }),

    actions: {
        clearState({state}) {
            state.donorsSearchCriteria = new SearchCriteria();
            state.donorsSelected = []
        }
    }
}

export default module;