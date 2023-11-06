import api from "../api";

const PROCESSED_STATUS = "Processed";
const FAILED_STATUS = "Failed";

const actions = {
  loadAnalyses({state, getters}) {
    const json = localStorage.getItem(getters.namespace);
    const entries = json ? JSON.parse(json) : [];
    const analyses = new Map(entries);
    state.analyses = analyses;
  },

  saveAnalyses({state, getters}) {
    if (state.analyses?.size) {
      state.analyses.forEach((analysis) => delete analysis.results);
      const entries = Array.from(state.analyses.entries());
      const json = JSON.stringify(entries);
      localStorage.setItem(getters.namespace, json);
    } else {
      localStorage.removeItem(getters.namespace);
    }
  },

  async startUpdatingStatus({state, dispatch}) {
    if (!state.analyses?.size) return;

    state.token = setInterval(() => {
      const waitStatuses = [PROCESSED_STATUS, FAILED_STATUS];
      const waitAnalyses = Array
        .from(state.analyses.values())
        .filter(analysis => !waitStatuses.includes(analysis.status));
  
      if (waitAnalyses.length) {
        waitAnalyses.forEach((analysis) => { 
          dispatch("loadAnalysisStatus", { key: analysis.key });
        });
      } else {
        dispatch("stopUpdatingStatus");;
      }
    }, 2000);
  },

  async stopUpdatingStatus({state}) {
    clearInterval(state.token);
    state.token = null;
  },

  async loadAnalysisStatus({state, dispatch}, data) {
    const status = await api.getAnalysisStatus(data.key);
    state.analyses.get(data.key).status = status;
    // dispatch("saveAnalyses");
  },

  async loadAnalysisResults({state}, data) {
    if (state.analyses.get(data.key).results) return;

    const results = await api.getAnalysisResults(data.key);
    state.analyses.get(data.key).results = results;
  },

  async downloadAnalysisResults({state}, data) {
    const blob = await api.downloadAnalysisResults(data.key);
    return blob;
  },

  async deleteAnalysis({state, dispatch}, data) {
    const analysis = state.analyses.get(data.key);
    const waitStatuses = [PROCESSED_STATUS, FAILED_STATUS];
    if (!waitStatuses.includes(analysis.status)) return;

    await api.deleteAnalysis(data.key);
    state.analyses.delete(data.key);
    dispatch("saveAnalyses");
  },

  async runDExpAnalysis({state, dispatch}, data) {
    data.key = await api.runDExpAnalysis(data);

    state.analyses.set(data.key, data);

    dispatch("saveAnalyses");
  },
};

export default actions;
