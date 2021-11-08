<template>
  <div class="row">
    <u-show-button 
      :identity="identity" 
      :domain="domain" 
      :cohort="cohort"
      class="q-px-sm"
    />

    <u-export-button 
      :identity="identity" 
      :domain="domain" 
      :cohort="cohort"
      class="q-px-sm"
    />

    <u-download-button 
      :identity="identity" 
      :domain="domain" 
      :cohort="cohort"
      class="q-px-sm"
    />

    <q-separator vertical />

    <u-delete-buttomn 
      :identity="identity" 
      :domain="domain" 
      :cohort="cohort"
      class="q-px-sm"
      @deleted="$emit('deleted')" 
    />
  </div>
</template>

<script>
// import Vue from "vue";
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
    identity: {
      type: String,
      required: true
    },

    domain: {
      type: Object,
      required: true
    },

    cohort: {
      type: Object,
      required: true
    }
  },

  emits: ["deleted"]
}
</script>