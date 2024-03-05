import createModelsStore from "@/domain/_shared/common/store";
import { Tabs } from "../settings";

function createStore() {
  return {
    namespaced: true,

    modules: {
      [Tabs.donors.domain]: createModelsStore(Tabs.donors.domain),
    },

    state: {},

    actions: {
      clearState({ state, dispatch }) {
        dispatch(`${Tabs.donors.domain}/clear`)
      }
    }
  }
}

export default createStore;
