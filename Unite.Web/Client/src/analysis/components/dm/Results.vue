<template>
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
</template>

<script>
import UPlotly from "@/visualization/_shared/Plotly.vue";
import settings from "@/visualization/_shared/settings";
import { colors } from "quasar";
import * as Papa from "papaparse";

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

  methods: 
  {
    async init() {
      const parsedData = await this.getParsedData(this.data);
      const maxLogFcValue = Math.max(...parsedData.map(row => parseFloat(row.logFc)).filter(value => !isNaN(value)))
      const maxAdjPValValue = Math.max(...parsedData.map(row => parseFloat(row.adjPVal)).filter(value => !isNaN(value) && value !=Infinity));
      const minLogFc = Math.min(...parsedData.map(row => parseFloat(row.logFc)).filter(value => !isNaN(value)))
      this.traces = this.getTraces(parsedData);
      this.layout = this.getLayout(maxLogFcValue, maxAdjPValValue, minLogFc);
    },
    async getParsedData(data) 
    {
      this.loading = true;
      const start = performance.now();
      const compressedData = data.stream();
      const decompressedData = compressedData.pipeThrough(new DecompressionStream('gzip'));
      const tsv = await new Response(decompressedData).text();
      const json = this.toJson(tsv);
      const rows = [];
      for (let i = 0; i < json.length; i++) {
        const row = json[i];
        const adjPValRow = row["adj.P.Val"]; 
        const adjPVal =  -Math.log10(adjPValRow);
        const logFc = row["logFc"];
        const count = row["Count"];
        const enchancerColumns = Object.keys(json[0]).filter(col => col.toLowerCase().includes("enhancer"));

        rows.push({
          adjPVal,
          logFc,
          count: count,
          cpgId: row["CpgId"],
          gene: row["UCSC_RefGene_Name"],
          regulatory: row["Regulatory_Feature_Name"],
          enchancer: enchancerColumns.map(col => `${col}: ${row[col]}`).join("<br>"),
        });
      }
      this.loading = false;

      return rows;
    },

    getTraces(data) 
    {
      const pointsData = {
        name: "pointsData",
        type: "scattergl",
        mode: "markers",
        x: data.map(row => row.logFc),
        y: data.map(row => row.adjPVal),
        text: data.map(row =>
    `logFC: ${row.logFc}<br>-log10(adj.P.Val): ${row.adjPVal}<br>Count: ${row.count}<br>CpgId: ${row.cpgId}<br>Gene: ${row.gene}<br>Regulatory: ${row.regulatory}<br>Enhancer: ${row.enhancer}`
  ),

        marker: {
          size: 7,
          opacity: 0.7,
          color: data.map(row => Math.log10(parseFloat(row.count) || 1)),
          colorscale: [
            [0.0, 'white'],
            [0.2, 'lightblue'],
            [0.4, 'lightgreen'],
            [0.6, 'yellow'],
            [1.0, 'red']
          ],
          colorbar: {
            title: 'Log10(Density)',
          }
        },
      };
      for (let i = 0; i < data.length; i++) {
        const row = data[i];
        const adjPVal = row.adjPVal;
        const logFC = row.logFC;
        const count = row.count;
        const cpgId = row.cpgId;

        pointsData.x.push(logFC);
        pointsData.y.push(adjPVal);
      }
      const traces = [];
      traces.push(pointsData);
      return traces;
    },

    getLayout(maxLogFcValue, maxAdjPValValue, minLogFc) {
      return {
        title: { text: this.title + " (Density is meassured from 0 to the maximum value of count)"},
        xaxis: { title: { text: "logFC" }, range: [minLogFc,maxLogFcValue+2], showline:  true, zeroline: false,text: "logFC"},
        yaxis: { title: { text: "-log10(adj.P.Val)"} , range: [0, maxAdjPValValue], showline:  true, zeroline: false, text: "-log10(adj.P.Val)"},
      };
    },
    toJson(tsv) 
    {
      const parsedData = Papa.parse(tsv, {
      delimiter: "\t", 
      header: true,   
      skipEmptyLines: true, 
      });
      return parsedData.data; 
    }
  },
};
</script>