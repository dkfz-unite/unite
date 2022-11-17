import FiltersCriteria from "@/_shared/components/filters/filters-criteria";
import FiltersContext from "@/_shared/components/filters/filters-context";

const module = {
    namespaced: true,

    state: () => ({
        mriImagesFiltersCriteria: new FiltersCriteria(),
        mriImagesFiltersContext: new FiltersContext(),
        mriImagesSelected: [],
        genesFiltersCriteria: new FiltersCriteria(),
        genesFiltersContext: new FiltersContext(),
        genesSelected: [],
        ssmsFiltersCriteria: new FiltersCriteria(),
        ssmsFiltersContext: new FiltersContext(),
        ssmsSelected: [],
        cnvsFiltersCriteria: new FiltersCriteria(),
        cnvsFiltersContext: new FiltersContext(),
        cnvsSelected: [],
        svsFiltersCriteria: new FiltersCriteria(),
        svsFiltersContext: new FiltersContext(),
        svsSelected: []
    }),

    actions: {
        clearState({state}) {
            state.mriImagesFiltersCriteria = new FiltersCriteria();
            state.mriImagesFiltersContext = new FiltersContext();
            state.mriImagesSelected = [];
            state.genesFiltersCriteria = new FiltersCriteria();
            state.genesFiltersContext = new FiltersContext();
            state.genesSelected = [];
            state.ssmsFiltersCriteria = new FiltersCriteria();
            state.ssmsFiltersContext = new FiltersContext();
            state.ssmsSelected = [];
            state.cnvsFiltersCriteria = new FiltersCriteria();
            state.cnvsFiltersContext = new FiltersContext();
            state.cnvsSelected = [];
            state.svsFiltersCriteria = new FiltersCriteria();
            state.svsFiltersContext = new FiltersContext();
            state.svsSelected = [];
        }
    }
}

export default module;