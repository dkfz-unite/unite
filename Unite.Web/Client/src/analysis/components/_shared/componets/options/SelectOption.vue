<template>
  <q-select
    v-model="option.value"
    :options="option.options"
    :label="option.title"
    map-options dense options-dense square outlined
  />
</template>

<script>export default {
  props: {
    option: {
      type: Object,
      required: true
    }
  }
}
</script>