<template>
  <slot name="dialog" />

  <q-card flat bordered class="q-pa-none">
    <!-- Controls -->
    <q-card-section class="q-pa-none q-ma-none">
      <div class="row items-center q-gutter-x-sm q-ml-xs">
        <q-btn :disable="!isReady" @click="onDownload" icon="las la-file-download" color="secondary" no-caps dense flat>Download</q-btn>
        <q-btn :disable="!isEnded" @click="onRestart" icon="las la-redo-alt" color="orange" no-caps dense flat></q-btn>
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

        <!-- Type, Date, Status, Options -->
        <div class="row q-gutter-x-lg items-center">
          <!-- Type -->
          <div class="text-weight-regular">{{ getAnalysisType(analysis.type) }}</div>

          <!-- Date -->
          <div class="text-weight-regular">{{ $helpers.content.toDateTimeString(analysis.date) }}</div>

          <!-- Options -->
          <div>
            <q-btn v-if="analysis.options" no-caps flat dense>
              <q-icon name="las la-sliders-h" size="xs" />
              <span class="text-weight-normal q-ml-xs">Options</span>
              <q-popup-proxy class="q-pa-sm q-pb-none">
                <u-options :options="analysis.options" :height="null" readonly />
              </q-popup-proxy>
            </q-btn>
          </div>

          <!-- Status -->
          <div v-if="analysis.comment">
            <q-btn no-caps flat dense>
              <q-icon :color="getProgressColor(analysis.status)" name="las la-exclamation-circle" size="xs" />
              <span :class="`text-${getProgressColor(analysis.status)} text-weight-medium q-ml-xs`">{{ analysis.status || "Created" }}</span>
              <q-popup-proxy class="q-pa-sm q-pb-none">
                <div style="max-width: 300px; word-wrap: break-word;">{{ analysis.comment }}</div>
              </q-popup-proxy>
            </q-btn>
          </div>
          <div v-else>
            <div :class="`text-${getProgressColor(analysis.status)} text-weight-medium`">{{ analysis.status || "Created" }}</div>
          </div>
        </div>

        <!-- Datasets -->
        <div class="row">
          <u-datasets :datasets="analysis.datasets" />
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
      <div class="col q-pa-sm" :style="{ minHeight: $q.screen.height * 0.62 + 'px'}">
        <slot name="results" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import UDatasets from "./Datasets.vue";
import UOptions from "./Options.vue";
import mixin from "../../analysis-mixin.js";

import AnalysisType from "../analysis-type.js";
import { exportFile } from "quasar";
import Settings from "@/_settings/settings";

export default {
  components: {
    UDatasets,
    UOptions
  },

  mixins: [mixin],

  props: {
    analysis: {
      type: Object,
      required: true
    },
    dialog: {
      type: Object,
      default: () => null
    },
    loader: {
      type: Function,
      default: () => null
    },
  },

  setup() {
    return {
      Settings
    }
  },

  emits: ["load", "download", "delete"],

  computed: {
    isReady() {
      return this.analysis.status == "Processed";
    },

    isFailed() {
      return this.analysis.status == "Failed";
    },

    isEnded() {
      return this.isReady || this.isFailed;
    }
  },

  methods: {
    async onLoad() {
      if (this.loader != null) {
        await this.loader();
      }

      if (!this.analysis.results) {
        const payload = { id: this.analysis.id };
        const content = await this.$store.dispatch("analysis/loadAnalysisMeta", payload);
        this.analysis.results = content;
      }

      this.$emit("load");
    },

    async onDownload() {
      const payload = { id: this.analysis.id };
      const format = this.getFileFormat(this.analysis.type);
      const content = await this.$store.dispatch("analysis/loadAnalysisData", payload);
      exportFile(`${this.analysis.id}.${format.ext}`, content, format.type);

       this.$emit("download");
    },

    async onDelete() {
      const payload = { id: this.analysis.id };
      this.$store.dispatch("analysis/deleteAnalysis", payload);

      this.$emit("delete");
    },

    async onRestart() {
      this.dialog?.showEdit(this.analysis);
    },

    getFileFormat(analysisType) {
      const knownType = Object.values(AnalysisType).includes(analysisType);

      if (!knownType) {
        throw new Error(`Unknown analysis type: ${analysisType}`);
      } else if (analysisType == AnalysisType.GAF) {
        return { type: "application/json", ext: "json" };
      } else {
        return { type: "application/octet-stream", ext: "zip" };
      }
    }
  }
}
</script>
