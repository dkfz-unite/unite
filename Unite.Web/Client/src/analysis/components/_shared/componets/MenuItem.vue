<template>
  <q-item v-if="show" @click="$emit('click')" clickable v-close-popup dense>
    <q-item-section>
      <q-item-label>
        <slot />
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },

  emits: ["click"]
}
</script>