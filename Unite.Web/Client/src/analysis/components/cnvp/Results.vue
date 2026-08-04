<template>
  <div class="row" style="flex-wrap: nowrap;">
    <div class="col">
      <u-cnv-profiles-grid v-if="meta" :data="meta" />
    </div>
  </div>
</template>

<script lang="ts">

import UCnvProfilesGrid from "./CnvProfilesGrid.vue";

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

  data() {
    return {
      meta: "",
      tumorTypeColors: {},
      colorPalette: [
        '#4daf4a',
        '#984ea3',
        '#ff7f00',
        '#a65628',
        '#f781bf',
        '#999999',
        '#66c2a5',
        '#fc8d62',
        '#8da0cb',
        '#e78ac3',
        '#e41a1c',
        '#377eb8'
      ]
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

    getRandomIndex(weights) {
      let rand = Math.random();
      let sum = 0;

      for(let i = 0; i < weights.length; i++) {
        let weight = weights[i];
        sum += weight;
        if(sum >= rand)
          return i;
      }
    },

    generateColumns(count) {
      let columns = []
      let types = ["type 1", "type 2", "type 3", "type 4", "type 5", "type 6"];
      const typeWeights = [0.5, 0.2, 0.1, 0.1, 0.05, 0.05];

      for(let i = 0; i < count; i++) {
        let id = (i + 1).toString();
        const typeIndex = this.getRandomIndex(typeWeights);
        columns.push({
              "id": id,
              displayId: "D00" + id,
              type: types[typeIndex],
              typeWeight: typeWeights[typeIndex],
              donorId: 1
            });
      }

      return columns;
    },

    generateObservations(columns, rows) {
      let observations = [];
      let consequences = [ "gain", "loss", "neutral" ];
      const consequenceWeights = [0.2, 0.2, 0.6];

      for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < columns.length; j++) {
          let consequenceIndex = this.getRandomIndex(consequenceWeights);

          if(consequenceIndex != 2) {
            let id = (i * rows.length + j + 1).toString();
            observations.push({
              id: id,
              donorId: columns[j].id,
              geneId: rows[i].id,
              type: "mutation",
              consequence: consequences[consequenceIndex],
              ids: [id]
            });
          }
        }
      }

      return observations;
    },

    sortTypes(field) {
      return function (a, b) {
        // primary sort: by weight descending (higher weight = more to the left)
        let weightDiff = b.typeWeight - a.typeWeight;
        if (weightDiff !== 0) return weightDiff;

        // secondary sort: by type name for stable grouping within same weight
        let typeA = a[field];
        let typeB = b[field];
        if (typeA < typeB) return -1;
        if (typeA > typeB) return 1;
        return 0;
      }
    },

    generateTracks() {
      return [
        {
          group: "Types",
          name: "Type",
          fieldName: "type",
          type: "type",
          sort: this.sortTypes
        }
      ];
    },

    generateData() {
      let rows = this.generateRows();
      let columns = this.generateColumns(1000);
      let observations = this.generateObservations(columns, rows);
      let tracks = this.generateTracks();

      let data = {
        genes: rows,
        donors: columns,
        observations: observations,
        sampleTracks: tracks,
        sampleFillFunc: function(d) {
          const colors = {
            'type 3': '#4daf4a',
            'type 4': '#984ea3',
            'type 5': '#ff7f00',
            'type 6': '#a65628',
            'type 1': '#e41a1c',
            'type 2': '#377eb8'
          };
          return colors[d.value] || '#ccc';
        }
      };

      return data;
    },

    getRows(analysisData) {
      let rows = [];

      for(let i = 0; i < analysisData.dnaRegions.length; i++) {
        let dnaRegion = analysisData.dnaRegions[i];
        rows.push({ id:  dnaRegion.id, symbol: dnaRegion.chromosome + dnaRegion.arm });
      }

      return rows;
    },

    getColumns(analysisData) {
      let tumorTypes = {};
      let columns = [];

      for(let i = 0; i < analysisData.samples.length; i++) {
        let sample = analysisData.samples[i];

        columns.push({
          id: sample.id,
          displayId: sample.donorId,
          tumorType: sample.tumorType,
          donorId: sample.donorId,
        });

        if(!tumorTypes.hasOwnProperty(sample.tumorType)) {
          tumorTypes[sample.tumorType] = 0;
        }
        tumorTypes[sample.tumorType]++;
      }

      for(let column of columns) {
        column.tumorTypeCount = tumorTypes[column.tumorType];
      }

      return columns;
    },

    getObservations(analysisData) {
      let observations = [];

      for(let i = 0; i < analysisData.observations.length; i++) {
        let observation = analysisData.observations[i];

        let id = (i).toString();
        observations.push({
          id: id,
          donorId: observation.sampleId,
          geneId: observation.dnaRegionId,
          type: "mutation",
          consequence: observation.event, ids: [id]
        });
      }

      return observations;
    },

    sortTumorTypes(field) {
      return function (a, b) {
        // primary sort: by weight descending (higher weight = more to the left)
        let weightDiff = b.tumorTypeCount - a.tumorTypeCount;
        if (weightDiff !== 0) return weightDiff;

        // secondary sort: by type name for stable grouping within same weight
        let typeA = a[field];
        let typeB = b[field];
        if (typeA < typeB) return -1;
        if (typeA > typeB) return 1;
        return 0;
      }
    },

    getTracks() {
      return [
        {
          group: "Tracks",
          name: "Tumor Type",
          fieldName: "tumorType",
          type: "tumorType",
          sort: this.sortTumorTypes
        }
      ];
    },

    getTumorTypeColor(tumorType) {
      if (!this.tumorTypeColors.hasOwnProperty(tumorType)) {
        const index = Object.keys(this.tumorTypeColors).length % this.colorPalette.length;
        this.tumorTypeColors[tumorType] = this.colorPalette[index];
      }
      return this.tumorTypeColors[tumorType];
    },

    async getData(blob) {
      const json = await blob.text();
      const analysisData = JSON.parse(json);

      this.tumorTypeColors = {};

      let rows = this.getRows(analysisData);
      let columns = this.getColumns(analysisData);
      let observations = this.getObservations(analysisData);
      let tracks = this.getTracks();

      let data = {
        genes: rows,
        donors: columns,
        observations: observations,
        sampleTracks: tracks,
        sampleFillFunc: (d) => this.getTumorTypeColor(d.value)
      };

      return data;
    },

    async getMeta(blob) {
      const generateData = false;

      return generateData ? this.generateData() : await this.getData(blob);
    }
  }
}
</script>