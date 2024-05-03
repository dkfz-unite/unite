<template>
  <u-upload-dialog
    v-model="dialogDonors"
    subject="Upload donors data"
    templatePathJson="/templates/donors/donors.json"
    templatePathTsv="/templates/donors/donors.tsv"
    modelDocs="https://github.com/dkfz-unite/unite-donors-feed/blob/main/Docs/api-models-donors.md"
    :uploadMethod="uploadDonors"
  />

  <u-upload-dialog
    v-model="dialogTreatments"
    subject="Upload treatments data"
    templatePathJson="/templates/donors/treatments.json"
    templatePathTsv="/templates/donors/treatments.tsv"
    modelDocs="https://github.com/dkfz-unite/unite-donors-feed/blob/main/Docs/api-models-treatments.md"
    :uploadMethod="uploadTreatments"
  />

  <q-btn
    label="Upload"
    title="Upload data"
    icon="las la-file-upload"
    color="primary"
    dense flat no-caps>
    <q-menu>
      <q-list>
        <q-item @click="dialogDonors = true" clickable v-close-popup dense>
          <q-item-section>
            <div class="row q-gutter-x-sm">
              <div><q-icon name="las la-user-circle" size="sm" /></div>
              <div>Donors</div>
            </div>
          </q-item-section>
        </q-item>

        <q-item @click="dialogTreatments = true" clickable v-close-popup dense>
          <q-item-section>
            <div class="row q-gutter-x-sm">
              <div><q-icon name="las la-pills" size="sm" /></div>
              <div>Treatments</div>
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script>
import DonorsApi from "../api";
import UUploadDialog from "@/domain/_shared/entries/components/upload/UploadDialog.vue";

export default {
  components: {
    UUploadDialog,
  },

  setup() {
    return {
      donorsApi: new DonorsApi(),
    };
  },

  data() {
    return {
      dialogDonors: false,
      dialogTreatments: false,
    };
  },

  methods: {
    async uploadDonors(data, format) {
      return await this.donorsApi.uploadDonors(data, format);
    },

    async uploadTreatments(data, format) {
      return await this.donorsApi.uploadTreatments(data, format);
    }
  }

}
</script>