<template>
  <div class="row q-col-gutter-sm">
    <div class="col" v-for="(definition, index) in tileDefinitions" :key="index">
      <u-tile-set :definition="definition"/>
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

import UTileSet from "../grid/TileSet.vue";
import TileSetDefinition, {DimensionDefinition, Tile, TileProperty} from "../grid/tileSetDefinition";

export default {
  components: {
    UTileSet
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
      tileDefinitions: this.buildTileDefinitions(12)
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

    buildTileDefinitions(setsCount: number): TileSetDefinition[] {
      const definitions: TileSetDefinition[] = [];

      const tileHeight = 10;
      let sampleId = 120;

      let rows = new DimensionDefinition();
      rows.title = "Chromosome Arms";
      rows.values = new Set<any>([
        "chr1p", "chr1q", "chr2p", "chr2q", "chr3p", "chr3q", "chr4p", "chr4q"
      ]);

      let propertyCnvProfile = new TileProperty();
      propertyCnvProfile.key = "cnv-profile";
      propertyCnvProfile.values = new Set<any>(["gain", "loss", "neutral"]);
      propertyCnvProfile.colors = ["red", "blue", "gray"];

      const defaultTile = Tile.create([0, 0], [0, 2]);

      for(let i = 0; i < setsCount; i++) {
        const definition = new TileSetDefinition();

        let columns = new DimensionDefinition();
        columns.title = "Samples " + (i + 1);
        const samplesCount = 12;
        columns.values = new Set<any>();
        for(let j = 0; j < samplesCount; j++) {
          columns.values.add(sampleId++);
        }

        definition.tileHeight = tileHeight;
        definition.columns = columns;
        definition.rows = rows;
        definition.tileProperties = [ propertyCnvProfile ];
        definition.defaultTile = defaultTile;
        definition.tiles = this.generateTiles(samplesCount, rows.values.size);

        definitions.push(definition);
      }

      return definitions;
    },

    generateTiles(columnCount: number, rowCount: number): Tile[] {
      const tiles: Tile[] = []

      for (let row = 0; row < rowCount; row++) {
        for (let col = 0; col < columnCount; col++) {
          const rand = Math.random()
          let value: number

          if (rand < 0.65) {
            value = 2
          } else {
            value = Math.random() < 0.5 ? 0 : 1
          }

          tiles.push([[col, row], [0, value]])
        }
      }

      return tiles
    }
  }
}
</script>