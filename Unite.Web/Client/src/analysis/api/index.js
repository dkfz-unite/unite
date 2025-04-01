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

export async function runDESeq2Analysis(data) {
  const url = `${analysisTaskUrl}/deseq2`;
  return await client.post(url, data);
}

export async function runSCellAnalysis(data) {
  const url = `${analysisTaskUrl}/scell`;
  return await client.post(url, data);
}

export async function runKMeierAnalysis(data) {
  const url = `${analysisTaskUrl}/kmeier`;
  return await client.post(url, data);
}

export async function runMethAnalysis(data) {
  const url = `${analysisTaskUrl}/meth`;
  return await client.post(url, data);
}

export async function getSCellAnalysisModels() {
  const url = `${analysisTaskUrl}/scell/models`;
  return await client.get(url);
}

export async function viewSCellAnalysis(data) {
  const url = `${analysisUrl}/viewer/scell?id=${data}`;
  return await client.post(url);
}

export async function updateSCellAnalysis(data) {
  const url = `${analysisUrl}/viewer/scell?id=${data}`;
  return await client.put(url, data);
}

export async function stopSCellAnalysis(data) {
  const url = `${analysisUrl}/viewer/scell?id=${data}`;
  return await client.delete(url);
}


export default {
  loadAnalyses,
  getAnalysisStatus,
  getAnalysisMeta,
  getAnalysisData,
  deleteAnalysis,
  runDESeq2Analysis,
  runSCellAnalysis,
  runKMeierAnalysis,
  runMethAnalysis,
  viewSCellAnalysis,
  getSCellAnalysisModels,
  updateSCellAnalysis,
  stopSCellAnalysis
};
