<template>
  <q-dialog
    v-model="dialog"
    @keyup.esc="dialog = false"
    @hide="onClose"
    persistent>

    <q-card style="min-width: 300px">
      <q-card-section>
        <div class="text-h6">Upload drug screening data</div>
      </q-card-section>

      <q-card-section class="q-gutter-y-sm">
        <div class="row q-gutter-x-sm">
          <div class="text-body1">Format:</div>
          <q-radio v-model="format" val="default" label="Default" dense />
          <q-radio v-model="format" val="itrex" label="iTReX" dense />
        </div>

        <div class="row">
          <div v-if="format == 'default'" class="col">
            Download file <a href="/templates/specimen-drugs.json" :download="`${specimenId}-drugs-template.json`" class="u-link">template</a>
          </div>
          <div v-if="format == 'itrex'" class="col">
            Download iTReX file <a href="/templates/specimen-drugs.itrex.txt" :download="`${specimenId}-drugs-itrex-template.txt`" class="u-link">template</a>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <q-file
              label="File"
              v-model="file.value"
              :rules="file.rules"
              clearable
              square outlined dense>
              <template #prepend>
                <q-icon name="las la-paperclip" size="sm" />
              </template>
            </q-file>
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
          label="Upload" 
          :disable="!canSubmit"
          @click="onSubmit" 
          dense flat no-caps 
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-btn
    label="Upload"
    title="Upload cell line data"
    icon="las la-file-upload"
    color="primary"
    dense flat no-caps>
    <q-menu>
      <q-list>
        <q-item @click="onUpload" clickable v-close-popup dense>
          <q-item-section>
            <div class="row q-gutter-x-sm no-wrap">
              <div><q-icon name="las la-capsules" size="sm" /></div>
              <div class="text-no-wrap">Drug screening data</div>
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script>
import api from "../../../api/specimen";
import defaultFileHandler from "./file-handler.drugs.js";
import itrexFileHandler from "./file-handler.drugs.itrex.js";

export default {
  props: {
    donorId: {
      type: String,
      required: true
    },
    specimenId: {
      type: String,
      required: true 
    },
    specimenType: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      dialog: false,
      canSubmit: false,
      format: "default",
      file: {
        value: null,
        content: null,
        rules: [
          (val) => this.fileIsNotEmpty(val),
          (val) => this.fileIsValid(val)
        ]
      }
    };
  },

  computed: {
    theFile() { return this.file.value; }
  },

  watch: {
    async theFile(file) {
      const fileIsNotEmpty = await this.fileIsNotEmpty(file) === true;
      const fileIsValid = await this.fileIsValid(file) === true;
      this.canSubmit = fileIsNotEmpty && fileIsValid;
    }
  },

  methods: {
    async onUpload() {
      this.dialog = true;
    },

    async onSubmit() {
      try {
        const data = [{
          donorId: `${this.donorId}`,
          specimenId: this.specimenId,
          specimenType: this.specimenType,
          data: await this.parseFile(this.theFile)
        }];
        
        await api.uploadDrugs(data);

        this.notifySuccess("Data uploaded", "Drug screening data has been successfuly uploaded");
      } catch (error) {
        this.notifyError("Couldn't upload data");
      }
    },

    async onClose() {
      this.file.value = null;
    },


    async fileIsNotEmpty(file) {
      return file != null || "Please, choose the file";
    },

    async fileIsValid(file) {
      const data = await this.parseFile(file);
      return data != null || "Couldn't read the file";
    },

    async parseFile(file) {
      if (this.format === "itrex") {
        return await itrexFileHandler.parseFile(file);
      } else {
        return await defaultFileHandler.parseFile(file);
      }
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

    async notifyError(message, caption = undefined) {
      this.$q.notify({
        type: "negative",
        position: "bottom-right",
        timeout: 2000,
        message: message,
        caption: caption
      });
    }
  }
}
</script>