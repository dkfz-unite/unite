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
      this.traces = this.getTraces(parsedData);
      this.layout = this.getLayout();
    },

    async getParsedData(data) 
    {
      this.loading = true;
      const start = performance.now();
      const compressedData = data.stream();
      const decompressedData = compressedData.pipeThrough(new DecompressionStream('gzip'));
      const tsv = await new Response(decompressedData).text();
      const json = this.toJson(tsv);
      
      const enchancerColumns = Object.keys(json[0]).filter(col => col.toLowerCase().includes("enhancer"));
      
      const rows = [];
      for (let i = 0; i < json.length; i++) {
        const row = json[i];
        const adjPValRaw = parseFloat(row["adj.P.Val"]);
        const adjPVal = Math.max(adjPValRaw, 1e-300);
        const logFC = parseFloat(row["logFC"]);

        rows.push({
          adjPValRaw: adjPValRaw,
          adjPVal: adjPVal,
          logFC: logFC,
          negLog10P: -Math.log10(adjPVal),
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
      const upmethylated = {
        name: "Upmethylated",
        type: "scattergl",
        mode: "markers",
        x: [],
        y: [],
        text: [],
        marker: {
          color: colors.getPaletteColor("blue"),
          size: 5,
          opacity: 0.7
        },
      };
      
      const downmethylated = {
        name: "Downmethylated",
        type: "scattergl",
        mode: "markers",
        x: [],
        y: [],
        text: [],
        marker: {
          color: colors.getPaletteColor("red"),
          size: 5,
          opacity: 0.7
        },
      };

      const insignificant = {
        name: "Insignificant",
        type: "scattergl",
        mode: "markers",
        x: [],
        y: [],
        text: [],
        marker: {
          color: colors.getPaletteColor("grey"),
          size: 5,
          opacity: 0.7
        },
      };

      for (let i = 0; i < data.length; i++) {
        const row = data[i];

        const category = row.adjPValRaw < 0.05 && row.logFC > 1 ? { key: "Upmethylated", value: 1 }
                       : row.adjPValRaw < 0.05 && row.logFC < -1 ? { key: "Downmethylated", value: -1 }
                       : { key: "Insignificant", value: 0 };

        const details = `Category: ${category.key}<br>CpG: ${row.cpgId}<br>Gene: ${row.gene}<br>Regulator: ${row.regulatory}<br>${row.enchancer}`;

        if (category.value == 1) {
          upmethylated.x.push(row.logFC);
          upmethylated.y.push(row.negLog10P);
          upmethylated.text.push(details);
        } else if (category.value == -1) {
          downmethylated.x.push(row.logFC);
          downmethylated.y.push(row.negLog10P);
          downmethylated.text.push(details);
        } else {
          insignificant.x.push(row.logFC);
          insignificant.y.push(row.negLog10P);
          insignificant.text.push(details);
        }
      }

      const traces = [];

      if (upmethylated.x.length > 0)
        traces.push(upmethylated);

      if (downmethylated.x.length > 0)
        traces.push(downmethylated);

      if (insignificant.x.length > 0)
        traces.push(insignificant);

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
