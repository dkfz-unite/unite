<template>
  <q-btn
    id="analysis-button-show"
    icon="las la-chart-pie"
    rounded flat dense
    @click="$emit('click')"
  />
</template>

<script>
export default {
  emits: ["click"]
}
</script>