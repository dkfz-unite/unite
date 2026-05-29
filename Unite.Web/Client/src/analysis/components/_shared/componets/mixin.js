import UDialog from "./Dialog.vue";

const mixin = {
  components: {
    UDialog
  },

  props: {
    datasets: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      analysis: null,
    };
  }
}