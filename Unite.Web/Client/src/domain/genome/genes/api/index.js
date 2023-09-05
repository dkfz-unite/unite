// import ApiClient from "@/_shared/api/api-client";
// import settings from "@/settings";

// const client = new ApiClient();
// const genesurl = `${settings.urls.composer}/genes`;
// const genesStatsUrl = `${genesurl}/stats`;
// const genesDataUrl = `${genesurl}/data`;

// export async function search(criteria) {
//   let url = genesurl;
//   return await client.post(url, criteria);
// }

// export async function stats(criteria) {
//   let url = genesStatsUrl;
//   return await client.post(url, criteria);
// }

// export async function data(data, criteria) {
//   let url = genesDataUrl;
//   let model = { data: data, criteria: criteria };
//   return await client.post(url, model, { responseType: "blob" });
// }

// export default {
//   search,
//   stats,
//   data
// }

export default {};