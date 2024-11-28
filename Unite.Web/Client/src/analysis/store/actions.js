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

  async loadAnalysisMeta({state}, data) {
    if (state.analyses.get(data.key).results) return;

    const results = await api.getAnalysisMeta(data.key);
    state.analyses.get(data.key).results = results;
  },

  async loadAnalysisData({state}, data) {
    const blob = await api.getAnalysisData(data.key);
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

  async runDESeq2Analysis({state, dispatch}, data) {
    data.key = await api.runDESeq2Analysis(data);
    state.analyses.set(data.key, data);
    dispatch("saveAnalyses");
  },

  async runSCellAnalysis({state, dispatch}, data) {
    data.key = await api.runSCellAnalysis(data);
    state.analyses.set(data.key, data);
    dispatch("saveAnalyses");
  },

  async runKMeierAnalysis({state, dispatch}, data) {
    data.key = await api.runKMeierAnalysis(data);
    state.analyses.set(data.key, data);
    dispatch("saveAnalyses");
  },

  async viewSCellAnalysis({state}, data) {
    if (state.analyses.get(data.key).results) return;

    const results = await api.viewSCellAnalysis(data.key);
    state.analyses.get(data.key).results = results;
  },

  async stopSCellAnalysis({state}, data) {
    await api.stopSCellAnalysis(data.key);
  },
};

export default actions;
