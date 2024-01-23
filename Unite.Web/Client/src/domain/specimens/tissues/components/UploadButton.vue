<template>
  <u-upload-dialog
    v-model="dialog"
    subject="Materials"
    templatePathJson="/templates/tissues.json"
    templatePathTsv="/templates/tissues.tsv"
    modelDocs="https://github.com/dkfz-unite/unite-specimens-feed/blob/main/Docs/api-models-specimens.md"
    :uploadMethod="uploadTissues"
  />

  <q-btn
    label="Upload"
    title="Upload data"
    icon="las la-file-upload"
    color="primary"
    @click="onUploadTissues"
    v-close-popup
    dense flat no-caps>
  </q-btn>
</template>

<script>
import SpecimensApi from '@/domain/specimens/_shared/api/specimens/index.js';
import UUploadDialog from '@/domain/_shared/components/upload/UploadDialog.vue';

export default {
  components: {
    UUploadDialog,
  },

  setup() {
    return {
      specimensApi: new SpecimensApi(),
    };
  },

  data() {
    return {
      dialog: false,
    };
  },

  methods: {
    async onUploadTissues() {
      this.dialog = true;
    },

    async uploadTissues(data, format) {
      if (format === "json") {
        return await this.specimensApi.uploadSpecimens(data);
      }
      return await this.specimensApi.uploadTissues(data);
    },
  }
}
</script>