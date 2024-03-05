<template>
  <div class="col q-gutter-y-sm">
    <div class="row q-gutter-x-sm" v-if="transcriptOptions?.length">
      <q-btn-group>
        <q-select
          label="Transcript"
          title="Choose transcript"
          v-model="transcriptOption"
          :options="transcriptOptions"
          map-options emit-value
          filled square outlined dense options-dense
        />
      </q-btn-group>

      <q-btn-group>
        <q-select
          label="Grouping"
          title="Choose grouping"
          v-model="groupingOption"
          :options="groupingOptions"
          style="min-width: 150px;"
          map-options emit-value
          filled square outlined dense options-dense
        />
        <q-btn 
          icon="las la-chart-bar"
          title="Toggle stats box"
          :class="{ 'bg-grey-3 text-blue-8': showStats }"
          @click="showStats = !showStats" 
        />
      </q-btn-group>
    </div>

    <div class="row" v-if="!loading && transcriptOptions?.length">
      <div class="col">
        <u-protein-plot 
          v-if="plotData"
          :data="plotData"
          :stats="showStats"
          :grouping="grouping"
        />
      </div>
    </div>

    <div class="row" v-if="!loading && !transcriptOptions?.length">
      Mutation doesn't affect any protein coding transcript.
    </div>

    <q-inner-loading :showing="loading">
      <q-spinner-gears size="50px" color="grey" />
    </q-inner-loading>
  </div>
</template>

<script>
import UProteinPlot from "@/visualization/proteinplot/components/ProteinPlot.vue";
import ProteinPlotDataService from "@/visualization/proteinplot/components/proteinplot-data-service";
import api from "@/visualization/proteinplot/api";

var dataService = new ProteinPlotDataService();

export default {
  components: {
    UProteinPlot
  },

  props: {
    variant: Object
  },

  data() {
    return {
      loading: true,
      showStats: true,

      transcripts: null,
      transcript: null,
      grouping: "impact",
      data: null
    }
  },

  computed: {
    transcriptOptions() {
      return this.transcripts?.map(transcript => ({
        value: transcript.id,
        label: `${transcript.symbol} (${transcript.protein.length} aa)`
      }));
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

    groupingOptions() {
      if (!this.transcripts) return null;

      return [
        { value: "impact", label: "Impact" },
        { value: "consequence", label: "Consequence"}
      ];
    },

    groupingOption: {
      get() { return this.grouping; },
      set(value) { this.grouping = value; }
    },

    plotData() {
      if (!this.transcript || !this.variant || !this.data) {
        return null;
      } else {
        return dataService.prepareData(this.transcript, this.variant, this.data);
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
        this.transcripts = await api.getMutationTranscripts(this.variant.id);
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
        this.data = await api.get(this.transcript.id);
      } catch (error) {
        this.data = null;
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>