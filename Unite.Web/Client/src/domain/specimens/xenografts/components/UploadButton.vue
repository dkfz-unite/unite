<template>
  <u-upload-dialog
    v-model="dialogSpecimens"
    subject="Xenografts"
    templatePathJson="/templates/xenografts.json"
    templatePathTsv="/templates/xenografts.tsv"
    modelDocs="https://github.com/dkfz-unite/unite-specimens-feed/blob/main/Docs/api-models-specimens.md"
    :uploadMethod="uploadSpecimens"
  />

  <u-upload-dialog
    v-model="dialogInterventions"
    subject="Interventions"
    templatePathJson="/templates/interventions.json"
    templatePathTsv="/templates/interventions.tsv"
    modelDocs="https://github.com/dkfz-unite/unite-specimens-feed/blob/main/Docs/api-models-base-drugs.md"
    :uploadMethod="uploadInterventions"
  />

  <u-upload-dialog
    v-model="dialogDrugs"
    subject="Drug Screenings"
    templatePathJson="/templates/drugs.json"
    templatePathTsv="/templates/drugs.tsv"
    modelDocs="https://github.com/dkfz-unite/unite-specimens-feed/blob/main/Docs/api-models-base-drugs.md"
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
        <q-item @click="onUploadSpecimens" clickable v-close-popup dense>
          <q-item-section>
            <div class="row q-gutter-x-sm">
              <div><q-icon name="svguse:/icons.svg#u-xenograft" size="sm" /></div>
              <div>Xenografts</div>
            </div>
          </q-item-section>
        </q-item>

        <q-item @click="onUploadInterventions" clickable v-close-popup dense>
          <q-item-section>
            <div class="row q-gutter-x-sm">
              <div><q-icon name="las la-syringe" size="sm" /></div>
              <div>Interventions</div>
            </div>
          </q-item-section>
        </q-item>

        <q-item @click="onUploadDrugs" clickable v-close-popup dense>
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
import UUploadDialog from "@/domain/_shared/components/upload/UploadDialog.vue";
import SpecimenTypes from "@/_models/domain/specimens/specimen-types";
import SpecimensApi from "@/domain/specimens/_shared/api/specimens/index";

export default {
  components: {
    UUploadDialog,
  },

  setup() {
    return {
      specimensApi: new SpecimensApi(SpecimenTypes.Xenograft),
    };
  },

  data() {
    return {
      dialogSpecimens: false,
      dialogInterventions: false,
      dialogDrugs: false,
    };
  },

  methods: {
    async onUploadSpecimens() {
      this.dialogSpecimens = true;
    },

    async uploadSpecimens(data, format) {
      if (format === "json") {
        return await this.specimensApi.uploadSpecimens(data);
      }
      return await this.specimensApi.uploadXenografts(data);
    },

    async onUploadInterventions() {
      this.dialogInterventions = true;
    },

    async uploadInterventions(data, format) {
      return await this.specimensApi.uploadInterventions(data, format);
    },

    async onUploadDrugs() {
      this.dialogDrugs = true;
    },

    async uploadDrugs(data, format) {
      return await this.specimensApi.uploadDrugs(data, format);
    },
  }
}
</script>