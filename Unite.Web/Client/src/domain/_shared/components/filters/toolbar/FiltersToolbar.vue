<template>
  <div class="row q-px-xs">
    <u-clear-button />
    <u-import-button />
    <u-export-button />
    <u-save-button />
    <u-load-button />
  </div>
</template>

<script>
import UClearButton from "./buttons/ClearButton.vue";
import UImportButton from "./buttons/ImportButton.vue";
import UExportButton from "./buttons/ExportButton.vue";
import USaveButton from "./buttons/SaveButton.vue";
import ULoadButton from "./buttons/LoadButton.vue";

export default {
  components: {
    UClearButton,
    UImportButton,
    UExportButton,
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