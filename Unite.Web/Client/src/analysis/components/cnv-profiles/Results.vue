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
import TileSetDefinition, {DimensionDefinition, Tile, TileProperty} from "../grid/tileSetDefinition";

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

      definition.tileHeight = 10;

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
      definition.defaultTile = Tile.create([0, 0], [0, 2]);

      const tiles: Tile[] = [
        [ [0, 0], [0, 0] ],  [ [1, 0], [0, 1] ],  [ [2, 0], [0, 0] ],  [ [3, 0], [0, 1] ],  [ [4, 0], [0, 2] ],  [ [5, 0], [0, 1] ],  [ [6, 0], [0, 2] ],  [ [7, 0], [0, 0] ],  [ [8, 0], [0, 1] ],  [ [9, 0], [0, 2] ],  [ [10, 0], [0, 0] ],  [ [11, 0], [0, 1] ],
        [ [0, 1], [0, 2] ],  [ [1, 1], [0, 1] ],  [ [2, 1], [0, 2] ],  [ [3, 1], [0, 0] ],  [ [4, 1], [0, 0] ],  [ [5, 1], [0, 1] ],  [ [6, 1], [0, 0] ],  [ [7, 1], [0, 2] ],  [ [8, 1], [0, 1] ],  [ [9, 1], [0, 0] ],  [ [10, 1], [0, 2] ],  [ [11, 1], [0, 1] ],
        [ [0, 2], [0, 0] ],  [ [1, 2], [0, 0] ],  [ [2, 2], [0, 1] ],  [ [3, 2], [0, 2] ],  [ [4, 2], [0, 0] ],  [ [5, 2], [0, 1] ],  [ [6, 2], [0, 2] ],  [ [7, 2], [0, 1] ],  [ [8, 2], [0, 0] ],  [ [9, 2], [0, 2] ],  [ [10, 2], [0, 1] ],  [ [11, 2], [0, 0] ],
        [ [0, 3], [0, 1] ],  [ [1, 3], [0, 2] ],  [ [2, 3], [0, 1] ],  [ [3, 3], [0, 1] ],  [ [4, 3], [0, 0] ],  [ [5, 3], [0, 1] ],  [ [6, 3], [0, 1] ],  [ [7, 3], [0, 2] ],  [ [8, 3], [0, 0] ],  [ [9, 3], [0, 1] ],  [ [10, 3], [0, 2] ],  [ [11, 3], [0, 1] ],
        [ [0, 4], [0, 1] ],  [ [1, 4], [0, 1] ],  [ [2, 4], [0, 0] ],  [ [3, 4], [0, 1] ],  [ [4, 4], [0, 1] ],  [ [5, 4], [0, 1] ],  [ [6, 4], [0, 0] ],  [ [7, 4], [0, 1] ],  [ [8, 4], [0, 2] ],  [ [9, 4], [0, 0] ],  [ [10, 4], [0, 1] ],  [ [11, 4], [0, 2] ],
        [ [0, 5], [0, 2] ],  [ [1, 5], [0, 2] ],  [ [2, 5], [0, 0] ],  [ [3, 5], [0, 0] ],  [ [4, 5], [0, 2] ],  [ [5, 5], [0, 1] ],  [ [6, 5], [0, 2] ],  [ [7, 5], [0, 0] ],  [ [8, 5], [0, 1] ],  [ [9, 5], [0, 2] ],  [ [10, 5], [0, 0] ],  [ [11, 5], [0, 1] ],
        [ [0, 6], [0, 1] ],  [ [1, 6], [0, 0] ],  [ [2, 6], [0, 2] ],  [ [3, 6], [0, 2] ],  [ [4, 6], [0, 1] ],  [ [5, 6], [0, 1] ],  [ [6, 6], [0, 0] ],  [ [7, 6], [0, 2] ],  [ [8, 6], [0, 1] ],  [ [9, 6], [0, 0] ],  [ [10, 6], [0, 2] ],  [ [11, 6], [0, 1] ],
        [ [0, 7], [0, 0] ],  [ [1, 7], [0, 1] ],  [ [2, 7], [0, 1] ],  [ [3, 7], [0, 2] ],  [ [4, 7], [0, 0] ],  [ [5, 7], [0, 1] ],  [ [6, 7], [0, 2] ],  [ [7, 7], [0, 0] ],  [ [8, 7], [0, 1] ],  [ [9, 7], [0, 2] ],  [ [10, 7], [0, 0] ],  [ [11, 7], [0, 1] ],
      ];
      definition.tiles = tiles;

      return definition;
    }
  }
}
</script>