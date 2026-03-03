<template>
  <u-upload-dialog
    v-model="dialogBulk"
    subject="Upload bulk transcriptomics data"
    templatePathJson="/templates/omics/bulk-gexps.json"
    templatePathTsv="/templates/omics/bulk-gexps.tsv"
    modelDocs="https://github.com/dkfz-unite/unite-omics-feed/blob/main/Docs/api-models-rna-exp.md"
    :uploadMethod="uploadBulk"
  />

  <q-btn
    label="Upload"
    title="Upload data"
    icon="las la-file-upload"
    color="primary"
    dense flat no-caps>
    <q-menu>
      <q-list>
        <q-item @click="dialogBulk = true" clickable v-close-popup dense>
          <q-item-section>
            <div class="row q-gutter-x-sm">
              <div><q-icon :name="settings.icon" size="sm" /></div>
              <div>Transcriptomics (Bulk)</div>
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script>
import settings from "../settings";
import GenesApi from "../api";
import UUploadDialog from "@/domain/_shared/entries/components/upload/UploadDialog.vue";

export default {
  components: {
    UUploadDialog,
  },

  setup() {
    return {
      settings: settings,
      api: new GenesApi(),
    };
  },

  data() {
    return {
      dialogBulk: false
    };
  },

  methods: {
    async uploadBulk(data, format) {
      return await this.api.uploadBulk(data, format);
    }
  }

}
</script>