<template>
  <span>
    <span>{{ value.min.toLocaleString() }}</span> / <span>{{ value.max.toLocaleString() }}</span> / <span class="text-bold">{{ value.mean.toLocaleString() }}</span> / <span>{{ value.median.toLocaleString() }}</span>
  </span>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      required: true
    }
  }
};
</script>