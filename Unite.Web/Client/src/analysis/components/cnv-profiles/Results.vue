<template>
  <div class="row q-col-gutter-sm" ref="setsRow">
    <div class="col" v-for="(definition, index) in tileDefinitions" :key="index">
      <u-tile-set :definition="definition"/>
    </div>
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
      tileDefinitions: []
    }
  },

  async mounted() {
    this.tileDefinitions = this.buildTileDefinitions(10);
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
      const sampleCounts: number[] = [];
      let totalSampleCount = 0;

      for(let i = 0; i < setsCount; i++) {
        const samplesCount = this.randomInt(12, 32);
        totalSampleCount += samplesCount;
        sampleCounts.push(samplesCount);
      }

      const totalWidth = this.$refs.setsRow.getBoundingClientRect().width;
      const gapsWidth = 8 * setsCount;

      const tileWidth = (totalWidth - gapsWidth) / totalSampleCount;
      const tileHeight = 10;
      let sampleId = 120;

      let rows = new DimensionDefinition();
      rows.title = "Chromosome Arms";
      rows.values = new Set<any>([
        "chr1p", "chr1q", "chr2p", "chr2q", "chr3p", "chr3q", "chr4p", "chr4q",
        "chr5p", "chr5q", "chr6p", "chr6q", "chr7p", "chr7q", "chr8p", "chr8q",
        "chr9p", "chr9q", "chr10p", "chr10q", "chr11p", "chr11q", "chr12p", "chr12q",
        "chr13p", "chr13q", "chr14p", "chr14q", "chr15p", "chr15q", "chr16p", "chr16q",
        "chr17p", "chr17q", "chr18p", "chr18q", "chr19p", "chr19q", "chr20p", "chr20q",
        "chr21p", "chr21q", "chr22p", "chr22q", "chr23p", "chr23q", "chrXp", "chrXq",
        "chrYp", "chrYq"
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
        const samplesCount = sampleCounts[i];
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
    },

    randomInt(a: number, b: number): number {
      return Math.floor(Math.random() * (b - a + 1)) + a
    }
  }
}
</script>