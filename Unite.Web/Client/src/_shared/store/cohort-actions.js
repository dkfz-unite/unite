const actions = {
  getCohort({state, getters}, name) {
    return state.cohorts?.find(cohort => cohort.name == name);
  },

  addCohort({state, getters, dispatch}, data) {
    state.cohorts.push(data);
    dispatch("saveCohorts");
  },

  deleteCohort({state, getters, dispatch}, name) {
    state.cohorts = state.cohorts.filter(cohort => cohort.name !== name);
    dispatch("saveCohorts");
  },

  loadCohorts({state, getters}) {
    const json = localStorage.getItem(getters.namespace);
    const cohorts = json ? JSON.parse(json) : [];
    state.cohorts = cohorts;
  },

  saveCohorts({state, getters}) {
    if (state.cohorts?.length) {
      const json = JSON.stringify(state.cohorts);
      localStorage.setItem(getters.namespace, json);
    } else {
      localStorage.removeItem(getters.namespace);
    }
  }
}

export default actions;