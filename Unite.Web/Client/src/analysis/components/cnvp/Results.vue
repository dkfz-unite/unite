<template>
  <div class="row" style="flex-wrap: nowrap;">
    <div class="col">
      <u-cnv-profiles-grid v-if="meta" :data="meta" />
    </div>
  </div>
</template>

<script lang="ts">
import UCnvProfilesGrid from "./CnvProfilesGrid.vue";
import RandomColors from "@/visualization/_shared/random-colors";

export default {
  components: {
    UCnvProfilesGrid
  },

  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    data: {
      type: Object,
      required: true
    }
  },

  setup() {
    return { 
      colors: new RandomColors() 
    };
  },

  data() {
    return {
      meta: null,
      tracksMap: new Map<string, number>(),
      trackColors: {},
    }
  },

  async mounted() {
    await this.init();
  },

  watch: {
    async data(value) {      
      await this.init();
    }
  },
  
  methods: {
    async init() {
      this.meta = await this.getData(this.data);
    },

    async getData(blob: Blob) {
      const json = await blob.text();
      const data = JSON.parse(json);

      let columns = this.getColumns(data);
      let rows = this.getRows(data);
      let observations = this.getObservations(data);
      let tracks = this.getTracks(data);

      return {
        donors: columns,
        genes: rows,
        observations: observations,
        sampleTracks: tracks,
        sampleFillFunc: (d: any) => this.getTrackColor(d.value)
      };
    },

    getColumns(data: any) {
      return data.samples.map((sample: any) => ({
        id: sample.id,
        displayId: sample.donorId,
        donorId: sample.donorId,
        ...Object.fromEntries(Object.entries(sample.tracks).map(([key, value]) => [key, value]))
      }));
    },

    getRows(data: any) {
      return data.regions.map((region: any) => ({
        id:  region.id,
        symbol: region.id
      }));
    },

    getObservations(data: any) {
      return data.observations.map((observation: any, index: number) => ({
        id: index.toString(),
        ids: [index.toString()], // Some black magic
        donorId: observation.sampleId,
        geneId: observation.regionId,
        type: "mutation", // Some black magic probably required by Oncogrid
        consequence: observation.event,
      }));
    },

    getTracks(data: any) {
      const tracks = [];

      for (const sample of data.samples){
        for (const key in sample.tracks) {
          if (!this.tracksMap.has(key)) {
            tracks.push({
              group: "Metadata",
              name: key,
              fieldName: key,
              type: "track",
              sort: this.sortTrack
            });
          }

          const weight = this.tracksMap.get(key) ?? 0;
          this.tracksMap.set(key, weight + 1);
        }
      }

      return tracks;
    },

    sortTrack(field: any) {
      const self = this;

      return function (a: any, b: any) {
        // primary sort: by weight descending (higher weight = more to the left)
        const aWeight = self.tracksMap.get(a[field]) ?? 0;
        const bWeight = self.tracksMap.get(b[field]) ?? 0;
        let weightDiff = bWeight - aWeight;
        if (weightDiff !== 0) return weightDiff;

        // secondary sort: by type name for stable grouping within same weight
        let typeA = a[field];
        let typeB = b[field];
        if (typeA < typeB) return -1;
        if (typeA > typeB) return 1;
        return 0;
      }
    },

    getTrackColor(value: any) {
      if (!this.trackColors.hasOwnProperty(value)) {
        this.trackColors[value] = this.colors.next(5);
      }
      return this.trackColors[value];
    }
  }
}
</script>