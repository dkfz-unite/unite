import ImagesApi from "../../images/api";

export default function createActions(api) {
  if (!(api instanceof ImagesApi)) {
    throw new Error("'api' must be an instance of 'ImagesApi'");
  }

  return {
    uploadImages: async function({state, getters, dispatch}, {type, data, format}) {
      // return await api.uploadImages(type, data, format);
      throw new Error("Not implemented");
    }
  }
}