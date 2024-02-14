<template>
  <div class="row q-gutter-sm">
    <u-export-button
      :domain="domain" 
      :cohort="cohort"
    />

    <u-show-button
      :domain="domain" 
      :cohort="cohort"
    />

    <u-download-button
      :domain="domain" 
      :cohort="cohort"
    />

    <!-- <q-separator vertical /> -->

    <u-delete-buttomn
      :domain="domain" 
      :cohort="cohort"
      @click="$emit('deleted')" 
    />
  </div>
</template>

<script>
import UShowButton from "./buttons/ShowButton.vue";
import UExportButton from "./buttons/ExportButton.vue";
import UDownloadButton from "./buttons/DownloadButton.vue";
import UDeleteButtomn from "./buttons/DeleteButton.vue";

export default {
  components: {
    UShowButton,
    UExportButton, 
    UDownloadButton,
    UDeleteButtomn
  },

  props: {
    domain: {
      type: Object,
      required: true
    },
    
    cohort: {
      type: Object,
      required: true
    }
  },

  emits: ["deleted"],
}
</script>