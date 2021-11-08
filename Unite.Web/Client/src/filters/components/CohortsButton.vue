<template>
  <q-btn
    id="presets-button"
    icon="las la-filter"
    rounded flat dense
    @click="$emit('click')"
  />
</template>

<script>
export default {
  emits: ["click"]
}
</script>