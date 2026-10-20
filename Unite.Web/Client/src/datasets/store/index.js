import settings from "@/settings";
import ApiClient from "@/_shared/api/api-client";
import Dataset from "./models/dataset";

const client = new ApiClient();
const datasetsUrl = `${settings.urls.composer}/data/datasets`;
const datasetUrl = `${settings.urls.composer}/data/dataset`;

export default class DatasetsStore {
  namespaced = true;
  
  state = {
    datasets: []
  };

  getters = {
    datasets: state => state.datasets
  };

  actions = {
    addOne: async function({state, dispatch}, dataset) {    
      const data = Dataset.toRecord(dataset);

      const url = `${datasetUrl}`;
      await client.post(url, data);
      await dispatch("loadAll");
    },

    deleteOne: async function({state, dispatch}, id) {
      const url = `${datasetUrl}/${id}`;
      await client.delete(url);
      await dispatch("loadAll");
    },

    loadAll: async function({state}) {
      const url = `${datasetsUrl}`;
      const records = await client.post(url, {});
      state.datasets = records.map(Dataset.fromRecord);
    }
  }
}
