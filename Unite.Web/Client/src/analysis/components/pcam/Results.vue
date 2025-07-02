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
  export default {
    components: {
      UPlotly,
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
            Dataset: String(row["conditions"]).replace(/^"|"$/g, ''),
            Age: String(row["age"]).replace(/^"|"$/g, ''),
            Sex: String(row["sex"]).replace(/^"|"$/g, ''),
            });
          }
        }
        this.loading = false;
        return rows;
      },
      getTraces(data) {
        const uniqueGroups = [...new Set(data.map(row => row.Datasets))];
        const groupColors = {};
        uniqueGroups.forEach(group => {
          const r = Math.floor(Math.random() * 200);
          const g = Math.floor(Math.random() * 200);
          const b = Math.floor(Math.random() * 200);
          groupColors[group] = `rgb(${r}, ${g}, ${b})`;
        });
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
            text: groupData.map(
          // (row) => `Sample: ${row.Sample}<br>PC1: ${row.PC1}<br>PC2: ${row.PC2}<br>Dataset: ${row.Dataset}<br>Age: ${row.Age}<br>Sex: ${row.Sex}`
          (row) => `Sample: ${row.Sample}<br>Dataset: ${row.Dataset}`
        ), 
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
            title: "PC1",
            showline: true,
            zeroline: false,
          },
          yaxis: {
            title: "PC2",
            showline: true,
            zeroline: false,
          },
        };
      },
      toJson(tsv) {
        const lines = tsv.split("\n");
        const headers = lines[0].split(",");
        const result = new Array(lines.length - 1);
        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(",");
          const obj = {};
          for (let j = 0; j < headers.length; j++) {
            const key = headers[j].trim().replace(/"/g, "");
            const value = values[j]?.trim();
            obj[key] = value;
          }
          result[i - 1] = obj;
        }
        
        return result;
      }
    },
  };
  </script>