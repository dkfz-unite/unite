<template>
  <q-dialog
    v-model="dialog"
    @keyup.esc="onClose"
    @keyup.enter="onSubmit"
    persistent>

    <q-card v-if="analysis" style="min-width: 400px; max-width: 400px;">
      <!-- Title -->
      <q-card-section>
        <div class="text-h6">{{ title }}</div>
      </q-card-section>
      <q-separator />

      <!-- General -->
      <q-card-section>
        <div class="col">
          <div class="row q-mb-sm">
            <span class="text-subtitle text-grey">General</span>
          </div>
          <div class="row">
            <u-general :analysis="analysis" />
          </div>
        </div>
      </q-card-section>
      <q-separator />

      <!-- Datasets -->
      <q-card-section v-if="analysis.datasets">
        <div class="col">
          <div class="row q-mb-sm">
            <span class="text-subtitle text-grey">Datasets</span>
          </div>
          <div class="row">
            <u-datasets :datasets="analysis.datasets" />
          </div>
        </div>
      </q-card-section>
      <q-separator />

      <!-- Options -->
      <q-card-section v-if="analysis.options">
        <div class="col">
          <div class="row q-mb-sm">
            <span class="text-subtitle text-grey">Options</span>
          </div>
          <div class="row">
            <u-options :options="analysis.options" :height="optionsHeight" @request="onRequest" @update="onUpdate" />
          </div>
        </div>
      </q-card-section>
      <q-separator v-if="analysis.options" />

      <!-- Actions -->
      <!-- Creation mode -->
      <q-card-actions v-if="!edit" align="right" class="text-primary">
        <q-btn label="Reset" @click="onReset" dense flat no-caps v-if="analysis.options != null" />
        <q-btn label="Cancel" @click="onClose" dense flat no-caps v-close-popup />
        <q-btn label="Start" @click="onSubmit" :disable="!canSubmit()" dense flat no-caps v-close-popup />
      </q-card-actions>
      <!-- Restart mode -->
      <q-card-actions v-else align="right" class="text-primary">
        <q-btn label="Cancel" @click="onClose" dense flat no-caps v-close-popup />
        <q-btn label="Start new" @click="onSubmit" :disable="!canSubmit()" dense flat no-caps v-close-popup />
        <q-btn label="Restart" @click="onRestart" :disable="!canSubmit()" dense flat no-caps v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import UGeneral from './General.vue';
import UDatasets from './Datasets.vue';
import UOptions from './Options.vue';
import Analysis from '../analysis';
import AnalysisType from '../analysis-type';
import { AnalysisTitle } from '../analysis-type';

export default {
  components: {
    UGeneral,
    UDatasets,
    UOptions
  },

  props: {
    optionsHeight: {
      type: [Number, String],
      default: 200,
    }
  },

  emits: ["request", "update", "submit", "restart"],

  data() {
    return {
      dialog: false,
      edit: false,
      title: null,
      analysis: null
    }
  },

  methods: {
    show(analysis, edit = false) {
      this.edit = edit;
      this.title = AnalysisTitle[analysis.type];
      this.analysis = analysis;
      this.analysis.name = this.analysis.datasets?.map(d => d.name).join(" vs ");
      this.dialog = true;
    },

    onClose() {
      this.dialog = false;
      this.edit = true;
      this.analysis.reset();
    },

    onReset() {
      this.analysis.resetOptions();
    },

    onRequest(params) {
      this.$emit("request", params);
    },

    onUpdate(option) {
      this.$emit("update", option);
    },

    canSubmit() {
      return this.analysis?.canSubmit() == true;
    },

    async onSubmit() {
      this.$emit("submit", this.analysis.toPayload());

      const payload = this.analysis.toPayload();
      payload.id = null;
      if (payload.data != null)
        payload.data.id = null;

      const id = await this.$store.dispatch("analysis/runAnalysis", payload);
      await this.$router.push({ name: "analysis", params: { id: id } });

      this.onClose();
    },

    async onRestart() {
      this.analysis.status = null;

      const payload = this.analysis.toPayload();
      await this.$store.dispatch("analysis/runAnalysis", this.analysis.toPayload());
      await this.$router.push({ name: "analysis", params: { id: this.analysis.id } });

      this.onClose();
    }
  }
}
</script>