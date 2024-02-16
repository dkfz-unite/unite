<template>
  <q-btn 
    label="Export"
    title="Export dataset criteria"
    icon="las la-file-export"
    color="primary"
    dense flat no-caps>
    <q-menu>
      <q-list>
        <q-item @click="exportToFile" clickable v-close-popup dense>
          <q-item-section>
            <div class="row q-gutter-x-sm">
              <div><q-icon name="las la-file-export" size="sm" /></div>
              <div>File</div>
            </div>
          </q-item-section>
        </q-item>
        <q-item v-if="clipboardWriteAvailable" @click="exportToClipboard" clickable v-close-popup dense>
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
import { exportFile } from "quasar";
import FiltersCriteria from "@/_shared/components/filters/filters-criteria";

export default {
  props: {
    domain: {
      type: Object,
      required: true
    },
    dataset: {
      type: Object,
      required: true
    }
  },

  computed: {
    clipboardWriteAvailable() {
      return navigator.clipboard.writeText != null;
    }
  },

  methods: {
    async exportToFile() {
      try {
        const name = `${this.domain.name}-filters.json`;
        const content = JSON.stringify(this.getContent());
        const options = { mimeType: "application/json" };
        exportFile(name, content, options);
      } catch (error) {
        console.log(error);
        this.notifyError("Couldn't export filters");
      }
    },

    async exportToClipboard() {
      try {
        const content = JSON.stringify(this.getContent());
        await navigator.clipboard.writeText(content);
        this.notifySuccess("Filters exported", "Filters were exported to clipboard");
      } catch(error) {
        this.notifyError("Couldn't export filters");
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

    getContent() {
      const domain = this.domain.name;
      const criteria = new FiltersCriteria(this.dataset.criteria);

      return {
        domain: domain,
        criteria: criteria.copy()
      };
    }
  }
}
</script>