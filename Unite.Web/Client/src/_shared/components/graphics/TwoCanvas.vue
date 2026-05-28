<template>
  <div ref="container"></div>
</template>

<script>
import Two from 'two.js'

export default {
  props: {
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    type: { type: String, default: 'svg' }
  },

  mounted() {
    const types = {
      svg: Two.Types.svg,
      canvas: Two.Types.canvas,
      webgl: Two.Types.webgl
    }

    this.two = new Two({
      type: types[this.type] ?? Two.Types.svg,
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
    redraw() {
      this.two.update()
    }
  }
}
</script>

<style scoped>
:deep(svg), :deep(canvas) {
  display: block;
}
</style>