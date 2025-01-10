import api, { pingSCellAnalysis } from "../api";

const PROCESSED_STATUS = "Processed";
const FAILED_STATUS = "Failed";

const actions = {
  async loadAnalyses({state}) {
    const data = {
      userid: this.getters["identity/account"].email
    };
    const json = await api.loadAnalyses(data);
    const entries = json ? json.map(analysis => [analysis.id, analysis]) : [];
    const analyses = new Map(entries);
    state.analyses = analyses;
    state.analyses.forEach(element => {
      element.datasets = JSON.parse(element.datasets);
    });
  },
  saveAnalyses({state}) {
    if (state.analyses?.size) {
      state.analyses.forEach((analysis) => delete analysis.results);
      const entries = Array.from(state.analyses.entries());
      const json = JSON.stringify(entries);
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
          dispatch("loadAnalysisStatus", { id: analysis.id });
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
    const status = await api.getAnalysisStatus(data.id);
    state.analyses.get(data.id).status = status;
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
    const analysis = state.analyses.get(data.id);
    const waitStatuses = [PROCESSED_STATUS, FAILED_STATUS];
    if (!waitStatuses.includes(analysis.status)) return;

    await api.deleteAnalysis(data.id);
    state.analyses.delete(data.id);
    dispatch("saveAnalyses");
  },

  async runDESeq2Analysis({state, dispatch}, data) {
    data.userid = this.getters["identity/account"].email;
    data.key = await api.runDESeq2Analysis(data);
    state.analyses.set(data.key, data);
    dispatch("saveAnalyses");
  },

  async runSCellAnalysis({state, dispatch}, data) {
    data.userid = this.getters["identity/account"].email;
    data.key = await api.runSCellAnalysis(data);
    state.analyses.set(data.key, data);
    dispatch("saveAnalyses");
  },

  async runKMeierAnalysis({state, dispatch}, data) {
    data.userid = this.getters["identity/account"].email;
    data.key = await api.runKMeierAnalysis(data);
    state.analyses.set(data.key, data);
    dispatch("saveAnalyses");
  },

  async pingSCellAnalysis({state}, data) {
    return await api.pingSCellAnalysis(data.key);
  },

  async viewSCellAnalysis({state}, data) {
    if (state.analyses.get(data.key).results) return;

    const results = await api.viewSCellAnalysis(data.key);
    state.analyses.get(data.key).results = results;
  },

  async stopSCellAnalysis({state}, data) {
    await api.stopSCellAnalysis(data.key);
    state.analyses.get(data.key).results = null;
  },
};

export default actions;
