<template>
  <div class="row">
    <u-save-button />
    <u-load-button />
  </div>
</template>

<script>
import USaveButton from "./buttons/SaveButton.vue";
import ULoadButton from "./buttons/LoadButton.vue";

export default {
  components: {
    USaveButton,
    ULoadButton
  },

  props: {
    domain: {
      type: String,
      required: true
    }
  },

  provide() {
    return {
      domain: this.domain
    };
  }
}
</script>