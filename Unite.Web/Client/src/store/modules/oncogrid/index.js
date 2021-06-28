import SearchCriteria from "../../../services/criteria/criteria.search.js";
import DrawerModel from "../../../services/workflow/drawers/models/model.drawer.js";

const module = {
    namespaced: true,

    state: () => ({
        searchCriteria: new SearchCriteria(),
        drawer: new DrawerModel(),
    })
}

export default module;