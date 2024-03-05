import datasetState from "@/datasets/store/state";
import datasetActions from "@/datasets/store/actions";
import domainActions from "../../common/store/actions";
import domainGetters from "../../common/store/getters";
import createDomainState from "../../common/store/state";

function createStore(domain) {
  return {
    namespaced: true,

    state: {
      ...createDomainState(domain),
      ...datasetState
    },

    getters: {
      ...domainGetters
    },
    
    actions: {
      ...domainActions,
      ...datasetActions
    }
  }
}

export default createStore;