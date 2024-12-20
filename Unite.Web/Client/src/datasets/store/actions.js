import ApiClient from "@/_shared/api/api-client";
import settings from "@/settings";
const client = new ApiClient();
const datasetsUrl = `${settings.urls.composer}/data/datasets`;
const datasetUrl = `${settings.urls.composer}/data/dataset`;

const actions = {
  async delete({state}, key) {
    state.datasets = state.datasets.filter(dataset => dataset.key !== key);
    const url = `${datasetUrl}/${key}`;
    await client.delete(url);
  },

  async load({state}) {
    const data = {
      domain: state.domain,
      userid: this.getters["identity/account"].email
    };
    const url = `${datasetsUrl}`;
    state.datasets = await client.post(url, data);
    state.datasets.forEach(dataset => {
      dataset.criteria = JSON.parse(dataset.criteria);
    });
  },

  async add({state}, dataset) {
    const owner = this.getters["identity/account"].email;
    
    const data = {
      name: dataset.name,
      date: dataset.date,
      description: dataset.description,
      criteria: JSON.stringify(dataset.criteria),
      domain: state.domain,
      userid: owner
    };
    const url = `${datasetUrl}`;
    dataset.key = await client.post(url, data);
    state.datasets.push(dataset);
  }
}

export default actions;
