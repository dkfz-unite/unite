import settings from "@/settings";
import ApiClient from "@/_shared/api/api-client";

const client = new ApiClient();
const analysisUrl = `${settings.urls.analysis}/tasks`;

export async function getAnalysisStatus(key) {
  const url = `${analysisUrl}/${key}`;
  return await client.get(url);
}

export async function getAnalysisResults(key) {
  const url = `${analysisUrl}/${key}/results`;
  return await client.get(url);
}

export async function downloadAnalysisResults(key) {
  const url = `${analysisUrl}/${key}/data`;
  return await client.get(url, { responseType: "blob" });
}

export async function deleteAnalysis(key) {
  const url = `${analysisUrl}/${key}`;
  return await client.delete(url);
}

export async function runDExpAnalysis(data) {
  const url = `${analysisUrl}/dexp`;
  return await client.post(url, data);
}

export default {
  getAnalysisStatus,
  getAnalysisResults,
  downloadAnalysisResults,
  deleteAnalysis,
  runDExpAnalysis
};
