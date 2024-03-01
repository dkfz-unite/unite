<template>
  <u-link :to="{ name: Settings.domain, params: { id: id.toString() } }">
    <slot>
      {{ id }}
    </slot>
  </u-link>
</template>

<script>
import Settings from "../settings";

export default {
  props: {
    id: {
      type: Number,
      required: true
    }
  },

  setup() {
    return {
      Settings
    }
  }
}
</script>