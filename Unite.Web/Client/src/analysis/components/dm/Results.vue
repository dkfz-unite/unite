<template>
   <div class="row">
    <div class="col">
      <u-plotly
        :id="id"
        :data="traces" 
        :layout="layout" 
        :config="config" 
      />
    </div>
  </div>
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

      this.traces = this.getTraces(parsedData);
      console.log("Updated Traces Length:", this.traces.length);

      this.layout = this.getLayout();

      console.log("Updated Layout:", this.layout);
    },

    async getParsedData(data) 
    {
      const compressedData = data.stream();
      const decompressedData = compressedData.pipeThrough(new DecompressionStream('gzip'));
      const text = await new Response(decompressedData).text();
      const lines = text.trim().split("\n");
      const headers = lines[0].split(",");
      const jsonData = lines.slice(1).map(line => {
        const values = line.split(",");
        return headers.reduce((obj, header, i) => {
          obj[header.trim()] = values[i].trim();
          return obj;
        }, {});
      });

      const resultData = jsonData
        .map((row, index) => {

        const cleanedRow = Object.fromEntries(Object.entries(row).map(([key, value]) => [key.replace(/"/g, ""), value]));

        const adjPValRaw = parseFloat(cleanedRow["adj.P.Val"])

        const logFC = parseFloat(cleanedRow["logFC"])
          
        const adjPVal = Math.max(adjPValRaw, 1e-300);
        const negLog10P = -Math.log10(adjPVal);
        const cpgId = cleanedRow["CpgId"];
        const gene = cleanedRow["UCSC_RefGene_Name"];
        const regulatory = cleanedRow["Regulatory_Feature_Name"];
        const enchancerColumns = Object.keys(cleanedRow).filter(col => col.toLowerCase().includes("enhancer"));
        var enchancer = "";
        for (const col of enchancerColumns) {
          enchancer += `${col}: ${cleanedRow[col]}<br>`;
        }

        return {
          logFC,
          adjPVal,
          negLog10P,
          cpgId,
          gene,
          regulatory,
          enchancer,
          color:
            adjPValRaw < 0.05 && logFC > 1
            ? colors.getPaletteColor("blue")
            : adjPValRaw < 0.01 && logFC < 1
            ? colors.getPaletteColor("red")
            : colors.getPaletteColor("grey"),
          category:
            adjPValRaw < 0.05 && logFC > 1
            ? "Upmethylated"
            : adjPValRaw < 0.05 && logFC < 1
            ? "Downmethylated"
            : "Insignificant",
          };
        }).filter((row) => row !== null);
      return resultData;
    },

    getTraces(data) 
    {
      const upmethylated = {
      x: [],
      y: [],
      text: [],
      marker: { color: colors.getPaletteColor("blue") },
      };
      
      const downmethylated = {
      x: [],
      y: [],
      text: [],
      marker: { color: colors.getPaletteColor("red") },
      };

      const insignificant = {
      x: [],
      y: [],
      text: [],
      marker: { color: colors.getPaletteColor("grey") },
      };

      data.forEach((d) => {

        const annotationDetails = `Category: ${d.category}<br>CpG: ${d.cpgId}<br>Gene: ${d.gene}<br>Regulator: ${d.regulatory}<br>${d.enchancer}`;

        if (d.adjPVal < 0.05) {
          if (d.logFC > 0) {
            upmethylated.x.push(d.logFC);
            upmethylated.y.push(d.negLog10P);
            upmethylated.text.push(annotationDetails);
          } 
          else {
          downmethylated.x.push(d.logFC);
          downmethylated.y.push(d.negLog10P);
          downmethylated.text.push(annotationDetails);
          }
        } 
        else {
          insignificant.x.push(d.logFC);
          insignificant.y.push(d.negLog10P);
          insignificant.text.push(annotationDetails);
        }
      });

      const traces = [];

      if (upmethylated.x.length > 0) {
        traces.push({
        name: "Upmethylated",
        type: "scatter",
        mode: "markers",
        x: upmethylated.x,
        y: upmethylated.y,
        text: upmethylated.text,
        marker: {
          color: colors.getPaletteColor("blue"),
          size: 5,
          opacity: 0.7,
          },
        });
      }

      if (downmethylated.x.length > 0) {
        traces.push({
        name: "Downmethylated",
        type: "scatter",
        mode: "markers",
        x: downmethylated.x,
        y: downmethylated.y,
        text: downmethylated.text,
        marker: {
          color: colors.getPaletteColor("red"),
          size: 5,
          opacity: 0.7,
          },
        });
      }

      if (insignificant.x.length > 0) {
        traces.push({
        name: "Insignificant",
        type: "scatter",
        mode: "markers",
        x: insignificant.x,
        y: insignificant.y,
        text: insignificant.text,
        marker: {
          color: colors.getPaletteColor("grey"),
          size: 5,
          opacity: 0.7,
          },
        });
      }
      return traces;
    },

    getLayout() 
    {
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
          title: "log2 Fold Change",
          showline: true,
          zeroline: false,
          range: [-15, 15],
        },
        yaxis: {
          title: "-log10(Adjusted P-value)",
          showline: true,
          zeroline: false,
          range: [0, 4],
        },
        shapes: [
          {
            type: "line",
            x0: -15,
            x1: 15,
            y0: 1,
            y1: 1,
            line: { dash: "dashdot", color: colors.getPaletteColor("black") },
          },
          {
            type: "line",
            x0: -1,
            x1: -1,
            y0: 0,
            y1: 4,
            line: { dash: "dashdot", color: colors.getPaletteColor("black") },
          },
          {
            type: "line",
            x0: 1,
            x1: 1,
            y0: 0,
            y1: 4,
            line: { dash: "dashdot", color: colors.getPaletteColor("black") },
          },
        ],
      };
    },
  },
};
</script>