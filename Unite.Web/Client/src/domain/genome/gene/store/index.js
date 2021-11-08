import FiltersCriteria from "../../../../_shared/components/filters/filters-criteria";
import FiltersContext from "../../../../_shared/components/filters/filters-context";

const module = {
  namespaced: true,

  state: () => ({
      donorsFiltersCriteria: new FiltersCriteria(),
      donorsFiltersContext: new FiltersContext(),
      donorsSelected: [],

      mutationsFiltersCriteria: new FiltersCriteria(),
      mutationsFiltersContext: new FiltersContext(),
      mutationsSelected: []
  }),

  actions: {
      clearState({state}) {
          state.donorsFiltersCriteria = new FiltersCriteria();
          state.donorsFiltersContext = new FiltersContext();
          state.donorsSelected = [];

          state.mutationsFiltersCriteria = new FiltersCriteria();
          state.mutationsFiltersContext = new FiltersContext();
          state.mutationsSelected = [];
      }
  }
}

export default module;