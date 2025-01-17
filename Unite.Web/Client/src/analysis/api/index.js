import settings from "@/settings";
import ApiClient from "@/_shared/api/api-client";

const client = new ApiClient();
const analysisUrl = `${settings.urls.analysis}`;
const analysisTaskUrl = `${settings.urls.analysis}/task`;
const analysisTasksUrl = `${settings.urls.analysis}/tasks`;

export async function getAnalysisStatus(key) {
  const url = `${analysisTaskUrl}/${key}/status`;
  return await client.put(url);
}

export async function getAnalysisMeta(key) {
  const url = `${analysisTaskUrl}/${key}/meta`;
  return await client.get(url, { responseType: "blob" });
}

export async function getAnalysisData(key) {
  const url = `${analysisTaskUrl}/${key}/data`;
  return await client.get(url, { responseType: "blob" });
}

export async function deleteAnalysis(key) {
  const url = `${analysisTaskUrl}/${key}`;
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

export async function viewSCellAnalysis(data) {
  const url = `${analysisUrl}/scell/${data}`;
  return await client.post(url);
}

export async function stopSCellAnalysis(data) {
  const url = `${analysisUrl}/scell/${data}`;
  return await client.delete(url);
}

export async function loadAnalyses(data) {
  const url = `${analysisTasksUrl}`;
  return await client.post(url, data);
}


export default {
  getAnalysisStatus,
  getAnalysisMeta,
  getAnalysisData,
  deleteAnalysis,
  runDESeq2Analysis,
  runSCellAnalysis,
  runKMeierAnalysis,
  viewSCellAnalysis,
  stopSCellAnalysis,
  loadAnalyses
};
