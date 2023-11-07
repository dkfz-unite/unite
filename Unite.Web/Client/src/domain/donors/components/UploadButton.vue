<template>
  <u-upload-dialog
    v-model="dialogDonors"
    subject="donors"
    templatePathJson="/templates/donors.json"
    templatePathTsv="/templates/donors.tsv"
    modelDocs="https://github.com/dkfz-unite/unite-donors-feed/blob/main/Docs/api-donors-models.md"
    :uploadMethod="uploadDonors"
  />

  <u-upload-dialog
    v-model="dialogTreatments"
    subject="treatments"
    templatePathJson="/templates/treatments.json"
    templatePathTsv="/templates/treatments.tsv"
    modelDocs="https://github.com/dkfz-unite/unite-donors-feed/blob/main/Docs/api-donors-models.md#treatment"
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
        <q-item @click="onUploadDonors" clickable v-close-popup dense>
          <q-item-section>
            <div class="row q-gutter-x-sm">
              <div><q-icon name="las la-user-circle" size="sm" /></div>
              <div>Donors</div>
            </div>
          </q-item-section>
        </q-item>

        <q-item @click="onUploadTreatments" clickable v-close-popup dense>
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
import DonorsApi from '../api/index';
import UUploadDialog from '@/domain/_shared/components/upload/UploadDialog.vue';

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
    async onUploadDonors() {
      this.dialogDonors = true;
    },

    async uploadDonors(data, format) {
      return await this.donorsApi.uploadDonors(data, format);
    },

    async onUploadTreatments() {
      this.dialogTreatments = true;
    },

    async uploadTreatments(data, format) {
      return await this.donorsApi.uploadTreatments(data, format);
    },
  }

}
</script>