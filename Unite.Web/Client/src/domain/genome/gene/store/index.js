import createModelsStore from "@/domain/_shared/common/store";
import { Tabs } from "../settings";

function createStore() {
  return {
    namespaced: true,

    modules: {
      [Tabs.donors.domain]: createModelsStore(Tabs.donors.domain),
      [Tabs.ssms.domain]: createModelsStore(Tabs.ssms.domain),
      [Tabs.cnvs.domain]: createModelsStore(Tabs.cnvs.domain),
      [Tabs.svs.domain]: createModelsStore(Tabs.svs.domain),
    },
    
    state: {},

    actions: {
      clearState({ state, dispatch }) {
        dispatch(`${Tabs.donors.domain}/clear`);
        dispatch(`${Tabs.ssms.domain}/clear`);
        dispatch(`${Tabs.cnvs.domain}/clear`);
        dispatch(`${Tabs.svs.domain}/clear`);
      }
    }
  }
}

export default createStore;
