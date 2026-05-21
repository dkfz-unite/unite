<template>
  <!--div class="row">
    <div class="col">
      <u-heatmap/>
    </div>
  </div-->
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
import UTileSet from "../grid/TileSet.vue";
import TileSetDefinition, {DimensionDefinition, Group, TileProperty} from "../grid/tileSetDefinition";

export default {
  components: {
    UHeatmap,
    UTilePlot: UTileSet
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
      tilesDefinition: this.buildTilesDefinition()
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
    },

    buildTilesDefinition(): TileSetDefinition {
      const definition = new TileSetDefinition();

      let columns = new DimensionDefinition();
      columns.title = "Samples";
      columns.values = new Set<any>([
        120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131
      ]);
      definition.columns = columns;

      let rows = new DimensionDefinition();
      rows.title = "Chromosome Arms";
      rows.values = new Set<any>([
        "chr1p", "chr1q", "chr2p", "chr2q", "chr3p", "chr3q", "chr4p", "chr4q"
      ]);
      definition.rows = rows;

      let propertyCnvProfile = new TileProperty();
      propertyCnvProfile.key = "cnv-profile";
      propertyCnvProfile.values = new Set<any>(["gain", "loss", "neutral"]);
      propertyCnvProfile.colors = ["red", "blue", "gray"];

      definition.tileProperties = [ propertyCnvProfile ];
      definition.defaultTile = [ [], [0, 2] ];

      definition.tiles = [
          [ [0, 0], [0, 0] ],  [ [1, 0], [0, 1] ],
          [ [0, 1], [0, 2] ],  [ [1, 1], [0, 1] ],
          [ [0, 2], [0, 0] ],  [ [1, 2], [0, 0] ],
          [ [0, 3], [0, 1] ],  [ [1, 3], [0, 2] ],
          [ [0, 4], [0, 1] ],  [ [1, 4], [0, 1] ],
          [ [0, 5], [0, 2] ],  [ [1, 5], [0, 2] ],
          [ [0, 6], [0, 1] ],  [ [1, 6], [0, 0] ],
          [ [0, 7], [0, 0] ],  [ [1, 7], [0, 1] ]
      ];

      return definition;
    }
  }
}
</script>