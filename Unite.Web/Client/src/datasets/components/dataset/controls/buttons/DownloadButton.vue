<template>
  <q-dialog v-model="dialog" @keyup.esc="onCancel" persistent>
    <u-download-form 
      :domain="dataset?.domain" 
      :data="dataset?.data" 
      :loading="loading" 
      @submit="onDownload" 
      @cancel="onCancel"
    />
  </q-dialog>

  <q-btn
    :class="class"
    label="Download"
    icon="las la-file-download"
    color="secondary"
    dense flat no-caps
    @click="dialog = true">
  </q-btn>
</template>

<script>
import { exportFile } from "quasar";
import UDownloadForm from "@/_shared/components/download/DownloadForm.vue";

import api from "../../../../api";

export default {
  props: {
    dataset: {
      type: Object,
      required: true
    },
    class: {
      type: String,
      required: false
    }
  },

  components: {
    UDownloadForm
  },

  data() {
    return {
      dialog: false,
      loading: false
    };
  },

  methods: {
    async onDownload(model) {
      try {
        this.loading = true;
        const name = this.dataset.name.split(" ").join("_");
        const format = "application/zip";
        const content = await this.fetchData(model, this.dataset.criteria);
        exportFile(`${name}.zip`, content, format);
        this.dialog = false;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    async onCancel() {
      this.dialog = false;
    },

    async fetchData(model, criteria) {
      return await api[this.dataset.domain].downloadData(model, criteria);
    }
  }
};
</script>