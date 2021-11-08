<template>
  <div class="row q-px-xs">
    <u-clear-button @clear="$emit('clear')" />
    <u-import-button />
    <u-export-button />
    <u-save-button @save="$refs.filters.loadCohorts()" />
    <u-load-button ref="filters" />
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

  emits: ["clear"],

  computed: {
    identity() {
      return this.$store.state.identity.account?.email;
    },

    criteria() {
      return this.$store.state[this.domain].filtersCriteria;
    },

    selected() {
      return this.$store.state[this.domain].selected;
    }
  },

  provide() {
    return {
      domain: this.domain,
      criteria: this.criteria,
      selected: this.selected,
      identity: this.identity
    };
  }
}
</script>