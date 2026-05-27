<template>
  <div ref="container"></div>
</template>

<script>
import Two from 'two.js'

export default {
  props: {
    height: { type: Number, required: true },
  },

  mounted() {
    this.two = new Two({
      type: Two.Types.svg,
      width: "100%",
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
:deep(svg) {
  display: block;
}
</style>