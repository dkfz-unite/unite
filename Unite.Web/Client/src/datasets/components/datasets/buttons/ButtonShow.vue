<template>
  <q-btn
    id="datasets-button-show"
    icon="las la-archive"
    rounded flat dense
    @click="$emit('click')"
  />
</template>

<script>
export default {
  emits: ["click"]
}
</script>