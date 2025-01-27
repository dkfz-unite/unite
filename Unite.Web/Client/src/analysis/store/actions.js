import api from "../api";

const PROCESSED_STATUS = "Processed";
const FAILED_STATUS = "Failed";

const actions = {
  async loadAnalyses({state}) {
    const payload = {
      userId: this.getters["identity/account"].email
    };

    const entries = await api.loadAnalyses(payload);
    const analyses = entries.map(entry => {
      entry.data = JSON.parse(entry.data);
      return [entry.id, entry];
    });

    state.analyses = new Map(analyses);
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
  },

  async loadAnalysisMeta({state}, data) {
    if (state.analyses.get(data.id).results) return;

    const blob = await api.getAnalysisMeta(data.id);
    return blob;
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
    dispatch("loadAnalyses");
  },

  async runDESeq2Analysis({state, dispatch}, data) {
    data.userId = this.getters["identity/account"].email;
    return await api.runDESeq2Analysis(data);
  },

  async runSCellAnalysis({state, dispatch}, data) {
    data.userid = this.getters["identity/account"].email;
    return await api.runSCellAnalysis(data);
  },

  async runKMeierAnalysis({state, dispatch}, data) {
    data.userid = this.getters["identity/account"].email;
    return await api.runKMeierAnalysis(data);
  },

  async viewSCellAnalysis({state}, data) {
    return await api.viewSCellAnalysis(data.id);
  },

  async updateSCellAnalysis({state}, data) {
    return await api.updateSCellAnalysis(data.id);
  },

  async stopSCellAnalysis({state}, data) {
    await api.stopSCellAnalysis(data.id);
  },
};

export default actions;
