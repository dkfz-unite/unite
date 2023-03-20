const mixin = {
  props: {
    samples: {
      type: [Array],
      default: () => []
    }
  },

  data() {
    return {
      sample: null
    }
  }
}

export default mixin;