import domainActions from "./actions";
import domainGetters from "./getters";
import createDomainState from "./state";

function createStore(domain = null) {
  return {
    namespaced: true,

    state: {
      ...createDomainState(domain)
    },

    getters: {
      ...domainGetters
    },
    
    actions: {
      ...domainActions
    }
  }
}

export default createStore;
