<template>
  <div class="col q-gutter-y-sm">
    <div class="row">
      <div class="col">
        <q-btn-group>
          <q-select
            label="Transcript"
            title="Choose transcript"
            v-if="transcriptOptions"
            v-model="transcriptOption"
            :options="transcriptOptions"
            map-options emit-value
            filled square outlined dense options-dense
          />
          <q-btn
            icon="las la-undo-alt"
            title="Reset zoom"
            @click="resetPlot"
          />
          <q-btn 
            icon="las la-chart-bar"
            title="Toggle stats box"
            :class="{ 'bg-grey-3 text-blue-8': showStats }"
            @click="toggleStats" />
        </q-btn-group>
      </div>
    </div>

    <div class="row" v-if="!loading">
      <div class="col q-pa-sm">
        <u-protein-plot 
          ref="lolliplot" 
          v-if="plotData"
          :data="plotData"
        />
      </div>
    </div>

    <q-inner-loading :showing="loading">
      <q-spinner color="primary" size="lg" :thickness="2"/>
    </q-inner-loading>
  </div>
</template>

<script>
import UProteinPlot from "../visualization/proteinplot/ProteinPlot.vue";
import ProteinPlotDataService from "../visualization/proteinplot/proteinplot-data-service";
import ProteinPlotApiClient from "../../services/api/visualization/api.client.proteinplot.js";

var dataService = new ProteinPlotDataService();
var apiClient = new ProteinPlotApiClient();

export default {
  props: ["mutation"],

  data() {
    return {
      loading: true,
      showStats: true,

      transcripts: null,
      transcript: null,
      data: null,
    }
  },

  computed: {
    transcriptOptions() {
      return this.transcripts?.map(transcript => {
        return {
          value: transcript.id,
          label: `${transcript.symbol} (${transcript.protein.length} aa)`
        }
      });
    },

    transcriptOption: {
      get() {
        return this.transcript?.id;
      },

      set(value) {
        this.transcript = this.transcripts?.find(transcript => transcript.id == value);
        this.fetchData();
      }
    },

    plotData() {
      if (!this.transcript || !this.mutation || !this.data) {
        return null;
      } else {
        return dataService.prepareData(this.transcript, this.mutation, this.data);
      }
    }
  },

  async mounted() {
    await this.fetchTranscripts();

    if (this.transcripts?.length) {
       await this.fetchData();
    }
  },

  methods: {
    async fetchTranscripts() {
      try {
        this.loading = true;
        this.transcripts = null;
        this.transcript = null;
        this.transcripts = await apiClient.getMutationTranscripts(this.mutation.id);
        this.transcript = this.transcripts[0];
      } catch (error) {
        this.transcripts = null;
        this.transcript = null;
      } finally {
         this.loading = false;
      }
    },

    async fetchData() {
      try {
        this.loading = true;
        this.data = null;
        this.data = await apiClient.get(this.transcript.id);
      } catch (error) {
        this.data = null;
      } finally {
        this.loading = false;
      }
    },

    resetPlot() {
      this.$refs.lolliplot.resetPlot();
    },

    toggleStats() {
      this.showStats = !this.showStats;
      this.$refs.lolliplot.setShowStats(this.showStats);
    },
  },
  
  components: {
    UProteinPlot: UProteinPlot
  },
}
</script>