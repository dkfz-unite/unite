import FiltersCriteria from "../../../_shared/components/filters/filters-criteria";
import FiltersContext from "../../../_shared/components/filters/filters-context";

const module = {
    namespaced: true,

    state: () => ({
        filtersCriteria: new FiltersCriteria(),
        filtersContext: new FiltersContext()
    }),

    actions: {
        clearState({state}) {
            state.filtersCriteria = new FiltersCriteria();
            state.filtersContext = new FiltersContext();
        }
    }
}

export default module;