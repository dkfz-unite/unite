import FiltersContext from "@/_shared/components/filters/filters-context";
import FiltersCriteria from "@/_shared/components/filters/filters-criteria";

const actions = {
  clear({state}) {
    state.filtersCriteria = new FiltersCriteria();
    state.filtersContext = new FiltersContext();
    state.rows = [];
    state.rowsTotal = 0;
    state.rowsSelected = [];
  }
}

export default actions;