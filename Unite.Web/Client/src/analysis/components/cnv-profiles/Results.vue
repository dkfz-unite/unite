<template>
  <div class="row">
    <div class="col">
      <u-heatmap/>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <u-tile-plot :definition="tilesDefinition"/>
    </div>
  </div>
  <div class="row q-pl-sm" v-if="meta.rank != null">
    <span class="q-gutter-x-sm">
      <span>&Chi;<sup>2</sup>: <b>{{ meta.rank.chi2 }}</b></span> 
      <span>P-Value: <b>{{ meta.rank.p }}</b></span>
    </span>
  </div>
</template>

<script lang="ts">
import settings from "@/visualization/_shared/settings";
import { colors } from "quasar";

import UHeatmap from "./Heatmap.vue";
import UTilePlot from "./TilePlot.vue";
import TilesDefinition from "./tilesDefinition.ts";

export default {
  components: {
    UHeatmap,
    UTilePlot
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
      meta: "",
      traces: null,
      layout: null,
      config: null,
      tilesDefinition: Object.assign(new TilesDefinition(), {
        dimensions: new Set([
          {
            key: "samples",
            values: [120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131]
          },
          {
            key: "chromosomeArms",
            values: ["chr1p", "chr1q", "chr2p", "chr2q", "chr3p", "chr3q", "chr4p", "chr4q"]
          },
          {
            key: "cnv-profile",
            values: ["gain", "loss", "neutral"]
          }
        ]),
        points: [
          [0, 0, 1], [0, 1, 0], [0, 2, 2], [0, 3, 1], [0, 4, 0], [0, 5, 1], [0, 6, 2], [0, 7, 0],
          [1, 0, 0], [1, 1, 2], [1, 2, 1], [1, 3, 1], [1, 4, 2], [1, 5, 0], [1, 6, 1], [1, 7, 1]
        ],
        axes: {
          x: "samples",
          y: "chromosomeArms"
        },
        events: [
          {
            dimension: "cnv-profile",
            colors: ["red", "blue", "gray"]
          }
        ],
        defaultEvents: [2],
        xGroups: [
          { title: "gx1", values: [2, 1, 0, 3] },
          { title: "gx2", values: [4, 5, 6, 7] },
          { title: "gx3", values: [8, 9, 10, 11] }
        ],
        yGroups: [
          { title: "gy1", values: [0, 1, 2, 3] },
          { title: "gy2", values: [4, 5, 6, 7] }
        ]
      })
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
      this.meta = await this.getMeta(this.data);
    },

    async getMeta(blob) {
      const json = await blob.text();
      return JSON.parse(json);
    }
  }
}
</script>