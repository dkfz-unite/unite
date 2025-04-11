<template>
  <u-upload-dialog
    v-model="dialogVariants"
    subject="Upload SMs data"
    templatePathJson="/templates/genome/sms.json"
    templatePathTsv="/templates/genome/sms.tsv"
    modelDocs="https://github.com/dkfz-unite/unite-genome-feed/blob/main/Docs/api-models-dna-sm.md"
    :uploadMethod="uploadVariants"
  />

  <q-btn
    label="Upload"
    title="Upload data"
    icon="las la-file-upload"
    color="primary"
    @click="dialogVariants = true"
    v-close-popup
    dense flat no-caps>
  </q-btn>
</template>

<script>
import settings from "../settings";
import VariantsApi from "../../_shared/variants/api";
import VariantType from "../../_shared/variants/models/enums/variant-type";
import UUploadDialog from "@/domain/_shared/entries/components/upload/UploadDialog.vue";

export default {
  components: {
    UUploadDialog,
  },

  setup() {
    return {
      settings: settings,
      api: new VariantsApi(VariantType.SM),
    };
  },

  data() {
    return {
      dialogVariants: false
    };
  },

  methods: {
    async uploadVariants(data, format) {
      return await this.api.uploadVariants(data, format);
    }
  }
}
</script>
