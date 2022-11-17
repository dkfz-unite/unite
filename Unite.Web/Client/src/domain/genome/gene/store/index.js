import FiltersCriteria from "@/_shared/components/filters/filters-criteria";
import FiltersContext from "@/_shared/components/filters/filters-context";

const module = {
  namespaced: true,

  state: () => ({
    donorsFiltersCriteria: new FiltersCriteria(),
    donorsFiltersContext: new FiltersContext(),
    donorsSelected: [],
    ssmsFiltersCriteria: new FiltersCriteria(),
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
        state.donorsFiltersCriteria = new FiltersCriteria();
        state.donorsFiltersContext = new FiltersContext();
        state.donorsSelected = [];
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