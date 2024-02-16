<template>
  <div class="row q-gutter-sm">
    <u-export-button
      :domain="domain" 
      :dataset="dataset"
    />

    <u-show-button
      :domain="domain" 
      :dataset="dataset"
    />

    <u-download-button
      :domain="domain" 
      :dataset="dataset"
    />

    <!-- <q-separator vertical /> -->

    <u-delete-buttomn
      :domain="domain" 
      :dataset="dataset"
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
    dataset: {
      type: Object,
      required: true
    }
  },

  emits: ["deleted"],
}
</script>