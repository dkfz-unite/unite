const mixin = {
  props: {
    samples: {
      type: [Array],
      default: () => []
    }
  },

  data() {
    return {
      sample: this.samples?.length ? this.samples[0] : null
    }
  }
}

export default mixin;