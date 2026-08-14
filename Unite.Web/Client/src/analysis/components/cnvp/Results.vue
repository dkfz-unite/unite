<template>
  <div class="row" style="flex-wrap: nowrap;">
    <div class="col">
      <u-event-grid v-if="meta" :id="id" :data="meta" />
    </div>
  </div>
</template>

<script lang="ts">
import UEventGrid from "./EventGrid.vue";
import { colors } from "quasar";

export default {
  components: {
    UEventGrid,
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

  data() {
    return {
      meta: null
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
      const palette = {
        "Loss": colors.getPaletteColor("red-4"),
        "Gain": colors.getPaletteColor("green-4")
      };

      return {
        columns: this.getColumns(data),
        columnTracks: this.getColumnTracks(data),
        rows: this.getRows(data),
        events: this.getEvents(data),
        palette: palette
      };
    },

    getColumns(data: any) {
      return data.samples.map((sample: any) => ({
        id: sample.id,
        label: sample.donorId,
        donorId: sample.donorId,
        specimenId: sample.specimenId,
        data: sample.tracks
      }));
    },

    getColumnTracks(data: any) {
      const tracks = [];
      const tracksMap = new Set<string>();

      for (const sample of data.samples){
        for (const key in sample.tracks) {
          if (!tracksMap.has(key)) {
            tracks.push({
              group: "Metadata",
              id: key,
              label: key,
              field: (column: any) => column.data[key]
            });
          }
        }
      }

      return tracks;
    },

    getRows(data: any) {
      return data.regions.map((region: any) => ({
        id:  region.id,
        label: region.id
      }));
    },

    getEvents(data: any) {
      return data.observations.map((observation: any, index: number) => ({
        id: index.toString(),
        columnId: observation.sampleId,
        rowId: observation.regionId,
        type: observation.event
      }));
    }
  }
}
</script>