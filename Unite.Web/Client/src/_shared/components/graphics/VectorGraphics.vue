<template>
  <canvas ref="canvasRef" :width="width" :height="height" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  createWorld,
  addEntity,
  addComponent,
  query,
  type World,
} from 'bitecs'

export default defineComponent({
  props: {
    width: {
      type: Number,
      default: 800,
    },
    height: {
      type: Number,
      default: 600,
    },
  },
})
</script>

<style scoped lang="scss">

</style>