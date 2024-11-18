<template>
  <q-card flat bordered class="q-pa-none">
    <!-- Controls -->
    <q-card-section class="q-pa-none q-ma-none">
      <div class="row items-center q-gutter-x-sm q-ml-xs">
        <q-btn :disable="!isReady" @click="onDownload" icon="las la-file-download" color="secondary" no-caps dense flat>Download</q-btn>
        <q-btn :disable="!isEnded" @click="onDelete" icon="las la-trash" color="red" no-caps flat dense>Delete</q-btn>
      </div>
    </q-card-section>
    <q-separator />

    <!-- Analysis -->
    <q-card-section>
      <div class="col q-gutter-y-xs">
        <!-- Name -->
        <div class="row text-h6">{{ analysis.name || analysis.key }}</div>
        <!-- Description -->
        <div class="row" v-if="analysis.description"> {{ analysis.description }}</div>
        <!-- Type, Date and Status -->
        <div class="row q-gutter-x-lg">
          <div class="text-weight-regular">{{ getAnalysisType(analysis.type) }}</div>
          <div class="text-weight-regular">{{ $helpers.content.toDateTimeString(analysis.date) }}</div>
          <div :class="`text-${getProgressColor(analysis.status)} text-weight-medium`">{{ analysis.status || "Created" }}</div>
        </div>
        <!-- Datasets -->
        <div class="row">
          <div class="col">
            <div v-for="dataset in analysis.datasets" class="row items-center q-gutter-xs">
              <q-icon :name="Settings[dataset.domain]?.icon" size="sm"/>
              <u-link :to="{ name: 'datasets', params: { domain: dataset.domain, key: dataset.key } }">{{ dataset.name }}</u-link>
            </div>
          </div>
        </div>
        <!-- Results Button -->
        <div class="row items-center q-gutter-x-lg">
          <div v-if="isReady && !analysis.results">
            <q-btn @click="onLoad" color="blue-5" no-caps dense flat>Show results</q-btn>
          </div>
        </div>
      </div>
    </q-card-section>
    <q-separator />

    <!-- Results -->
    <q-card-section v-if="isReady && !!analysis.results" class="q-pa-none q-ma-none">
      <div class="col q-pa-sm">
        <u-deseq2-results v-if="analysis.type == 'deseq2'" :title="title" :data="analysis.results" />
        <u-scell-results v-else-if="analysis.type == 'scell'" :title="title" :data="analysis.results" />
        <u-kmeier-results v-else-if="analysis.type == 'kmeier'" :title="title" :data="analysis.results" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import UDeseq2Results from "./deseq2/Results.vue";
import UScellResults from "./scell/Results.vue";
import UKmeierResults from "./kmeier/Results.vue";
import mixin from "./analysis-mixin";

import { exportFile } from "quasar";
import Settings from "@/_settings/settings";

export default {
  components: {
    UDeseq2Results,
    UScellResults,
    UKmeierResults
  },

  mixins: [mixin],

  props: {
    analysis: {
      type: Object,
      required: true
    }
  },

  setup() {
    return {
      Settings
    }
  },

  emits: ["delete"],

  computed: {
    isReady() {
      return this.analysis.status == "Processed";
    },

    isFailed() {
      return this.analysis.status == "Failed";
    },

    isEnded() {
      return this.isReady || this.isFailed;
    },

    title() {
      if (!this.analysis) return;

      if (!!this.analysis.name) {
        return this.analysis.name;
      } else {
        const datasets = this.analysis.datasets
          .sort((a, b) => a.order - b.order)
          .map(c => c.name);
        return datasets.length > 1 ? `${datasets[0]} vs ${datasets[1]}` : datasets[0];
      }
    }
  },

  methods: {
    async onDelete() {
      const payload = { key: this.analysis.key };
      this.$store.dispatch("analysis/deleteAnalysis", payload);
      this.$emit("delete");
    },

    async onLoad() {
      const payload = { key: this.analysis.key };
      await this.$store.dispatch("analysis/loadAnalysisMeta", payload);
    },

    async onDownload() {
      const payload = { key: this.analysis.key };
      const format = this.getFileFormat(this.analysis.type);
      const content = await this.$store.dispatch("analysis/loadAnalysisData", payload);
      exportFile(`${this.analysis.key}.${format.ext}`, content, format.type);
    },

    getFileFormat(analysisType) {
      switch (analysisType) {
        case "deseq2":
          return { type: "application/octet-stream", ext: "tsv" };
        case "scell":
          return { type: "application/octet-stream", ext: "h5ad" };
        case "kmeier":
          return { type: "application/octet-stream", ext: "zip" };
        default:
          throw new Error(`Unknown analysis type: ${analysisType}`);
      }
    }
  }
}
</script>