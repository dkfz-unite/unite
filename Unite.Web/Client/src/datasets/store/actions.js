function getPath(owner, domain) {
  return `${owner}-datasets-${domain}`;
}

const actions = {
  getDataset({state}, key) {
    return state.datasets?.find(dataset => dataset.key === key);
  },

  addDataset({state, dispatch}, dataset) {
    dataset.key = crypto.randomUUID();
    state.datasets.push(dataset);
    dispatch("saveDatasets");
  },

  deleteDataset({state, dispatch}, key) {
    state.datasets = state.datasets.filter(dataset => dataset.key !== key);
    dispatch("saveDatasets");
  },

  loadDatasets({state}, {owner, domain}) {
    const path = getPath(owner, domain);
    const json = localStorage.getItem(path);
    const datasets = json ? JSON.parse(json) : [];
    state.datasets = datasets;
  },

  saveDatasets({state}, {owner, domain}) {
    const path = getPath(owner, domain);
    if (state.datasets?.length) {
      const json = JSON.stringify(state.datasets);
      localStorage.setItem(path, json);
    } else {
      localStorage.removeItem(path);
    }
  }
}

export default actions;
