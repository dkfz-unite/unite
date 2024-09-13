import settings from "@/settings";
import ApiClient from "@/_shared/api/api-client";

const client = new ApiClient();
const analysisUrl = `${settings.urls.analysis}/task`;

export async function getAnalysisStatus(key) {
  const url = `${analysisUrl}/${key}/status`;
  return await client.get(url);
}

export async function getAnalysisMeta(key) {
  const url = `${analysisUrl}/${key}/meta`;
  return await client.get(url, { responseType: "blob" });
}

export async function getAnalysisData(key) {
  const url = `${analysisUrl}/${key}/data`;
  return await client.get(url, { responseType: "blob" });
}

export async function deleteAnalysis(key) {
  const url = `${analysisUrl}/${key}`;
  return await client.delete(url);
}

export async function runRnaDeAnalysis(data) {
  const url = `${analysisUrl}/rna-de`;
  return await client.post(url, data);
}

export async function runRnascAnalysis(data) {
  const url = `${analysisUrl}/rnasc`;
  return await client.post(url, data);
}

export default {
  getAnalysisStatus,
  getAnalysisMeta,
  getAnalysisData,
  deleteAnalysis,
  runRnaDeAnalysis,
  runRnascAnalysis
};
