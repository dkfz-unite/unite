<template>
  <div class="row items-center q-gutter-x-xs">
    <div v-if="line" class="u-line" :class="`bg-${color}`"></div>
    <div class="u-point" :class="`bg-${color}`"></div>
    <div class="q-mr-xs" :class="`text-${color}`">{{ title }}</div>
  </div>
</template>

<script>
import { colors } from "quasar";

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: "grey-6"
    },
    line: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
.u-line {
  width: 50px;
  height: 2px;
}

.u-point {
  width: 15px;
  height: 15px;
  border-radius: 50%;
}
</style>