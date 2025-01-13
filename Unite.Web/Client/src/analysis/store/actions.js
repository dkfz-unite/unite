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
    analyses.forEach(element => {
    var data = JSON.parse(element.data);
    const mapData = new Map(Object.entries(data));
      element.datasets = mapData.get("Datasets");
    });
    state.analyses = analyses;
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
    if (state.analyses.get(data.id).results) return;

    const results = await api.getAnalysisMeta(data.id);
    state.analyses.get(data.id).results = results;
  },

  async loadAnalysisData({state}, data) {
    const blob = await api.getAnalysisData(data.id);
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
    data.id = await api.runDESeq2Analysis(data);
    state.analyses.set(data.id, data);
    dispatch("saveAnalyses");
  },

  async runSCellAnalysis({state, dispatch}, data) {
    data.userid = this.getters["identity/account"].email;
    data.id = await api.runSCellAnalysis(data);
    state.analyses.set(data.id, data);
    dispatch("saveAnalyses");
  },

  async runKMeierAnalysis({state, dispatch}, data) {
    data.userid = this.getters["identity/account"].email;
    data.id = await api.runKMeierAnalysis(data);
    state.analyses.set(data.id, data);
    dispatch("saveAnalyses");
  },

  async pingSCellAnalysis({state}, data) {
    return await api.pingSCellAnalysis(data.id);
  },

  async viewSCellAnalysis({state}, data) {
    if (state.analyses.get(data.id).results) return;

    const results = await api.viewSCellAnalysis(data.id);
    state.analyses.get(data.id).results = results;
  },

  async stopSCellAnalysis({state}, data) {
    await api.stopSCellAnalysis(data.id);
    state.analyses.get(data.id).results = null;
  },
};

export default actions;
