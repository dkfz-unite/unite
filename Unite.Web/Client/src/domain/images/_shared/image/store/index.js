import createModelsStore from "@/domain/_shared/common/store";
import { TabsBase } from "../settings";

function createStore() {
  return {
    namespaced: true,

    modules: {
      [TabsBase.genes.domain]: createModelsStore(TabsBase.genes.domain),
      [TabsBase.ssms.domain]: createModelsStore(TabsBase.ssms.domain),
      [TabsBase.cnvs.domain]: createModelsStore(TabsBase.cnvs.domain),
      [TabsBase.svs.domain]: createModelsStore(TabsBase.svs.domain),
    },
    
    state: {},

    actions: {
      clearState({ state, dispatch }) {
        dispatch(`${TabsBase.genes.domain}/clear`);
        dispatch(`${TabsBase.ssms.domain}/clear`);
        dispatch(`${TabsBase.cnvs.domain}/clear`);
        dispatch(`${TabsBase.svs.domain}/clear`);
      }
    }
  }
}

export default createStore;
