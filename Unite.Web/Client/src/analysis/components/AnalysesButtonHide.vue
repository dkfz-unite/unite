<template>
  <q-btn
    id="analysis-button-hide"
    icon="las la-chevron-circle-left" 
    dense rounded flat 
    @click="$emit('click')" 
  />
</template>

<script>
export default {
  emits: ["click"]
}
</script>