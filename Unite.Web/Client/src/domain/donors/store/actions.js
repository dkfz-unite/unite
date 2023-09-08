import DonorsApi from "../api";

export default function createActions(api) {
  if (!(api instanceof DonorsApi)) {
    throw new Error("'api' must be an instance of 'DonorsApi'");
  }

  return {
    uploadDonors: async function({state, getters, dispatch}, {data, format}) {
      return await api.uploadDonors(data, format);
    },

    uploadTreatments: async function({state, getters, dispatch}, {data, format}) {
      return await api.uploadTreatments(data, format);
    }
  }
}
