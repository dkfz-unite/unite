<template>
  <div v-if="specimens" class="column">
    <u-tissues :tissues="specimens.tissues" />
  </div>
</template>

<script>
import UTissues from "./Tissues.vue";

export default {
  props: {
    specimens: {
      type: Object,
      required: true
    }
  },

  components: {
    UTissues: UTissues
  }
}
</script>