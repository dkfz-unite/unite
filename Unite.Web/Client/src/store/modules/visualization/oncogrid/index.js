import SearchCriteria from "../../../../services/criteria/criteria.search.js";
import DrawerModel from "../../../../services/workflow/drawers/models/model.drawer.js";

const module = {
    namespaced: true,

    state: () => ({
        searchCriteria: new SearchCriteria(),
        drawer: new DrawerModel(),
    }),

    actions: {
        clearState({state}) {
            state.searchCriteria = new SearchCriteria();
        }
    }
}

export default module;