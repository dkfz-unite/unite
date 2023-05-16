import { Screen } from 'quasar';

const module = {
  namespaced: true,

  state: () => ({
    display: false,
    show: false,
    mini: false
  }),

  actions: {
    show({ state }) {
      state.mini = false;
      state.show = true;
    },

    minimize({ state }) {
      if (Screen.lt.md) {
        state.show = false;
        state.mini = false;
      } else {
        state.mini = true;
      }
    },

    hide({ state }) {
      state.show = false;
      state.mini = false;
    },

    toggleShow({state}) {
      state.show = !state.show;
    }
  }
};

export default module;