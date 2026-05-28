<template>
  <q-input
    v-model="option.value"
    :label="option.title"
    type="number" :min="option.min" :max="option.max" :step="option.step"
    dense square outlined
  />
</template>

<script>
export default {
  props: {
    option: {
      type: Object,
      required: true
    }
  }
}
</script>