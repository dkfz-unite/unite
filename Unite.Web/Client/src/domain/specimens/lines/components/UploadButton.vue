<template>
  <u-upload-dialog
    v-model="dialogCells"
    subject="Cell Lines"
    templatePathJson="/templates/specimens/lines.json"
    templatePathTsv="/templates/specimens/lines.tsv"
    modelDocs="https://github.com/dkfz-unite/unite-specimens-feed/blob/main/Docs/api-models-specimens.md"
    :uploadMethod="uploadCells"
  />

  <u-upload-dialog
    v-model="dialogCellDrugs"
    subject="Drug Screenings"
    templatePathJson="/templates/specimens/drugs.json"
    templatePathTsv="/templates/specimens/drugs.tsv"
    modelDocs="https://github.com/dkfz-unite/unite-specimens-feed/blob/main/Docs/api-models-drugs.md"
    :uploadMethod="uploadDrugs"
  />

  <q-btn
    label="Upload"
    title="Upload data"
    icon="las la-file-upload"
    color="primary"
    dense flat no-caps>
    <q-menu>
      <q-list>
        <q-item @click="onUploadCells" clickable v-close-popup dense>
          <q-item-section>
            <div class="row q-gutter-x-sm">
              <div><q-icon name="las la-microscope" size="sm" /></div>
              <div>Cell Lines</div>
            </div>
          </q-item-section>
        </q-item>

        <q-item @click="onUploadCellDrugs" clickable v-close-popup dense>
          <q-item-section>
            <div class="row q-gutter-x-sm">
              <div><q-icon name="las la-capsules" size="sm" /></div>
              <div>Drug Screenings</div>
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script>
import UUploadDialog from "@/domain/_shared/entries/components/upload/UploadDialog.vue";
import SpecimensApi from "../../_shared/specimens/api";

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
      dialogCells: false,
      dialogCellDrugs: false,
    };
  },

  methods: {
    async onUploadCells() {
      this.dialogCells = true;
    },

    async uploadCells(data, format) {
      if (format === "json") {
        return await this.specimensApi.uploadSpecimens(data);
      }
      return await this.specimensApi.uploadCells(data);
    },

    async onUploadCellDrugs() {
      this.dialogCellDrugs = true;
    },

    async uploadDrugs(data, format) {
      return await this.specimensApi.uploadDrugs(data, format);
    },
  }

}
</script>