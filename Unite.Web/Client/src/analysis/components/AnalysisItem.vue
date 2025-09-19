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
        <div class="row text-h6">{{ analysis.name || analysis.id }}</div>
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
            <div v-for="dataset in analysis.data.datasets" class="row items-center q-gutter-xs">
              <q-icon :name="Settings[dataset.domain]?.icon" size="sm"/>
              <u-link :to="{ name: 'datasets', params: { domain: dataset.domain, id: dataset.id } }">{{ dataset.name }}</u-link>
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
      <div class="col q-pa-sm" :style="{ height: $q.screen.height * 0.65 + 'px' }">
        <u-surv-results v-if="analysis.type == 'surv'" :id="analysis.id" :title="title" :data="analysis.results" />
        <u-dm-results v-else-if="analysis.type == 'dm'" :id="analysis.id" :title="title" :data="analysis.results" />
        <u-pcam-results v-else-if="analysis.type == 'pcam'" :id="analysis.id" :title="title" :data="analysis.results" :meta="analysis.meta"/>
        <u-de-results v-else-if="analysis.type == 'de'" :id="analysis.id" :title="title" :data="analysis.results" />
        <u-scell-results  v-else-if="analysis.type == 'scell'" :id="analysis.id" :title="title" :data="analysis.results" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import USurvResults from "./surv/Results.vue";
import UDmResults from "./dm/Results.vue";
import UPcamResults from "./pcam/Results.vue";
import UDeResults from "./de/Results.vue";
import UScellResults from "./scell/Results.vue";
import mixin from "./analysis-mixin";

import { exportFile } from "quasar";
import Settings from "@/_settings/settings";

export default {
  components: {
    USurvResults,
    UDmResults,
    UPcamResults,
    UDeResults,
    UScellResults
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
        const datasets = this.analysis.data.datasets
          .sort((a, b) => a.order - b.order)
          .map(c => c.name);
        return datasets.length > 1 ? `${datasets[0]} vs ${datasets[1]}` : datasets[0];
      }
    }
  },

  methods: {
    async onLoad() {      
      if (this.analysis.type === "pcam") {
        if (!this.analysis.meta) {
          const payload = { id: this.analysis.id, file = "metadata" };
          const content = await this.$store.dispatch("analysis/loadAnalysisMeta", payload);
          this.analysis.meta = content;
        }
      }

      if (!this.analysis.results) {
        const payload = { id: this.analysis.id };
        const content = await this.$store.dispatch("analysis/loadAnalysisMeta", payload);
        this.analysis.results = content;
      }
    },

    async onDownload() {
      const payload = { id: this.analysis.id };
      const format = this.getFileFormat(this.analysis.type);
      const content = await this.$store.dispatch("analysis/loadAnalysisData", payload);
      exportFile(`${this.analysis.id}.${format.ext}`, content, format.type);
    },

    async onDelete() {
      const payload = { id: this.analysis.id };
      this.$store.dispatch("analysis/deleteAnalysis", payload);
      this.$emit("delete");
    },

    getFileFormat(analysisType) {
      switch (analysisType) {
        case "surv":
          return { type: "application/octet-stream", ext: "zip" };
        case "dm":
          return { type: "application/octet-stream", ext: "zip" };
        case "pcam":
          return { type: "application/octet-stream", ext: "zip" };
        case "de":
          return { type: "application/octet-stream", ext: "tsv" };
        case "scell":
          return { type: "application/octet-stream", ext: "zip" };
        default:
          throw new Error(`Unknown analysis type: ${analysisType}`);
      }
    }
  }
}
</script>
