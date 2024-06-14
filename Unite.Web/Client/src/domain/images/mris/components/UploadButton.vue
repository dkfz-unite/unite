<template>
  <u-upload-dialog
    v-model="dialogMris"
    subject="Upload MRI images data"
    templatePathJson="/templates/images/mris.json"
    templatePathTsv="/templates/images/mris.tsv"
    modelDocs="https://github.com/dkfz-unite/unite-images-feed/blob/main/Docs/api-models-mris.md"
    :uploadMethod="uploadImages"
  />

  <q-btn
    label="Upload"
    title="Upload data"
    icon="las la-file-upload"
    color="primary"
    @click="dialogMris = true"
    v-close-popup
    dense flat no-caps>
  </q-btn>
</template>

<script>
import UUploadDialog from "@/domain/_shared/entries/components/upload/UploadDialog.vue";
import ImagesApi from "../api";

export default {
  components: {
    UUploadDialog,
  },

  setup() {
    return {
      imagesApi: new ImagesApi(),
    };
  },

  data() {
    return {
      dialogMris: false,
    };
  },

  methods: {
    async uploadImages(data, format) {
      return await this.imagesApi.uploadMris(data, format);
    }
  }
}
</script>