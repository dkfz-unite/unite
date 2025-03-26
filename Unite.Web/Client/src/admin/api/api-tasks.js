import ApiClient from "@/_shared/api/api-client";
import settings from "@/settings.js";

const client = new ApiClient();
const tasksUrl = `${settings.urls.composer}/admin/tasks`;
const donorsFeedUrl = `${settings.urls.donors}`;
const imagesFeedUrl = `${settings.urls.images}`;
const specimensFeedUrl = `${settings.urls.specimens}`;
const genomeFeedUrl = `${settings.urls.genome}`;

export async function getGeneralStats() {
  const url = `${tasksUrl}/stats`;
  return await client.get(url);
}

export async function getSubmissionStats() {
  const url = `${tasksUrl}/stats/submission`;
  return await client.get(url);
}

export async function getAnnotationStats() {
  const url = `${tasksUrl}/stats/annotation`;
  return await client.get(url);
}

export async function getIndexingStats() {
  const url = `${tasksUrl}/stats/indexing`;
  return await client.get(url);
}

export async function indexProjects() {
  const url = `${donorsFeedUrl}/indexing/projects`;
  return await client.post(url);
}

export async function indexDonors() {
  const url = `${donorsFeedUrl}/indexing/donors`;
  return await client.post(url);
}

export async function indexImages() {
  const url = `${imagesFeedUrl}/indexing`;
  return await client.post(url);
}

export async function indexSpecimens() {
  const url = `${specimensFeedUrl}/indexing`;
  return await client.post(url);
}

export async function indexGenes() {
  const url = `${genomeFeedUrl}/indexing/genes`;
  return await client.post(url);
}

export async function indexVariants() {
  const url = `${genomeFeedUrl}/indexing/variants`;
  return await client.post(url);
}


export default {
  getGeneralStats,
  getSubmissionStats,
  getAnnotationStats,
  getIndexingStats,
  indexProjects,
  indexDonors,
  indexImages,
  indexSpecimens,
  indexGenes,
  indexVariants
}
