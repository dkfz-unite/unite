<template>
  <div class="row q-gutter-sm">
    <u-export-button :dataset="dataset" />

    <u-show-button :dataset="dataset" />

    <u-download-button :dataset="dataset" />

    <!-- <q-separator vertical /> -->

    <u-delete-buttomn :dataset="dataset" @click="$emit('deleted')" />
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
    dataset: {
      type: Object,
      required: true
    }
  },

  emits: ["deleted"],
}
</script>