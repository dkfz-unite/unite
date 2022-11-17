import FiltersCriteria from "../../../../../_shared/components/filters/filters-criteria";
import FiltersContext from "../../../../../_shared/components/filters/filters-context";

const module = {
    namespaced: true,

    state: () => ({
        // donorsFiltersCriteria: new FiltersCriteria(),
        // donorsFiltersContext: new FiltersContext(),
        // donorsSelected: []
    }),

    actions: {
        clearState({state}) {
            // state.donorsFiltersCriteria = new FiltersCriteria();
            // state.donorsFiltersContext = new FiltersContext();
            // state.donorsSelected = [];
        }
    }
}

export default module;