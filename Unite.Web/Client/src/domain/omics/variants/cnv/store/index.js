function createStore() {
  return {
    namespaced: true,

    state: {},

    actions: {
      clearState({ state, dispatch }) {
      }
    }
  }

}

export default createStore;
