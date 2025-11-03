<template>
  <u-upload-dialog
    v-model="dialogSpecimens"
    subject="Upload materials data"
    templatePathJson="/templates/specimens/materials.json"
    templatePathTsv="/templates/specimens/materials.tsv"
    modelDocs="https://github.com/dkfz-unite/unite-specimens-feed/blob/main/Docs/api-models-material.md"
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
import SpecimensFeedApi from "@/domain/submissions/api/api-feed-specimens";

export default {
  components: {
    UUploadDialog,
  },

  setup() {
    return {
      specimensFeedApi: new SpecimensFeedApi(),
    };
  },

  data() {
    return {
      dialogSpecimens: false,
    };
  },

  methods: {
    async uploadSpecimens(data, format) {
      return await this.specimensFeedApi.uploadMaterials(data, format);
    }
  }
}
</script>
