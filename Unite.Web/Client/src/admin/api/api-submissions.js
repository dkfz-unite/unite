import ApiClient from "@/_shared/api/api-client";
import settings from "@/settings.js";

const client = new ApiClient();
const submissionsUrl = `${settings.urls.composer}/admin/submissions`;

export async function getDonorsSubmission() {
    const url = `${submissionsUrl}`;
    return await client.get(url);
}
async function updateSubmissionToPrepared(id){
    let url = `${submissionsUrl}/${id}`;
    return await client.post(url);
}
async function updateRejectComment(id, comment){
    let url = `${submissionsUrl}/${id}/updateRejectComment/${comment}`;
    return await client.post(url, comment);
}
export default {
    getDonorsSubmission,
    updateSubmissionToPrepared,
    updateRejectComment
}