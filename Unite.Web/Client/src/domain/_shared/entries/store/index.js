import domainActions from "../../common/store/actions";
import domainGetters from "../../common/store/getters";
import createDomainState from "../../common/store/state";

function createStore(domain) {
  return {
    namespaced: true,

    state: {
      ...createDomainState(domain),
    },

    getters: {
      ...domainGetters,
      
      datasets(state, getters, rootState, rootGetters) {
        return rootState.datasets.datasets.filter(dataset => dataset.domain === state.domain);
      }
    },
    
    actions: {
      ...domainActions,
    }
  }
}

export default createStore;
