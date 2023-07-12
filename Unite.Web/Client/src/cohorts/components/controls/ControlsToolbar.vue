<template>
  <div class="row">
    <u-export-button  
      :domain="domain" 
      :cohort="cohort"
      class="q-px-sm"
    />

    <u-show-button 
      :domain="domain" 
      :cohort="cohort"
      class="q-px-sm"
    />

    <u-download-button 
      v-if="canDownload"
      :domain="domain" 
      :cohort="cohort"
      class="q-px-sm"
    />

    <!-- <q-separator vertical /> -->

    <u-delete-buttomn 
      :domain="domain" 
      :cohort="cohort"
      class="q-px-sm"
      @deleted="$emit('deleted')" 
    />
  </div>
</template>

<script>
import UShowButton from "./buttons/ShowButton.vue";
import UExportButton from "./buttons/ExportButton.vue";
import UDownloadButton from "./buttons/DownloadButton.vue";
import UDeleteButtomn from "./buttons/DeleteButton.vue";
import DomainNames from "@/_models/domain/domain-names.js";

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

  computed: {
    canDownload() {
      const domains = [DomainNames.Donors, DomainNames.Mris, DomainNames.Cts, DomainNames.Tissues, DomainNames.Cells, DomainNames.Organoids, DomainNames.Xenografts];
      return domains.includes(this.domain?.name);
    }
  }
}
</script>