import settings from "@/settings";
import ApiClient from "@/_shared/api/api-client";

const client = new ApiClient();
const composerUrl = `${settings.urls.composer}`;
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

export async function getAnalysisMeta(id, file = null) {
  const url = `${analysisTaskUrl}/${id}/meta`;
  return await client.get(url, { responseType: "blob", params: { file: file } });
}

export async function getAnalysisData(id) {
  const url = `${analysisTaskUrl}/${id}/data`;
  return await client.get(url, { responseType: "blob" });
}

export async function deleteAnalysis(id) {
  const url = `${analysisTaskUrl}/${id}`;
  return await client.delete(url);
}

export async function runAnalysis(type, data) {
  const url = `${analysisTaskUrl}/${type}`;
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

export async function getMetadataOptions() {
  const url = `${analysisUrl}/metadata/options`;
  return await client.get(url);
}

export async function getMetadataValues(property) {
  const url = `${analysisUrl}/metadata/values?key=${property}`;
  return await client.get(url);
}

export async function getAutocompleteOptions(data) {
  const url = `${composerUrl}/autocomplete?model=${data.model}&field=${data.field}&query=${data.query || ""}`;
  return await client.get(url);
}

export default {
  loadAnalyses,
  getAnalysisStatus,
  getAnalysisMeta,
  getAnalysisData,
  deleteAnalysis,
  runAnalysis,
  getScellAnalysisModels,
  viewScellAnalysis,
  updateScellAnalysis,
  stopScellAnalysis,
  getMetadataOptions,
  getMetadataValues,
  getAutocompleteOptions
};
