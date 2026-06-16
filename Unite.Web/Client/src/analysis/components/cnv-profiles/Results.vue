<template>
  <!--div class="row q-col-gutter-sm" style="flex-wrap: nowrap;" ref="setsRow">
    <template v-if="initialized">
      <div class="col-auto" v-for="(definition, index) in tileDefinitions" :key="index">
        <u-tile-set :definition="definition" :tile-width="tileWidth" :tile-height="tileHeight"/>
      </div>
    </template>
  </div-->
  <div class="row" style="flex-wrap: nowrap;">
    <div class="col">
      <u-cnv-profiles-grid v-if="meta" :data="meta" />
    </div>
  </div>
</template>

<script lang="ts">

import UTileSet from "../grid/TileSet.vue";
import TileSetDefinition, {DimensionDefinition, Tile, TileProperty} from "../grid/tileSetDefinition";

import UCnvProfilesGrid from "./CnvProfilesGrid.vue";
import UOncoGrid from "@/analysis/components/gaf/OncoGrid.vue";

export default {
  components: {
    UOncoGrid,
    UTileSet,
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

  data() {
    return {
      meta: "",
      traces: null,
      layout: null,
      config: null,
      initialized: false,
      tileDefinitions: this.buildTilesData(10),
      tileWidth: 0,
      tileHeight: 0,
      resizeObserver: null
    }
  },

  async mounted() {
    /*this.resizeObserver = new ResizeObserver(() => {
      this.resizeTiles();
      if (!this.initialized) {
        this.initialized = true
      }
    })
    this.resizeObserver.observe(this.$refs.setsRow)*/

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

    generateRows() {
      return [
        { "id": "1", "symbol": "chr1p" },
        { "id": "2", "symbol": "chr1q" },
        { "id": "3", "symbol": "chr2p" },
        { "id": "4", "symbol": "chr2q" },
        { "id": "5", "symbol": "chr3p" },
        { "id": "6", "symbol": "chr3q" },
        { "id": "7", "symbol": "chr4p" },
        { "id": "8", "symbol": "chr4q" },
        { "id": "9", "symbol": "chr5p" },
        { "id": "10", "symbol": "chr5q" },
        { "id": "11", "symbol": "chr6p" },
        { "id": "12", "symbol": "chr6q" },
        { "id": "13", "symbol": "chr7p" },
        { "id": "14", "symbol": "chr7q" },
        { "id": "15", "symbol": "chr8p" },
        { "id": "16", "symbol": "chr8q" },
        { "id": "17", "symbol": "chr9p" },
        { "id": "18", "symbol": "chr9q" },
        { "id": "19", "symbol": "chr10p" },
        { "id": "20", "symbol": "chr10q" },
        { "id": "21", "symbol": "chr11p" },
        { "id": "22", "symbol": "chr11q" },
        { "id": "23", "symbol": "chr12p" },
        { "id": "24", "symbol": "chr12q" },
        { "id": "25", "symbol": "chr14p" },
        { "id": "26", "symbol": "chr14q" },
        { "id": "27", "symbol": "chr15p" },
        { "id": "28", "symbol": "chr15q" },
        { "id": "29", "symbol": "chr16p" },
        { "id": "30", "symbol": "chr16q" },
        { "id": "31", "symbol": "chr17p" },
        { "id": "32", "symbol": "chr17q" },
        { "id": "33", "symbol": "chr18p" },
        { "id": "34", "symbol": "chr18q" },
        { "id": "35", "symbol": "chr19p" },
        { "id": "36", "symbol": "chr19q" },
        { "id": "37", "symbol": "chr20p" },
        { "id": "38", "symbol": "chr20q" },
        { "id": "39", "symbol": "chr21p" },
        { "id": "40", "symbol": "chr22q" },
        { "id": "41", "symbol": "chr23p" },
        { "id": "42", "symbol": "chr23q" },
        { "id": "43", "symbol": "chrXp" },
        { "id": "44", "symbol": "chrXq" },
        { "id": "45", "symbol": "chrYp" },
        { "id": "46", "symbol": "chrYq" }
      ];
    },

    generateColumns(count) {
      let columns = [];

      for(let i = 0; i < count; i++) {
        let id = (i + 1).toString();
        columns.push({ "id": id, "displayId": "D00" + id });
      }

      return columns;
    },

    getRandomConsequenceIndex() {
      var rand = Math.random();
      if (rand < 0.60) {
        return 2; // neutral - 60%
      } else if (rand < 0.80) {
        return 0; // gain - 20%
      } else {
        return 1; // loss - 20%
      }
    },

    generateObservations(columns, rows) {
      let observations = [];
      let consequences = [ "gain", "loss", "neutral" ];


      for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < columns.length; j++) {
          let consequenceIndex = this.getRandomConsequenceIndex();

          if(consequenceIndex != 2) {
            let id = (i * rows.length + j + 1).toString();
            observations.push({ "id": id, "donorId": columns[j].id, "geneId": rows[i].id, "type": "mutation", "consequence": consequences[consequenceIndex], "ids": [id] });
          }
        }
      }

      return observations;
    },

    async getMeta(blob) {
      const json = await blob.text();
      //return JSON.parse(json);
      /*let data = {
        "genes": [
          { "id": "3", "symbol": "PRKCZ", "biotype": "protein_coding", "chromosome": "1", "strand": true },
          { "id": "185", "symbol": "PER3", "biotype": "protein_coding", "chromosome": "1", "strand": true },
          { "id": "22359", "symbol": "PTPRN2", "biotype": "protein_coding", "chromosome": "7", "strand": false },
          { "id": "26708", "symbol": "SNAPC4", "biotype": "protein_coding", "chromosome": "9", "strand": false },
          { "id": "33026", "symbol": "EIF4B", "biotype": "protein_coding", "chromosome": "12", "strand": true },
          { "id": "33994", "symbol": "ANKS1B", "biotype": "protein_coding", "chromosome": "12", "strand": false },
          { "id": "44798", "symbol": "SOGA2", "biotype": "protein_coding", "chromosome": "18", "strand": true },
          { "id": "14", "symbol": "MMEL1", "biotype": "protein_coding", "chromosome": "1", "strand": false },
          { "id": "179", "symbol": "DNAJC11", "biotype": "protein_coding", "chromosome": "1", "strand": false },
          { "id": "234", "symbol": "CAMTA1", "biotype": "protein_coding", "chromosome": "1", "strand": true },
          { "id": "199", "symbol": "ERRFI1", "biotype": "protein_coding", "chromosome": "1", "strand": false },
          { "id": "203", "symbol": "FBXO6", "biotype": "protein_coding", "chromosome": "1", "strand": true },
          { "id": "374", "symbol": "MIIP", "biotype": "protein_coding", "chromosome": "1", "strand": true },
          { "id": "389", "symbol": "PADI3", "biotype": "protein_coding", "chromosome": "1", "strand": true },
          { "id": "573", "symbol": "UBR4", "biotype": "protein_coding", "chromosome": "1", "strand": false },
          { "id": "600", "symbol": "OTUD3", "biotype": "protein_coding", "chromosome": "1", "strand": true },
          { "id": "551", "symbol": "EIF4G3", "biotype": "protein_coding", "chromosome": "1", "strand": false },
          { "id": "616", "symbol": "LDLRAD2", "biotype": "protein_coding", "chromosome": "1", "strand": true },
          { "id": "746", "symbol": "AHDC1", "biotype": "protein_coding", "chromosome": "1", "strand": false },
          { "id": "727", "symbol": "FAM76A", "biotype": "protein_coding", "chromosome": "1", "strand": true }
        ],
        "donors": [
          { "id": "1", "displayId": "D001", "diagnosis": "Glioblastoma", "primarySite": "Brain", "localization": "Left", "sex": "Female", "age": 46, "vitalStatus": true, "vitalStatusChangeDay": null, "progressionStatus": false, "progressionStatusChangeDay": null, "steroidsReactive": true, "kps": 90 },
          { "id": "2", "displayId": "D002", "diagnosis": "Glioblastoma", "primarySite": "Brain", "localization": "Right", "sex": "Female", "age": 74, "vitalStatus": false, "vitalStatusChangeDay": null, "progressionStatus": true, "progressionStatusChangeDay": null, "steroidsReactive": false, "kps": 50 }
        ],
        "observations": [
          { "id": "1", "donorId": "1", "geneId": "3", "type": "mutation", "consequence": "missense_variant", "ids": ["1"], "position": "1:2066762", "change": "C > A", "impact": "Moderate", "effect": "missense_variant" },
          { "id": "625", "donorId": "2", "geneId": "3", "type": "mutation", "consequence": "missense_variant", "ids": ["625"], "position": "1:2105455", "change": "G > T", "impact": "Moderate", "effect": "missense_variant" },
          { "id": "5", "donorId": "1", "geneId": "185", "type": "mutation", "consequence": "missense_variant", "ids": ["5"], "position": "1:7858587", "change": "G > T", "impact": "Moderate", "effect": "missense_variant" },
          { "id": "627", "donorId": "2", "geneId": "185", "type": "mutation", "consequence": "splice_acceptor_variant", "ids": ["627"], "position": "1:7897058", "change": "G > T", "impact": "High", "effect": "splice_acceptor_variant" },
          { "id": "252", "donorId": "1", "geneId": "22359", "type": "mutation", "consequence": "missense_variant", "ids": ["252"], "position": "7:157475560", "change": "G > T", "impact": "Moderate", "effect": "missense_variant" },
          { "id": "785", "donorId": "2", "geneId": "22359", "type": "mutation", "consequence": "missense_variant", "ids": ["785"], "position": "7:157475605", "change": "G > T", "impact": "Moderate", "effect": "missense_variant" },
          { "id": "298", "donorId": "1", "geneId": "26708", "type": "mutation", "consequence": "missense_variant", "ids": ["298"], "position": "9:139275258", "change": "C > A", "impact": "Moderate", "effect": "missense_variant" },
          { "id": "816", "donorId": "2", "geneId": "26708", "type": "mutation", "consequence": "missense_variant", "ids": ["816"], "position": "9:139276414", "change": "C > A", "impact": "Moderate", "effect": "missense_variant" },
          { "id": "378", "donorId": "1", "geneId": "33026", "type": "mutation", "consequence": "missense_variant", "ids": ["378"], "position": "12:53412780", "change": "G > T", "impact": "Moderate", "effect": "missense_variant" },
          { "id": "860", "donorId": "2", "geneId": "33026", "type": "mutation", "consequence": "missense_variant", "ids": ["860"], "position": "12:53431273", "change": "A > G", "impact": "Moderate", "effect": "missense_variant" },
          { "id": "391", "donorId": "1", "geneId": "33994", "type": "mutation", "consequence": "missense_variant", "ids": ["391"], "position": "12:99638139", "change": "C > A", "impact": "Moderate", "effect": "missense_variant" },
          { "id": "866", "donorId": "2", "geneId": "33994", "type": "mutation", "consequence": "stop_gained", "ids": ["866"], "position": "12:100166735", "change": "C > A", "impact": "High", "effect": "stop_gained" },
          { "id": "514", "donorId": "1", "geneId": "44798", "type": "mutation", "consequence": "missense_variant", "ids": ["514"], "position": "18:8825869", "change": "C > A", "impact": "Moderate", "effect": "missense_variant" },
          { "id": "956", "donorId": "2", "geneId": "44798", "type": "mutation", "consequence": "missense_variant", "ids": ["956"], "position": "18:8819106", "change": "C > A", "impact": "Moderate", "effect": "missense_variant" },
          { "id": "2", "donorId": "1", "geneId": "14", "type": "mutation", "consequence": "stop_gained", "ids": ["2"], "position": "1:2529663", "change": "G > A", "impact": "High", "effect": "stop_gained" },
          { "id": "3", "donorId": "1", "geneId": "179", "type": "mutation", "consequence": "missense_variant", "ids": ["3"], "position": "1:6738479", "change": "C > A", "impact": "Moderate", "effect": "missense_variant" },
          { "id": "4", "donorId": "1", "geneId": "234", "type": "mutation", "consequence": "splice_acceptor_variant", "ids": ["4"], "position": "1:7807769", "change": "G > T", "impact": "High", "effect": "splice_acceptor_variant" },
          { "id": "6", "donorId": "1", "geneId": "199", "type": "mutation", "consequence": "missense_variant", "ids": ["6"], "position": "1:8074183", "change": "G > T", "impact": "Moderate", "effect": "missense_variant" },
          { "id": "10", "donorId": "1", "geneId": "203", "type": "mutation", "consequence": "missense_variant", "ids": ["10"], "position": "1:11731416", "change": "C > A", "impact": "Moderate", "effect": "missense_variant" },
          { "id": "11", "donorId": "1", "geneId": "374", "type": "mutation", "consequence": "missense_variant", "ids": ["11"], "position": "1:12091419", "change": "C > A", "impact": "Moderate", "effect": "missense_variant" },
          { "id": "12", "donorId": "1", "geneId": "389", "type": "mutation", "consequence": "missense_variant", "ids": ["12"], "position": "1:17592162", "change": "C > A", "impact": "Moderate", "effect": "missense_variant" },
          { "id": "13", "donorId": "1", "geneId": "573", "type": "mutation", "consequence": "missense_variant", "ids": ["13"], "position": "1:19430578", "change": "C > A", "impact": "Moderate", "effect": "missense_variant" },
          { "id": "14_2", "donorId": "1", "geneId": "573", "type": "mutation", "consequence": "missense_variant", "ids": ["14_2"], "position": "1:19449400", "change": "C > A", "impact": "Moderate", "effect": "missense_variant" },
          { "id": "15", "donorId": "1", "geneId": "600", "type": "mutation", "consequence": "missense_variant", "ids": ["15"], "position": "1:20234141", "change": "C > A", "impact": "Moderate", "effect": "missense_variant" },
          { "id": "16", "donorId": "1", "geneId": "551", "type": "mutation", "consequence": "missense_variant", "ids": ["16"], "position": "1:21299518", "change": "G > T", "impact": "Moderate", "effect": "missense_variant" },
          { "id": "17", "donorId": "1", "geneId": "616", "type": "mutation", "consequence": "missense_variant", "ids": ["17"], "position": "1:22141043", "change": "C > A", "impact": "Moderate", "effect": "missense_variant" },
          { "id": "18", "donorId": "1", "geneId": "746", "type": "mutation", "consequence": "missense_variant", "ids": ["18"], "position": "1:27875719", "change": "G > T", "impact": "Moderate", "effect": "missense_variant" },
          { "id": "19", "donorId": "1", "geneId": "727", "type": "mutation", "consequence": "missense_variant", "ids": ["19"], "position": "1:28054002", "change": "C > A", "impact": "Moderate", "effect": "missense_variant" }
        ]
      };*/

      let rows = this.generateRows();
      let columns = this.generateColumns(1000);
      let observations = this.generateObservations(columns, rows);

      let data = {
        genes: rows,
        donors: columns,
        observations: observations
      };

      return data;
    },

    buildTilesData(setsCount: number) {
      const definitions: TileSetDefinition[] = [];
      const sampleCounts: number[] = [];

      for(let i = 0; i < setsCount; i++) {
        const samplesCount = this.randomInt(4, 50);
        sampleCounts.push(samplesCount);
      }

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

        definition.columns = columns;
        definition.rows = rows;
        definition.tileProperties = [ propertyCnvProfile ];
        definition.defaultTile = defaultTile;
        definition.tiles = this.generateTiles(samplesCount, rows.values.size);

        definitions.push(definition);
      }

      definitions.sort((a, b) => b.columns.values.size - a.columns.values.size);

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

    resizeTiles(): void {
      const setsCount = this.tileDefinitions.length;

      let totalSampleCount = 0;
      for(let definition of this.tileDefinitions) {
        totalSampleCount += definition.columns.values.size;
      }

      const rowEl = this.$refs.setsRow as HTMLElement;
      if(!rowEl)
        return;
      const style = window.getComputedStyle(rowEl);
      const paddingLeft = parseFloat(style.paddingLeft);
      const paddingRight = parseFloat(style.paddingRight);
      const totalWidth = rowEl.getBoundingClientRect().width - paddingLeft - paddingRight;

      const gap = 8;
      const gapsWidth = gap * setsCount;  // all cols have padding, including first and last

      const tileWidth = (totalWidth - gapsWidth) / totalSampleCount;
      const tileHeight = 10;

      this.tileWidth = tileWidth;
      this.tileHeight = tileHeight;

      //console.log("tileWidth", tileWidth, "tileHeight", tileHeight, "totalWidth", totalWidth, "gapsWidth", gapsWidth);
    },

    randomInt(a: number, b: number): number {
      return Math.floor(Math.random() * (b - a + 1)) + a
    }
  }
}
</script>