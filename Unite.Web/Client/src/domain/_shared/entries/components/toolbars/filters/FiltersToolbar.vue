<template>
  <div class="row">
    <u-clear-button />
    <u-import-button />
    <u-export-button />
  </div>
</template>

<script>
import UClearButton from "./buttons/ClearButton.vue";
import UImportButton from "./buttons/ImportButton.vue";
import UExportButton from "./buttons/ExportButton.vue";

export default {
  components: {
    UClearButton,
    UImportButton,
    UExportButton
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