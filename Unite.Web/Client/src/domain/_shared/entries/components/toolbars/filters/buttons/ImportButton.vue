<template>
  <q-dialog
    v-model="dialog"
    @keyup.esc="dialog = false"
    @hide="onClose"
    persistent>

    <q-card style="min-width: 300px">
      <q-card-section>
        <div class="text-h6">Import filters</div>
      </q-card-section>

      <q-card-section class="q-gutter-y-sm">
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

  <q-btn
    label="Import"
    title="Import filters"
    icon="las la-file-import"
    color="primary"
    dense flat no-caps>
    <q-menu>
      <q-list>
        <q-item @click="importFromFile" clickable v-close-popup dense>
          <q-item-section>
            <div class="row q-gutter-x-sm">
              <div><q-icon name="las la-file-import" size="sm" /></div>
              <div>File</div>
            </div>
          </q-item-section>
        </q-item>

        <q-item
          v-if="clipboardReadAvailable" @click="importFromClipboard" clickable v-close-popup dense>
          <q-item-section>
            <div class="row q-gutter-x-sm">
              <div><q-icon name="las la-copy" size="sm" /></div>
              <div>Clipboard</div>
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script>
import FiltersCriteria from '@/_shared/components/filters/filters-criteria';

export default {
  inject: ["domain"],

  data() {
    return {
      dialog: false,
      canApply: false,
      file: {
        value: null,
        rules: [
          (val) => this.fileIsNotEmpty(val),
          (val) => this.fileIsValid(val)
        ]
      }
    };
  },

  computed: {
    criteria: {
      get() { return this.$store.state[this.domain].filtersCriteria; },
      set(value) { this.$store.state[this.domain].filtersCriteria = value }
    },

    selected() {
      return this.$store.state[this.domain].selected;
    },

    clipboardReadAvailable() {
      return navigator.clipboard.readText != null;
    },

    theFile() {
      return this.file.value;
    }
  },

  watch: {
    async theFile(file) {
      let fileIsNotEmpty = await this.fileIsNotEmpty(file) === true;
      let fileIsValid = await this.fileIsValid(file) === true;
      this.canApply = fileIsNotEmpty && fileIsValid;
    }
  },

  methods: {
    async importFromFile() {
      this.dialog = true;
    },

    async importFromClipboard() {
      try {
        const json = await navigator.clipboard.readText();
        const dataset = JSON.parse(json);
        const validation = await this.filtersAreValid(dataset);

        if (validation === true) {
          this.criteria = new FiltersCriteria(dataset.criteria);
          this.notifySuccess("Filters imported", "Filters were imported from clipboard");
        } else {
          this.notifyError("Couldn't import filters", validation);
        }

      } catch {
        this.notifyError("Couldn't import filters");
      }
    },

    async onApply() {
      try {
        const json = await this.file.value.text();
        const dataset = JSON.parse(json);
        this.criteria = new FiltersCriteria(dataset.criteria);
        this.notifySuccess("Filters imported", "Filters were imported from file");
      } catch {
        this.notifyError("Couldn't import filters");
      }
    },

    async onClose() {
      this.file.value = null;
    },

    async fileIsNotEmpty(file) {
      return file != null || "Please, choose the file";
    },

    async fileIsValid(file) {
      try {
        const json = await file.text();
        const dataset = JSON.parse(json);
        return this.filtersAreValid(dataset);
      } catch {
        return "Couldn't read filters";
      }
    },

    async filtersAreValid(dataset) {
      if (dataset?.domain == null) {
        return `Filters domain should be specified`;
      }

      if (dataset?.domain != this.domain) {
        return `Filters should match current context '${this.domain}'`;
      }

      if (dataset?.criteria?.donor == null
        && dataset?.criteria?.mri == null
        && dataset?.criteria?.material == null
        && dataset?.criteria?.line == null
        && dataset?.criteria?.organoid == null
        && dataset?.criteria?.xenograft == null
        && dataset?.criteria?.gene == null
        && dataset?.criteria?.ssm == null
        && dataset?.criteria?.cnv == null
        && dataset?.criteria?.sv == null) {
        return `Filters criteria should be specified`;
      }
      
      return true;
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