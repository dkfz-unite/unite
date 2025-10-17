<template>
  <u-upload-dialog
    v-model="dialogSpecimens"
    subject="Upload cell lines data"
    templatePathJson="/templates/specimens/lines.json"
    templatePathTsv="/templates/specimens/lines.tsv"
    modelDocs="https://github.com/dkfz-unite/unite-specimens-feed/blob/main/Docs/api-models-line.md"
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
              <div><q-icon name="las la-microscope" size="sm" /></div>
              <div>Cell Lines</div>
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
      dialogInterventions: false,
      dialogDrugs: false,
    };
  },

  methods: {
    async uploadSpecimens(data, format) {
      return await this.specimensFeedApi.uploadLines(data, format);
    },

    async uploadInterventions(data, format) {
      return await this.specimensFeedApi.uploadInterventions(data, format);
    },

    async uploadDrugs(data, format) {
      return await this.specimensFeedApi.uploadDrugs(data, format);
    }
  }
}
</script>
