<template>
  <q-dialog
    v-model="dialogDonors"
    @keyup.esc="dialogDonors = false"
    @hide="onClose"
    persistent>

    <q-card style="min-width: 300px">
      <q-card-section>
        <div class="text-h6">Upload donors data</div>
      </q-card-section>

      <q-card-section class="q-gutter-y-sm">
        <div class="row q-gutter-x-sm">
          <div class="text-body1">File type:</div>
          <q-radio v-model="fileType" val="json" label="JSON" dense />
          <q-radio v-model="fileType" val="tsv" label="TSV" dense />
        </div>

        <div class="row">
          <div v-if="fileType === 'json'" class="col">
            Download json file <a href="/templates/donors.json" download="donors-template.json" class="u-link">template</a>
          </div>
          <div v-if="fileType === 'tsv'" class="col">
            Download tsv file <a href="/templates/donors.tsv" download="donors-template.tsv" class="u-link">template</a>
          </div>
        </div>

        <q-file
          label="File"
          v-model="file.value"
          :rules="file.rules"
          @rejected="notifyError(errorMessage)"
          clearable
          square outlined dense>
          <template #prepend>
            <q-icon name="las la-paperclip" size="sm" />
          </template>
        </q-file>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn
          label="Cancel"
          dense flat no-caps
          v-close-popup
        />

        <q-btn 
          label="Apply"
          :disable="!canApply"
          @click="onApplyDonors"
          dense flat no-caps
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog
    v-model="dialogTreatments"
    @keyup.esc="dialogTreatments = false"
    @hide="onClose"
    persistent>

    <q-card style="min-width: 300px">
      <q-card-section>
        <div class="text-h6">Upload treatments data</div>
      </q-card-section>
      
      <q-card-section class="q-gutter-y-sm">
        <div class="row q-gutter-x-sm">
          <div class="text-body1">File type:</div>
          <q-radio v-model="fileType" val="json" label="JSON" dense />
          <q-radio v-model="fileType" val="tsv" label="TSV" dense />
        </div>

        <div class="row">
          <div v-if="fileType === 'json'" class="col">
            Download json file <a href="/templates/treatments.json" download="treatments-template.json" class="u-link">template</a>
          </div>
          <div v-if="fileType === 'tsv'" class="col">
            Download tsv file <a href="/templates/treatments.tsv" download="treatments-template.tsv" class="u-link">template</a>
          </div>
        </div>

        <q-file
          label="File"
          v-model="file.value"
          :rules="file.rules"
          @rejected="notifyError(errorMessage)"
          clearable
          square outlined dense>
          <template #prepend>
            <q-icon name="las la-paperclip" size="sm" />
          </template>
        </q-file>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn
          label="Cancel" 
          dense flat no-caps 
          v-close-popup 
        />

        <q-btn 
          label="Apply" 
          :disable="!canApply"
          @click="onApplyTreatments" 
          dense flat no-caps 
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-btn
    label="Upload"
    title="Upload data"
    icon="las la-file-upload"
    color="primary"
    dense flat no-caps>
    <q-menu>
      <q-list>
        <q-item @click="uploadDonors" clickable v-close-popup dense>
          <q-item-section>
            <div class="row q-gutter-x-sm">
              <div><q-icon name="las la-user-circle" size="sm" /></div>
              <div>Donors</div>
            </div>
          </q-item-section>
        </q-item>

        <q-item @click="uploadTreatments" clickable v-close-popup dense>
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
// import FiltersCriteria from '@/_shared/components/filters/filters-criteria';
import DonorsApi from '../api/index';
const defaultErrorMessage = 'Something went terribly wrong, sorry!';
const defaultFileType = 'json';

const api = new DonorsApi();

export default {
  // inject: ["domain"],

  data() {
    return {
      dialogDonors: false,
      dialogTreatments: false,
      canApply: false,
      errorMessage: defaultErrorMessage,
      fileType: defaultFileType,
      file: {
        value: null,
        rules: [
          (val) => this.fileIsNotEmpty(val),
          // (val) => this.fileIsValid(val)
        ]
      },
    };
  },

  computed: {
    // criteria: {
    //   get() { return this.$store.state[this.domain].filtersCriteria; },
    //   set(value) { this.$store.state[this.domain].filtersCriteria = value }
    // },

    theFile() {
      return this.file.value;
    }
  },

  watch: {
    async theFile(file) {
      let fileIsNotEmpty = await this.fileIsNotEmpty(file) === true;
      // let fileIsValid = await this.fileIsValid(file) === true;
      this.canApply = fileIsNotEmpty /* && fileIsValid */;
    }
  },

  methods: {
    async uploadDonors() {
      this.dialogDonors = true;
    },

    async uploadTreatments() {
      this.dialogTreatments = true;
    },

    // async copyFrom Clipboard() {
    //   try {
    //     const json = await navigator.clipboard.readText();
    //     const content = JSON.parse(json);
    //     const validation = await this.contentValid(content);

    //     if (validation === true) {
    //       this.criteria = new FiltersCriteria(content.criteria);
    //       this.notifySuccess("Filters imported", "Filters were imported from clipboard");
    //     } else {
    //       this.notifyError("Couldn't import filters", validation);
    //     }

    //   } catch {
    //     this.notifyError("Couldn't import filters");
    //   }
    // },

    async onApplyDonors() {
      try {
        const tsv = await this.file.value.text();
        console.log('onApplyDonors -> tsv:', tsv);
        // const content = JSON.parse(json);
        // this.criteria = new FiltersCriteria(content.criteria);
        console.log('onApplyDonors -> api.uploadDonors:', api.uploadDonors);
        console.log('onApplyDonors -> this.fileType:', this.fileType);
        const response = await api.uploadDonors(this.file.value, this.fileType);
        console.log('onApplyDonors -> response:', response);
        this.notifySuccess("Donors uploaded", "Donors were imported from file");
      } catch (error) {
        // error contains Code and messages
        console.log('onApplyDonors', error);
        this.notifyError("Couldn't upload donors");
      }
    },

    async onApplyTreatments() {
      try {
        const tsv = await this.file.value.text();
        console.log('onApplyTreatments -> tsv:', tsv);
        // const content = JSON.parse(json);
        // this.criteria = new FiltersCriteria(content.criteria);
        console.log('onApplyTreatments -> api.uploadDonors:', api.uploadDonors);
        console.log('onApplyTreatments -> this.fileType:', this.fileType);
        const response = await api.uploadTreatments(this.file.value, this.fileType);
        console.log('onApplyTreatments -> response:', response);
        this.notifySuccess("Treatments uploaded", "Treatments were imported from file");
      } catch (error) {
        // error contains Code and messages
        console.log('onApplyTreatments', error);
        this.notifyError("Couldn't upload treatments");
      }
    },

    async onClose() {
      this.file.value = null;
      this.fileType = defaultFileType;
      this.errorMessage = defaultErrorMessage;
    },

    async fileIsNotEmpty(file) {
      return file != null || "Please, choose the file";
    },

    // async fileIsValid(file) {
    //   try {
    //     const content = await file.text();
    //     // const content = JSON.parse(json);
    //     return this.contentValid(content);
    //   } catch {
    //     return "Upload content not valid.";
    //   }
    // },

    // async contentValid(content) {
    //   // validation call to be implemented
      
    //   return true;
    // },

    // fileValidation() {
    //   if (this.dialogDonors) {
    //     console.log('fileValidation/donors ->:', this.fileType);
    //     if (this.fileType === 'json') {
    //       return true;
    //     }
    //     if (this.fileType === 'tsv') {
    //       return true;
    //     }
    //   }
      
    //   if  (this.dialogTreatments) {
    //     console.log('fileValidation/treatments ->:', this.fileType);
    //     if (this.fileType === 'json') {
    //       return true;
    //     }
    //     if (this.fileType === 'tsv') {
    //       return true;
    //     }
    //   }

    //   return false;
    // },

    async notifyError(message, caption = undefined) {
      this.$q.notify({
        type: "negative",
        position: "bottom-right",
        timeout: 2000,
        message: message,
        caption: caption
      });
    },

    async notifySuccess(message, caption = undefined) {
      this.$q.notify({
        type: "positive",
        position: "bottom-right",
        timeout: 1000,
        message: message,
        caption: caption
      });
    }
  }
}
</script>