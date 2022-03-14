import FiltersCriteria from "../../../_shared/components/filters/filters-criteria";
import FiltersContext from "../../../_shared/components/filters/filters-context";

const module = {
    namespaced: true,

    state: () => ({
        mriImagesFiltersCriteria: new FiltersCriteria(),
        mriImagesFiltersContext: new FiltersContext(),
        mriImagesSelected: [],
        genesFiltersCriteria: new FiltersCriteria(),
        genesFiltersContext: new FiltersContext(),
        genesSelected: [],
        mutationsFiltersCriteria: new FiltersCriteria(),
        mutationsFiltersContext: new FiltersContext(),
        mutationsSelected: []
    }),

    actions: {
        clearState({state}) {
            state.mriImagesFiltersCriteria = new FiltersCriteria();
            state.mriImagesFiltersContext = new FiltersContext();
            state.mriImagesSelected = [];
            state.genesFiltersCriteria = new FiltersCriteria();
            state.genesFiltersContext = new FiltersContext();
            state.genesSelected = [];
            state.mutationsFiltersCriteria = new FiltersCriteria();
            state.mutationsFiltersContext = new FiltersContext();
            state.mutationsSelected = [];
        }
    }
}

export default module;