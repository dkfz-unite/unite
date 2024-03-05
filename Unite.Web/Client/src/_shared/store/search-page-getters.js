const getters = {
  namespace(state, getters, rootState, rootGetters) {
    const domain = state.domain;
    const email = rootState.identity?.account?.email ?? "anonymous";
    return `${email}-cohorts-${domain}`;
  }
}

export default getters;