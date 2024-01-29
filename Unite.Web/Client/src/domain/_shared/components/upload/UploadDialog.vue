<template>
  <q-dialog
    v-model="dialog"
    @keyup.esc="dialog = false"
    @hide="onClose"
    persistent>

    <q-card style="width: 450px">
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
            Download json file <a :href="templatePathJson" :download="`${subjectLowerFillWhiteSpaces}-template.json`" class="u-link">template</a>
          </div>
          <div v-if="fileType === 'tsv'" class="col">
            Download tsv file <a :href="templatePathTsv" :download="`${subjectLowerFillWhiteSpaces}-template.tsv`" class="u-link">template</a>
          </div>
        </div>

        <div class="row">
          <div class="col">
            Data model <a :href="modelDocs" target="_blank" class="u-link">documentation</a>
          </div>
        </div>

        <q-file
          class="ellipsis"
          ref="uploadInput"
          label="File"
          v-model="file.value"
          :rules="file.rules"
          clearable
          square outlined dense>
          <template #prepend>
            <q-icon name="las la-paperclip" size="sm" />
          </template>
        </q-file>

        <div v-if="error?.status == 400" class="row">
          <div class="col">
            <div class="text-negative">There are validation errors:</div>
            <q-scroll-area style="height: 120px; border: 1px solid lightgrey">
              <div v-for="fieldError in Object.entries(error.data)" class="row q-pa-xs">
                <div class="col">
                  <div class="row text-weight-bold">{{ fieldError[0] }}</div>
                  <div class="row" v-for="fieldErrorMessage in fieldError[1]"> {{ fieldErrorMessage }}</div>
                </div>
              </div>
            </q-scroll-area>
          </div>
        </div>
        <div v-else-if="error" class="row">
          <div class="col">
            <span class="text-negative">{{ error.data }}</span>
          </div>
        </div>
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
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
const defaultFileType = "json";

export default {
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    subject: String,
    templatePathJson: String,
    templatePathTsv: String,
    modelDocs: String,
    uploadMethod: Function,
  },

  emits: ["update:modelValue"],

  data() {
    return {
      canApply: false,
      fileType: defaultFileType,
      file: {
        value: null,
        valid: false,
        rules: [
          (val) => this.fileIsNotEmpty(val),
          (val) => this.fileIsValid(val)
        ]
      },
      error: null,
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

    subjectLowerFillWhiteSpaces() {
      return this.subjectLower.replace(" ", "-");
    },
  },

  watch: {
    async theFile(file) {
      this.validate(file);
    },
    async fileType() {
      this.validate();
    },
  },

  methods: {
    async onApply() {
      this.error = null;

      try {
        await this.uploadMethod(this.file.value, this.fileType);
        this.notifySuccess(`${this.subjectTitle}  uploaded`, `${this.subjectTitle} were imported from file`);
        this.dialog = false;
      } catch (error) {
        this.error = error;
        this.canApply = false;
        this.notifyError(`Couldn't upload ${this.subjectLower}`);
      }
    },

    async onClose() {
      this.file.value = null;
      this.fileType = defaultFileType;
    },

    async fileIsNotEmpty(file) {
      return file != null || "Please, choose the file";
    },

    async fileIsValid(file) {
      if (this.fileType === "json") {
        return file?.name.endsWith(".jsonc") || file?.name.endsWith(".json") || "Invalid file type";
      } else if (this.fileType === "tsv") {
        return file?.name.endsWith(".tsv") || "Invalid file type";
      }

      return false;
    },

    async validate() {
      this.error = null;

      if (this.file.value)
        this.$refs.uploadInput?.validate();

      this.canApply = this.$refs.uploadInput?.hasError;
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
