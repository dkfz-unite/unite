<template>
  <u-plotly
    :id="id"
    :data="traces"
    :layout="layout"
    :config="config"
    @click="onClick"
  />
</template>

<script>
import UPlotly from "@/visualization/_shared/Plotly.vue";
import settings from "@/visualization/_shared/settings";
import { colors } from "quasar";

export default {
  components: {
    UPlotly
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
      required: true
    },
    meta: {
      required: true
    }
  },

  data() {
    return {
      values: null,
      annotations: null,
      traces: null,
      layout: null,
      config: null
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
      this.annotations = await this.parseMeta(this.meta);
      this.values = await this.parseData(this.data);
      this.traces = this.getTraces(this.values);
      this.layout = this.getLayout(this.values);
      this.config = { responsive: true };
    },

    async parseMeta(blob) {
      const tsv = await blob.text();
      const rows = tsv.split("\n");
      const values = new Map();

      for (let i = 1; i < rows.length; i++) {
        const columns = rows[i].split("\t");

        values.set(columns[0], {
          id: columns[0],
          stableId: columns[0],
          accessionId: columns[1],
          symbol: columns[2],
          description: columns[3],
          source: columns[4]
        });
      }

      return values;
    },

    async parseData(blob) {
      const tsv = await blob.text();
      const rows = tsv.split("\n");
      const values = [];

      for (let i = 1; i < rows.length; i++) {
        const columns = rows[i].split("\t");

        values.push({
          id: columns[0],
          log2: +columns[1],
          padj: +columns[4]
        });
      }

      const all = values;
      const significant = values.filter(value => value.padj <= 0.05);
      const insignificant = values.filter(value => value.padj > 0.05);
      const upregulated = significant.filter(value => value.log2 > 0);
      const downregulated = significant.filter(value => value.log2 < 0);

      return {
        all,
        significant,
        insignificant,
        upregulated,
        downregulated
      }
    },

    getTraces(values) {
      return [
        {
          name: "Upregulated",
          type: "scattergl",
          mode: "markers",
          x: values.upregulated.map(row => row.log2),
          y: values.upregulated.map(row => -Math.log10(row.padj)),
          customdata: values.upregulated.map(row => ({id: row.id})),
          hoverinfo: "text",
          hovertext: this.getTooltipData(values.upregulated, "Upregulated"),
          hoverlabel: this.getTooltipStyle(colors.getPaletteColor("red")),
          marker: {
            color: colors.getPaletteColor("red")
          }
        },
        {
          name: "Downregulated",
          type: "scattergl",
          mode: "markers",
          x: values.downregulated.map(row => row.log2),
          y: values.downregulated.map(row => -Math.log10(row.padj)),
          customdata: values.downregulated.map(row => ({id: row.id})),
          hoverinfo: "text",
          hovertext: this.getTooltipData(values.downregulated, "Downregulated"),
          hoverlabel: this.getTooltipStyle(colors.getPaletteColor("blue")),
          marker: {
            color: colors.getPaletteColor("blue")
          }
        },
        {
          name: "Insignificant",
          type: "scattergl",
          mode: "markers",
          x: values.insignificant.map(row => row.log2),
          y: values.insignificant.map(row => -Math.log10(row.padj)),
          customdata: values.insignificant.map(row => ({id: row.id})),
          hoverinfo: "text",
          hovertext: this.getTooltipData(values.insignificant, "Insignificant"),
          hoverlabel: this.getTooltipStyle(colors.getPaletteColor("grey-5")),
          marker: {
            color: colors.getPaletteColor("grey-5")
          }
        }
      ];
    },

    getLayout(data) {
      const log2s = data.all.map(row => row.log2);
      let minlog2 = log2s[0];
      let maxlog2 = log2s[0];

      for (let i = 1; i < log2s.length; i++) {
        if (log2s[i] < minlog2) minlog2 = log2s[i];
        if (log2s[i] > maxlog2) maxlog2 = log2s[i];
      }

      const log2range = Math.max(Math.abs(minlog2), Math.abs(maxlog2));

      return {
        title: {
          text: this.title,
          x: 0.03,
        },
        modebar: settings.modebar,
        margin: {
          t: 40,
          r: 50,
          b: 40,
          l: 50
        },
        showlegend: true,
        xaxis: {
          title: {
            text: "Log2 Fold Change",
            standoff: 0
          },
          range: [-log2range - 0.5, log2range + 0.5],
          showline: false,
        },
        yaxis: {
          title: {
            text: "-log10(Adjusted P-Value)",
            standoff: 0
          },
          showline: true,
          minallowed: 0
        }
      };
    },

    getTooltipData(entries, title) {
      return entries.map(entry => 
        `Name: ${this.annotations.get(entry.id).symbol}<br>` +
        `Description: ${this.annotations.get(entry.id).description}<br>` +
        `Log2 Fold Change: ${Math.roundTo(entry.log2, 4)}<br>` +
        `Adjusted P-Value: ${Math.roundTo(entry.padj, 4)}<br>` +
        `Category: ${title}`);
    },

    getTooltipStyle(color) {
      return {
        bgcolor: colors.getPaletteColor("white"),
        bordercolor: color,
        font: { color: colors.getPaletteColor("black") }
      };
    },

    onClick(event) {
      // const point = event.points[0];
      // this.$router.push({
      //   name: "gene",
      //   params: {
      //     id: point.customdata.id
      //   }
      // });
    },
  }
}
</script>