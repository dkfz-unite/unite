<template>
  <q-dialog
    v-model="dialog" 
    @keyup.esc="onClose"
    @keyup.enter="onSubmit"
    persistent>

    <q-card v-if="analysis" style="min-width: 350px;">
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
      <q-card-section>
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
      <q-card-section>
        <div class="col">
          <div class="row q-mb-sm">
            <span class="text-subtitle text-grey">Options</span>
          </div>
          <div class="row">
            <u-options :options="analysis.options" @request="onRequest"/>
          </div>
        </div>
      </q-card-section>
      <q-separator />

      <!-- Actions -->
      <q-card-actions align="right" class="text-primary">
        <q-btn label="Reset" @click="onReset" dense flat no-caps />
        <q-btn label="Cancel" @click="onClose" dense flat no-caps v-close-popup />
        <q-btn label="Start" @click="onSubmit" dense flat no-caps v-close-popup />
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

  emits: ["request", "submit"],

  data() {
    return {
      dialog: false,
      title: null,
      analysis: null
    }
  },

  methods: {
    show(analysis) {
      this.analysis = analysis;
      this.analysis.name = this.analysis.datasets.map(d => d.name).join(" vs ");
      this.title = AnalysisTitle[this.analysis.type];
      this.dialog = true;
    },

    onClose() {
      this.dialog = false;
      this.analysis.reset();
    },

    onReset() {
      this.analysis.resetOptions();
    },

    onRequest(option) {
      this.$emit("request", option);
    },

    async onSubmit() {
      console.log(this.analysis.toPayload());
      this.$emit("submit", this.analysis.toPayload());

      const id = await this.$store.dispatch("analysis/runAnalysis", this.analysis.toPayload());
      await this.$router.push({ name: "analysis", params: { id: id } });
    }
  }
}
</script>