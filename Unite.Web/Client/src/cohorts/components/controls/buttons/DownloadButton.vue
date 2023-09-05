<template>
  <q-dialog v-model="dialog" @keyup.esc="onCancel" persistent>
    <u-download-form :domain="domain?.name" :data="cohort?.data" :loading="loading" @submit="onDownload" @cancel="onCancel" />
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

export default {
  props: ["domain", "cohort", "class"],

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
        const name = this.cohort.name.split(" ").join("_");
        const format = "application/zip";
        const content = await this.fetchData(model, this.cohort.criteria);
        exportFile(`${name}.zip`, content, format);
        this.dialog = false;
      } catch {
        // Do nothing
      } finally {
        this.loading = false;
      }
    },

    async onCancel() {
      this.dialog = false;
    },

    async fetchData(model, criteria) {
      return await this.$store.dispatch(`${this.domain.name}/data`, { data: model, criteria: criteria });
    }
  }
};
</script>