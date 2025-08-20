import settings from "@/settings";
import ApiClient from "@/_shared/api/api-client";

const client = new ApiClient();
const analysisUrl = `${settings.urls.analysis}`;
const analysisTaskUrl = `${settings.urls.analysis}/analysis`;
const analysisTasksUrl = `${settings.urls.analysis}/analyses`;

export async function loadAnalyses(data) {
  const url = `${analysisTasksUrl}`;
  return await client.post(url, data);
}

export async function getAnalysisStatus(id) {
  const url = `${analysisTaskUrl}/${id}/status`;
  return await client.put(url);
}

export async function getAnalysisMeta(id) {
  const url = `${analysisTaskUrl}/${id}/meta`;
  return await client.get(url, { responseType: "blob" });
}

export async function getAnalysisData(id) {
  const url = `${analysisTaskUrl}/${id}/data`;
  return await client.get(url, { responseType: "blob" });
}

export async function deleteAnalysis(id) {
  const url = `${analysisTaskUrl}/${id}`;
  return await client.delete(url);
}

export async function runSurvAnalysis(data) {
  const url = `${analysisTaskUrl}/surv`;
  return await client.post(url, data);
}

export async function runDmAnalysis(data) {
  const url = `${analysisTaskUrl}/dm`;
  return await client.post(url, data);
}

export async function runPcamAnalysis(data) {
  const url = `${analysisTaskUrl}/pcam`;
  return await client.post(url, data);
}

export async function runDeAnalysis(data) {
  const url = `${analysisTaskUrl}/de`;
  return await client.post(url, data);
}

export async function runGafAnalysis(data) {
  const url = `${analysisTaskUrl}/gaf`;
  return await client.post(url, data);
}

export async function runScellAnalysis(data) {
  const url = `${analysisTaskUrl}/scell`;
  return await client.post(url, data);
}

export async function getScellAnalysisModels() {
  const url = `${analysisTaskUrl}/scell/models`;
  return await client.get(url);
}

export async function viewScellAnalysis(data) {
  const url = `${analysisUrl}/viewer/scell?id=${data}`;
  return await client.post(url);
}

export async function updateScellAnalysis(data) {
  const url = `${analysisUrl}/viewer/scell?id=${data}`;
  return await client.put(url, data);
}

export async function stopScellAnalysis(data) {
  const url = `${analysisUrl}/viewer/scell?id=${data}`;
  return await client.delete(url);
}


export default {
  loadAnalyses,
  getAnalysisStatus,
  getAnalysisMeta,
  getAnalysisData,
  deleteAnalysis,
  runSurvAnalysis,
  runDmAnalysis,
  runPcamAnalysis,
  runDeAnalysis,
  runGafAnalysis,
  runScellAnalysis,
  getScellAnalysisModels,
  viewScellAnalysis,
  updateScellAnalysis,
  stopScellAnalysis
};
