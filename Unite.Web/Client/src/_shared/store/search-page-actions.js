import FiltersContext from "../components/filters/filters-context.js";
import FiltersCriteria from "../components/filters/filters-criteria.js";

const actions = {
  clear({state}) {
    state.filtersCriteria = new FiltersCriteria();
    state.filtersContext = new FiltersContext();
    state.rows = [];
    state.rowsTotal = 0;
    state.rowsSelected = [];
  },

  addCohort({state, getters, dispatch}, data) {
    state.cohorts.push(data);
  },

  deleteCohort({state, getters, dispatch}, name) {
    state.cohorts = state.cohorts.filter(cohort => cohort.name !== name);
  },

  //TODO: rename to loadCohorts
  initialize({state, getters}) {
    const json = localStorage.getItem(getters.namespace);
    const cohorts = json ? JSON.parse(json) : [];
    state.cohorts = cohorts;
  },

  //TODO: rename to saveCohorts
  dispose({state, getters}) {
    if (state.cohorts?.length) {
      const json = JSON.stringify(state.cohorts);
      localStorage.setItem(getters.namespace, json);
    } else {
      localStorage.removeItem(getters.namespace);
    }
  }
}

export default actions;