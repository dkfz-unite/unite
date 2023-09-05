import DomainApi from "../api/domain-api";
import searchPageActions from "@/_shared/store/search-page-actions";

export default function createActions(domainUrl) {
  const api = new DomainApi(domainUrl);

  return {
    ...searchPageActions,

    search: async function({state, getters, dispatch}) {
      try {
        const criteria = state.filtersCriteria.toSearchCriteria();
        const response = await api.search(criteria);
        state.rows = response.rows;
        state.rowsTotal = response.total;
      } catch (error) {
        state.rows = [];
        state.rowsTotal = 0;
        throw error;
      }
    },

    stats: async function({state, getters, dispatch}, criteria) {
      return await api.stats(criteria);
    },

    data: async function({state, getters, dispatch}, { data, criteria}) {
      return await api.data(data, criteria);
    }
  };
}
