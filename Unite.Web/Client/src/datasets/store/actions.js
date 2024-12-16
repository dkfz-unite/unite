import ApiClient from "@/_shared/api/api-client";
import settings from "@/settings";
const client = new ApiClient();
const datasetUrl = `${settings.urls.composer}/data/datasets`;

const actions = {
  addDataset({state, dispatch}, dataset) {
    dataset.key = crypto.randomUUID();
    state.datasets.push(dataset);
    dispatch("saveDatasets", dataset);
  },

  async deleteDataset({state}, key) {
    state.datasets = state.datasets.filter(dataset => dataset.key !== key);
    const id = key
    const url = `${datasetUrl}/${id}/deleteDataset`;
    const response = await client.post(url);
  },

  async loadDatasets({state}) {
    const data = {
      domain: state.domain,
      userid: this.getters["identity/account"].email
    };
    const url = `${datasetUrl}/loadDatasets`;
    state.datasets = await client.post(url, data);
    state.datasets.forEach(dataset => {
      dataset.criteria = JSON.parse(dataset.criteria);
    });
  },

  async saveDatasets({state}, dataset) {
    const owner = this.getters["identity/account"].email;
      if(dataset.key)
      {
        const data = {
          name: dataset.name,
          date: dataset.date,
          description: dataset.description,
          criteria: JSON.stringify(dataset.criteria),
          domain: state.domain,
          userid: owner
        };
        const url = `${datasetUrl}/addDataset`;
        dataset.key = await client.post(url, data);
      }
  }
}

export default actions;
