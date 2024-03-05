<template>
  <div class="column">
    <u-tissue :specimen="specimen">
      <slot>
        <!-- Content -->
      </slot>
    </u-tissue>
  </div>
</template>

<script>
import UTissue from "./Tissue.vue";

export default {
  components: {
    UTissue
  },
  
  props: {
    specimen: {
      type: Object,
      required: true
    }
  }
}
</script>