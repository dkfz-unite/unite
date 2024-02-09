<template>
  <span>
    <span :class="class">{{ title }}</span> (<span>Min</span> / <span>Max</span> / <span class="text-bold">Mean</span> / <span>Median</span>)
  </span>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    class: {
      type: String,
      default: ""
    }
  }
};
</script>