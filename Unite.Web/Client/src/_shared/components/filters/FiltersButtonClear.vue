<template>
  <q-btn
    label="Clear"
    icon="las la-times-circle"
    title="Clear filters"
    color="orange"  
    dense flat no-caps
    @click="$emit('click')"
  />
</template>

<script>
export default {
  emits: ["click"]
}
</script>