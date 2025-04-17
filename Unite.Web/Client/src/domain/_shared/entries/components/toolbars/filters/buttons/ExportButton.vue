<template>
  <q-btn
    v-if="criteria?.numberOfFilters || selected?.length"
    label="Export"
    title="Export filters"
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

export default {
  inject: ["domain"],

  computed: {
    criteria() {
      return this.$store.state[this.domain].filtersCriteria;
    },

    selected() {
      return this.$store.state[this.domain].selected;
    },

    mergedCriteria() {
      const criteria = this.criteria.clone();

      if (this.selected?.length) {
        if (this.domain == "donors") {
          criteria.donorFiltersCriteria.referenceId = this.selected.map(item => item.referenceId);
        } else if (this.domain == "mrs") {
          criteria.mrFiltersCriteria.referenceId = this.selected.map(item => item.referenceId);
        } else if (this.domain == "materials") {
          criteria.materialFiltersCriteria.referenceId = this.selected.map(item => item.referenceId);
        } else if (this.domain == "lines") {
          criteria.lineFiltersCriteria.referenceId = this.selected.map(item => item.referenceId);
        } else if (this.domain == "organoids") {
          criteria.organoidFiltersCriteria.referenceId = this.selected.map(item => item.referenceId);
        } else if (this.domain == "xenografts") {
          criteria.xenograftFiltersCriteria.referenceId = this.selected.map(item => item.referenceId);
        } else if (this.domain == "genes") {
          criteria.geneFiltersCriteria.symbol = this.selected.map(item => item.symbol);
        } else if (this.domain == "sms") {
          criteria.mutationFiltersCriteria.id = this.selected.map(item => item.id);
        } else if (this.domain == "cnvs") {
          criteria.copyNumberVariantFiltersCriteria.id = this.selected.map(item => item.id);
        } else if (this.domain == "svs") {
          criteria.structuralVariantFiltersCriteria.id = this.selected.map(item => item.id);
        }
      }

      return criteria;
    },

    clipboardWriteAvailable() {
      return navigator.clipboard.writeText != null;
    }
  },

  methods: {
    async exportToFile() {
      try {
        const file = `${this.domain}-filters.json`;
        const options = { mimeType: "application/json" };
        const content = JSON.stringify(this.getContent());
        exportFile(file, content, options);
      } catch {
        this.notifyError("Couldn't export filters");
      }
    },

    async exportToClipboard() {
      try {
        const content = this.getContent();
        const json = JSON.stringify(content);
        await navigator.clipboard.writeText(json);
        this.notifySuccess("Filters exported", "Filters were exported to clipboard");
      } catch (error) {
        this.notifyError("Couldn't export filters");
      }
    },

    getContent() {
      return {
        domain: this.domain,
        criteria: this.mergedCriteria.copy()
      };
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