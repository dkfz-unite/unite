<template>
  <u-upload-dialog
    v-model="dialogSpecimens"
    subject="Upload xenografts data"
    templatePathJson="/templates/specimens/xenografts.json"
    templatePathTsv="/templates/specimens/xenografts.tsv"
    modelDocs="https://github.com/dkfz-unite/unite-specimens-feed/blob/main/Docs/api-models-xenograft.md"
    :uploadMethod="uploadSpecimens"
  />

  <u-upload-dialog
    v-model="dialogInterventions"
    subject="Upload interventions data"
    templatePathJson="/templates/specimens/interventions.json"
    templatePathTsv="/templates/specimens/interventions.tsv"
    modelDocs="https://github.com/dkfz-unite/unite-specimens-feed/blob/main/Docs/api-models-interventions.md"
    :uploadMethod="uploadInterventions"
  />

  <u-upload-dialog
    v-model="dialogDrugs"
    subject="Upload drug screenings data"
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
        <q-item @click="dialogSpecimens = true" clickable v-close-popup dense>
          <q-item-section>
            <div class="row q-gutter-x-sm">
              <div><q-icon name="svguse:/icons.svg#u-xenograft" size="sm" /></div>
              <div>Xenografts</div>
            </div>
          </q-item-section>
        </q-item>

        <q-item @click="dialogInterventions = true" clickable v-close-popup dense>
          <q-item-section>
            <div class="row q-gutter-x-sm">
              <div><q-icon name="las la-syringe" size="sm" /></div>
              <div>Interventions</div>
            </div>
          </q-item-section>
        </q-item>

        <q-item @click="dialogDrugs = true" clickable v-close-popup dense>
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
import SpecimenType from "../../_shared/specimens/models/enums/specimen-type";
import SpecimensApi from "../../_shared/specimens/api";

export default {
  components: {
    UUploadDialog,
  },

  setup() {
    return {
      specimensApi: new SpecimensApi(SpecimenType.Xenograft),
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
    async uploadSpecimens(data, format) {
      return await this.specimensApi.uploadXenografts(data, format);
    },

    async uploadInterventions(data, format) {
      return await this.specimensApi.uploadInterventions(data, format);
    },

    async uploadDrugs(data, format) {
      return await this.specimensApi.uploadDrugs(data, format);
    }
  }
}
</script>
