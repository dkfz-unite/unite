<template>
  <u-upload-dialog
    v-model="dialog"
    :subject="'Mri-Images'"
    :templatePathJsonc="'/templates/mri-images.jsonc'"
    :templatePathTsv="'/templates/mri-images.tsv'"
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
import ImagesApi from '../api/index';
import UUploadDialog from '@/domain/_shared/components/upload/UploadDialog.vue';

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
      return await this.imagesApi.uploadImages(data, format);
    },
  }
}
</script>