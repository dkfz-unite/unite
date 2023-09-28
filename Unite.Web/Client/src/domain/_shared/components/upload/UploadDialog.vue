<template>
  <q-dialog
    v-model="dialog"
    @keyup.esc="dialog = false"
    @hide="onClose"
    persistent>

    <q-card style="min-width: 300px">
      <q-card-section>
        <div class="text-h6">Upload {{ subjectLower }} data</div>
      </q-card-section>

      <q-card-section class="q-gutter-y-sm">
        <div class="row q-gutter-x-sm">
          <div class="text-body1">File type:</div>
          <q-radio v-model="fileType" val="json" label="JSON" dense />
          <q-radio v-model="fileType" val="tsv" label="TSV" dense />
        </div>

        <div class="row">
          <div v-if="fileType === 'json'" class="col">
            Download json file <a :href="templatePathJson" :download="`${subjectLower}-template.json`" class="u-link">template</a>
          </div>
          <div v-if="fileType === 'tsv'" class="col">
            Download tsv file <a :href="templatePathTsv" :download="`${subjectLower}-template.tsv`" class="u-link">template</a>
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
          @click="onApply"
          dense flat no-caps
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
const defaultErrorMessage = 'Something went terribly wrong, sorry!';
const defaultFileType = 'json';

export default {
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    subject: String,
    templatePathJson: String,
    templatePathTsv: String,
    uploadMethod: Function,
  },

  emits: ["update:modelValue"],

  data() {
    return {
      canApply: false,
      errorMessage: defaultErrorMessage,
      fileType: defaultFileType,
      file: {
        value: null,
        rules: [
          (val) => this.fileIsNotEmpty(val),
        ]
      },
    };
  },

  computed: {
    theFile() {
      return this.file.value;
    },

    dialog: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },

    subjectTitle() {
      return this.subject.charAt(0).toUpperCase() + this.subject.substr(1).toLowerCase();
    },

    subjectLower() {
      return this.subject.toLowerCase();
    },
  },

  watch: {
    async theFile(file) {
      let fileIsNotEmpty = await this.fileIsNotEmpty(file) === true;
      this.canApply = fileIsNotEmpty;
    }
  },

  methods: {
    async uploadDonors() {
      this.dialogDonors = true;
    },

    async onApply() {
      try {
        await this.uploadMethod(this.file.value, this.fileType);
        this.notifySuccess(`${this.subjectTitle}  uploaded`, `${this.subjectTitle} were imported from file`);
      } catch (error) {
        // TODO: show errors somewhere
        // error contains Code and messages
        console.log('onApply', error);
        this.notifyError(`Couldn't upload ${this.subjectLower}`);
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