import SearchCriteria from "../../../services/criteria/criteria.search.js";

const module = {
    namespaced: true,

    state: () => ({
        mutationsSearchCriteria: new SearchCriteria(),
        mutationsSelected: []
    }),

    actions: {
        clearState({state}) {
            state.mutationsSearchCriteria = new SearchCriteria();
            state.mutationsSelected = []
        }
    }
}

export default module;