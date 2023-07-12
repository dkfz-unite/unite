import searchPageActions from "@/_shared/store/search-page-actions.js";
import api from "../api";

const actions = {
  ...searchPageActions,

  async search({state, getters, dispatch}) {
    const criteria = state.filtersCriteria.toSearchCriteria();
    const response = await api.search(criteria);
    state.rows = response.rows;
    state.rowsTotal = response.total;
  },

  async stats({state, getters, dispatch}, criteria) {
    return await api.stats(criteria);
  },

  async data({state, getters, dispatch}, criteria) {
    return await api.data(criteria);
  }
}

export default actions;