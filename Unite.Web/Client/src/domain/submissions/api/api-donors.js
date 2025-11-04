import ApiClient from "@/_shared/api/api-client";
import DonorSubmissionType from "../models/enums/submission-type-donor";
import settings from "@/settings";

const client = new ApiClient();
const submissionUrl = `${settings.urls.composer}/data/submission`;
const feedUrl = `${settings.urls.donors}`;

const formats = {
  json: { name: "json", path: "", headers: { "Content-Type": "application/json" } },
  tsv: { name: "tsv", path: "/tsv", headers: { "Content-Type": "text/tab-separated-values" } },
};

function validateFormat(format) {
  if (!formats[format]) {
    throw new Error(`Invalid format: ${format}`);
  }
}

export async function getSubmissionStatus(id) {
  const url = `${submissionUrl}/${id}/status`;
  return await client.get(url);
}

/**
 * Get submission document.
 * @param {number|string} id submission id.
 * @param {SubmissionType} type submission type.
 * @returns {Promise<Object>} A promise that resolves with the submission document.
 */
export async function getSubmission(id, type) {
  let url = null;

  if (type == DonorSubmissionType.DON)
    url = `${feedUrl}/entries/${id}`;
  else if (type == DonorSubmissionType.DON_TRT)
    url = `${feedUrl}/treatments/${id}`;

  if (!url)
    throw new Error(`Invalid submission type: ${type}`);

  return await client.get(url);
}

export default {
  getSubmissionStatus,
  getSubmission
}
