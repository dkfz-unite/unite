<template>
  <u-upload-dialog
    v-model="dialog"
    subject="Mri-Images"
    templatePathJson="/templates/images/mri-images.json"
    templatePathTsv="/templates/images/mri-images.tsv"
    modelDocs="https://github.com/dkfz-unite/unite-images-feed/blob/main/Docs/api-models-images.md"
    :uploadMethod="uploadImages"
  />

  <q-btn
    label="Upload"
    title="Upload data"
    icon="las la-file-upload"
    color="primary"
    @click="onUploadImages"
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
      dialog: false,
    };
  },

  methods: {
    async onUploadImages() {
      this.dialog = true;
    },

    async uploadImages(data, format) {
      if (format === "json")
        return await this.imagesApi.uploadImages(data, format);
      else
        return await this.imagesApi.uploadMris(data);
    },
  }
}
</script>