<template>
    <template v-if="!loading">
      <u-plotly
        :id="id"
        :data="traces"
        :layout="layout"
        :config="config"
        :style="{ height: '500px', width: '800px' }"
      />
    </template>
    <template v-else>
      <q-inner-loading :showing="true" label="Please wait..."></q-inner-loading>
    </template>
  </template>
  
  <script>
  import UPlotly from "@/visualization/_shared/Plotly.vue";
  import settings from "@/visualization/_shared/settings";
  import { colors } from "quasar";
  import * as Papa from "papaparse";
  export default {
    components: {
      UPlotly
    },
    props: {
      id: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      data: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        loading: false,
        traces: [],
        layout: {},
        config: {},
      };
    },
    async mounted() {
      await this.init();
    },
    watch: {
      async data(value) {
        await this.init();
      },
    },
    methods: {
      async init() {
        const parsedData = await this.getParsedData(this.data);
        this.traces = this.getTraces(parsedData);
        this.layout = this.getLayout();
      },
      async getParsedData(data) {
        this.loading = true;
        const start = performance.now();
        const compressedData = data.stream();
        const decompressedData = compressedData.pipeThrough(new DecompressionStream('gzip'));
        const tsv = await new Response(decompressedData).text();
        const json = this.toJson(tsv);
        const rows = [];
        for (let i = 0; i < json.length; i++) {
          const row = json[i];
          if(row["Sample"] != undefined) {
            rows.push({
            Sample: String(row["Sample"]).replace(/^"|"$/g, ''),
            PC1: parseFloat(row["PC1"]),
            PC2: parseFloat(row["PC2"]),
            Dataset: String(row["condition"]).replace(/^"|"$/g, '')
            });
          }
        }
        this.loading = false;
        return rows;
      },
      getTraces(data) {
        const groupedData = data.reduce((acc, row) => {
          if (!acc[row.Dataset]) acc[row.Dataset] = [];
          acc[row.Dataset].push(row);
          return acc;
        }, {});
        const traces = Object.keys(groupedData).map((group) => {
          const groupData = groupedData[group];
          return {
            name: group,
            type: "scatter",
            mode: "markers",
            x: groupData.map((row) => row.PC1),
            y: groupData.map((row) => row.PC2),
            text: groupData.map((row) => `Sample: ${row.Sample}<br>Dataset: ${row.Dataset}`), 
            marker: {
              size: 8,
              opacity: 1.2,
              color: colors
            }
          };
        });
        return traces;
      },
      getLayout() {
        return {
          title: {
            text: this.title,
            x: 0.03,
          },
          modebar: settings.modebar,
          margin: {
            t: 40,
            r: 50,
            b: 50,
            l: 60,
          },
          xaxis: {
            title: {text : "PC1"},
            showline: true,
            zeroline: false,
          },
          yaxis: {
            title: {text : "PC2"},
            showline: true,
            zeroline: false,
          },
        };
      },
      toJson(tsv) 
      {
        const result = Papa.parse(tsv, { delimiter: ",", header: true, skipEmptyLines: true });
        return result.data; 
      }
    },
  };
  </script>