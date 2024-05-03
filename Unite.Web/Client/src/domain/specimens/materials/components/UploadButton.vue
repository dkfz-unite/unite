<template>
  <u-upload-dialog
    v-model="dialogSpecimens"
    subject="Upload materials data"
    templatePathJson="/templates/specimens/materials.json"
    templatePathTsv="/templates/specimens/materials.tsv"
    modelDocs="https://github.com/dkfz-unite/unite-specimens-feed/blob/main/Docs/api-models-specimens.md"
    :uploadMethod="uploadSpecimens"
  />

  <q-btn
    label="Upload"
    title="Upload data"
    icon="las la-file-upload"
    color="primary"
    @click="dialogSpecimens = true"
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
      dialogSpecimens: false,
    };
  },

  methods: {
    async uploadSpecimens(data, format) {
      if (format === "json") {
        return await this.specimensApi.uploadSpecimens(data);
      } else if (format === "tsv") {
        return await this.specimensApi.uploadMaterials(data);
      }
    }
  }
}
</script>
