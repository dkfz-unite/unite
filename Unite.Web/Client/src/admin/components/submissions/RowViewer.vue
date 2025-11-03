<template>
  <div v-if="!!value" class="row q-gutter-xs">
    <div>{{ label }}</div>
    <div class="text-weight-medium">{{ value }}</div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      required: true
    },
    label: {
      type: String,
      required: true
    }
  }
}
</script>