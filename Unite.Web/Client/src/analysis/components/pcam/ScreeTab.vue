<template>
  <!-- Right: Plot -->
    <q-card>
      <template v-if="!loading">
        <u-plotly
          :id="id"
          :data="traces"
          :layout="layout"
          :config="config"
        />
      </template>
      <template v-else>
        <q-inner-loading :showing="true" label="Please wait..."></q-inner-loading>
      </template>
    </q-card>
  </template>
  
  
    
<script>
  import UPlotly from "@/visualization/_shared/Plotly.vue";
  import UFilterItems from "./UserOptions.vue";
  import settings from "@/visualization/_shared/settings";
  import { colors } from "quasar";
  import * as Papa from "papaparse";

  export default {
    components: {
      UPlotly,
      UFilterItems
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
      meta:{
        type: Array,
        required: true,
      }
    },

    data() {
        return {
        loading: false,
        parsedData: [],
        pcs: [],
        category: [],
        selectedX: "PC1",
        selectedY: "PC2",
        selectedCategory: "sample_id",
        dataRows: [],
        metaRows: [],
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

      async selectedX() {
        this.traces = this.getTraces(this.parsedData);
        this.layout = this.getLayout();
      },

      async selectedY() {
      this.traces = this.getTraces(this.parsedData);
      this.layout = this.getLayout();
      },

      async selectedCategory() {
        this.traces = this.getTraces(this.parsedData);
        this.layout = this.getLayout();
      },
    },

    methods: {
      async init() {
        this.parsedData = await this.getParsedData(this.data, this.meta);
        if (this.parsedData.length > 0) {
          this.pcs = Object.keys(this.parsedData[0]).filter(
            (k) => k.startsWith("PC")
          );
          this.category = Object.keys(this.metaRows[0]);
        }

        this.traces = this.getTraces(this.parsedData);
        this.layout = this.getLayout();
      },  

      async getParsedData(data, meta) {
        this.loading = true;
        const start = performance.now();
        const dataTsv = await new Response(data).text();
        const dataRows = this.toJson(dataTsv);
        const metaTsv = await new Response(meta).text();
        this.metaRows = this.toJson(metaTsv);
        const joinedRows = this.joinTables(dataRows,this.metaRows);
        this.loading = false;
        return joinedRows;
      },

      getTraces(data) {
        const pcKeys = Object.keys(data[0]).filter(k => k.startsWith("PC"));
        const values = pcKeys.map(pc =>
          this.variance(data.map(r => Number(r[pc])))
        );
        const total = values.reduce((a, b) => a + b, 0);
        const explained = values.map(v => (v / total) * 100);
        const cumulative = explained.map((v, i) =>
          explained.slice(0, i + 1).reduce((a, b) => a + b, 0)
        );
        const labels = pcKeys;

        return [
          {
          x: labels,
          y: explained,
          type: "bar",
          name: "% Explained",
          marker: { color: "rgba(54, 162, 235, 0.7)" },
          },
          {
          x: labels,
          y: explained,
          type: "scatter",
          mode: "lines+markers",
          name: "Cumulative %",
          line: { color: "rgba(255, 99, 132, 0.8)" },
          },
        ];
      },

      variance(arr) {
        const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
        return arr.reduce((a, b) => a + (b - mean) ** 2, 0) / (arr.length - 1);
      },

      getOldLayout() {
        return {
        title: { text: this.title, x: 0.05 },
        modebar: settings.modebar,
        margin: { t: 40, r: 50, b: 50, l: 60 },
        xaxis: { title: "Principal Components" },
        yaxis: {
        title: "% Variance Explained",
        range: [0, 100],
        },
        legend: { orientation: "h", x: 0.2, y: 1.1 },
        };
      },

      getLayout() {
        return {
          title: {
            text: this.title,
            x: 0.05,
          },
          modebar: settings.modebar,
          margin: { t: 60, r: 50, b: 50, l: 60 },
          xaxis: {
            title: { text:"Principal Components" },
            showline: true,
            zeroline: false,
          },
          yaxis: {
            title: { text: "% Variance Explained"},
            range: [0, 100],
            showline: true,
            zeroline: false,
          }
        };
      },

      toJson(tsv) {
        const result = Papa.parse(tsv, { delimiter: "\t", header: true, skipEmptyLines: true });
        return result.data; 
      },

      joinTables(data, meta) {
        const dataMap = new Map(data.map(row => [row['Sample'], row]));
        const metaMap = new Map(meta.map(row => [row['sample_id'], row]));
        const keys = new Set([
          ...data.map(row => row['Sample']),
          ...meta.map(row => row['sample_id'])
        ]);
        return Array.from(keys).map(key => {
          const dataRows = dataMap.get(key) || null;
          const metaRows = metaMap.get(key) || null ;
            return { ...dataRows, ...metaRows }
          });
      }
    },
  };
</script>