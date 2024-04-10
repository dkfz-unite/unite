<template>
  <u-upload-dialog
    v-model="dialog"
    subject="Materials"
    templatePathJson="/templates/specimens/materials.json"
    templatePathTsv="/templates/specimens/materials.tsv"
    modelDocs="https://github.com/dkfz-unite/unite-specimens-feed/blob/main/Docs/api-models-specimens.md"
    :uploadMethod="uploadMaterials"
  />

  <q-btn
    label="Upload"
    title="Upload data"
    icon="las la-file-upload"
    color="primary"
    @click="onUploadMaterials"
    v-close-popup
    dense flat no-caps>
  </q-btn>
</template>

<script>
import UUploadDialog from "@/domain/_shared/entries/components/upload/UploadDialog.vue";
import SpecimensApi from "@/domain/specimens/_shared/specimens/api";

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
    async onUploadMaterials() {
      this.dialog = true;
    },

    async uploadMaterials(data, format) {
      if (format === "json") {
        return await this.specimensApi.uploadSpecimens(data);
      }
      return await this.specimensApi.uploadMaterials(data);
    },
  }
}
</script>