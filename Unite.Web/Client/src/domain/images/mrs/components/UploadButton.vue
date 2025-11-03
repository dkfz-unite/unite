<template>
  <u-upload-dialog
    v-model="dialogMrs"
    subject="Upload MR images data"
    templatePathJson="/templates/images/mrs.json"
    templatePathTsv="/templates/images/mrs.tsv"
    modelDocs="https://github.com/dkfz-unite/unite-images-feed/blob/main/Docs/api-models-mrs.md"
    :uploadMethod="uploadImages"
  />

  <q-btn
    label="Upload"
    title="Upload data"
    icon="las la-file-upload"
    color="primary"
    @click="dialogMrs = true"
    v-close-popup
    dense flat no-caps>
  </q-btn>
</template>

<script>
import UUploadDialog from "@/domain/_shared/entries/components/upload/UploadDialog.vue";
import ImagesFeedApi from "@/domain/submissions/api/api-feed-images";

export default {
  components: {
    UUploadDialog,
  },

  setup() {
    return {
      imagesFeedApi: new ImagesFeedApi(),
    };
  },

  data() {
    return {
      dialogMrs: false,
    };
  },

  methods: {
    async uploadImages(data, format) {
      return await this.imagesFeedApi.uploadMrs(data, format);
    }
  }
}
</script>