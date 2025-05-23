<template>
  <q-dialog
    v-model="dialog"
    @keyup.esc="dialog = false"
    @hide="onClose"
    persistent>

    <q-card style="width: 450px">
      <q-card-section>
        <div class="text-h6">{{ subject }}</div>
      </q-card-section>

      <!-- Sumission process -->
      <template v-if="!submission">
        <q-card-section class="q-gutter-y-sm">
          <div class="row q-gutter-x-sm">
            <div class="text-body1">Type:</div>
            <q-radio v-model="fileType" val="json" label="JSON" dense />
            <q-radio v-model="fileType" val="tsv" label="TSV" dense />
          </div>

          <div class="row">
            <div v-if="fileType === 'json'" class="col">
              Download json file <a :href="templatePathJson" :download="`template-${getFileName(templatePathJson)}`" class="u-link">template</a>
            </div>
            <div v-if="fileType === 'tsv'" class="col">
              Download tsv file <a :href="templatePathTsv" :download="`template-${getFileName(templatePathTsv)}`" class="u-link">template</a>
            </div>
          </div>

          <div class="row">
            <div class="col">
              Fields description can be found <a :href="modelDocs" target="_blank" class="u-link">here</a>
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
      </template>

      <!-- Submission result -->
      <template v-else>
        <q-card-section>
          <div class="text-positive">Your data has been successfuly submitted.</div>
          <div>Sumbission number: <b>{{ this.submission }}</b>.</div>
          <div>You can use this number to <u-link :to="SubmissionsSettings.domain">track</u-link> you submission status.</div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn
            label="Close"
            dense flat no-caps
            v-close-popup/>
        </q-card-actions>
      </template>
    </q-card>
  </q-dialog>
</template>

<script>
import ULink from "@/_shared/components/base/Link.vue";
import SubmissionsSettings from "@/domain/submissions/settings";


const defaultFileType = "json";

export default {
  components: {
    ULink
  },

  setup() {
    return {
      SubmissionsSettings
    }
  },

  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    subject: {
      type: String,
      default: "Upload data"
    },
    templatePathJson: {
      type: String,
      required: true,
    },
    templatePathTsv: {
      type: String,
      required: true,
    },
    modelDocs: {
      type: String,
      required: true,
    },
    uploadMethod: {
      type: Function,
      required: true,
    }
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
      submission: null
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
    }
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
      this.submission = null;

      try {
        this.submission = await this.uploadMethod(this.file.value, this.fileType);
      } catch (error) {
        this.error = error;
        this.canApply = false;
        this.notifyError(`Couldn't upload ${this.subjectLower}`);
      }
    },

    async onClose() {
      this.file.value = null;
      this.fileType = defaultFileType;
      this.submission = null;
    },

    async fileIsNotEmpty(file) {
      return file != null || "Please, choose the file";
    },

    async fileIsValid(file) {
      if (this.fileType === "json") {
        return file?.name.endsWith(".json") || "Invalid file type";
      } else if (this.fileType === "tsv") {
        return file?.name.endsWith(".tsv") || "Invalid file type";
      }

      return false;
    },

    async validate() {
      this.error = null;
      this.canApply = false;
      if (this.file.value) {
        await this.$refs.uploadInput?.resetValidation();
        await this.$refs.uploadInput?.validate();
        this.canApply = this.$refs.uploadInput?.hasError == false;
      } else {
        await this.$refs.uploadInput?.resetValidation();
        this.canApply = false;
      }
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
    },

    getFileName(path) {
      return path.split("/").pop();
    }
  }
}
</script>
