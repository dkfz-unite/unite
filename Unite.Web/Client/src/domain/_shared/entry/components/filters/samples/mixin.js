const mixin = {
  props: {
    samples: {
      type: [Array],
      default: () => []
    },

    showSamples: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      sample: this.samples?.length ? this.samples[0] : null
    }
  }
}

export default mixin;