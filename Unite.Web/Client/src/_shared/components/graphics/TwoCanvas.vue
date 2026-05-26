<template>
  <div ref="container"></div>
</template>

<script>
import Two from 'two.js'

export default {
  props: {
    width: { type: Number, required: true },
    height: { type: Number, required: true },
  },

  watch: {
    width(val) {
      this.resize()
    },
    height(val) {
      this.resize()
    }
  },

  mounted() {
    this.two = new Two({
      type: Two.Types.svg,
      width: this.width,
      height: this.height,
    }).appendTo(this.$refs.container)

    this.$emit('ready', this.two)
  },

  beforeUnmount() {
    this.two.pause()
    this.two.clear()
  },

  methods: {
    resize() {
      this.two.width = this.width
      this.two.height = this.height
      this.two.renderer.setSize(this.width, this.height)
      this.$emit('resize', this.two)
    },

    redraw() {
      this.two.update()
    }
  }
}
</script>