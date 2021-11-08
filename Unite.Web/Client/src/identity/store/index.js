import api from "../api";

const module = {
  namespaced: true,

  state: () => ({
    account: null
  }),

  actions: {
    async logOut() {
      try {
        await api.signOut();
        location.href = "/";
      } catch(error) {
        location.href = "/";
      }
    }
  }
}

export default module;