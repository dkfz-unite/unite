const getters = {
  account(state, getters, rootState, rootGetters) {
    return rootState.identity?.account;
  },

  // namespace(state, getters, rootState, rootGetters) {
  //   const domain = state.domain;
  //   const email = rootState.identity?.account?.email ?? "anonymous";
  //   return `${email}-datasets-${domain}`;
  // }
}

export default getters;