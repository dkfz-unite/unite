<template>
  <u-plotly 
    id="deseq2"
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
    title: {
      type: String,
      required: true
    },
    data: {
      required: true
    }
  },

  data() {
    return {
      traces: null,
      layout: null,
      config: null
    }
  },

  watch: {
    data(value) {
      if (!value) return;
      const data = this.parseData(value);
      this.traces = this.getTraces(data);
      this.layout = this.getLayout(data);
      this.config = { responsive: true };
    }
  },

  mounted() {
    if (!this.data) return;
    const data = this.parseData(this.data);
    this.traces = this.getTraces(data);
    this.layout = this.getLayout(data);
    this.config = { responsive: true };
  },

  methods: {
    onClick(event) {
      const point = event.points[0];
      this.$router.push({
        name: "gene",
        params: {
          id: point.customdata.id
        }
      });
    },

    getTraces(data) {
      return [
        {
          name: "Upregulated",
          type: "scattergl",
          mode: "markers",
          x: data.upregulated.map(row => row.log2),
          y: data.upregulated.map(row => -Math.log10(row.padj)),
          customdata: data.upregulated.map(row => ({id: row.internalId})),
          hoverinfo: "text",
          hovertext: this.getTooltipData(data.upregulated, "Upregulated"),
          hoverlabel: this.getTooltipStyle(colors.getPaletteColor("red")),
          marker: {
            color: colors.getPaletteColor("red")
          }
        },
        {
          name: "Downregulated",
          type: "scattergl",
          mode: "markers",
          x: data.downregulated.map(row => row.log2),
          y: data.downregulated.map(row => -Math.log10(row.padj)),
          customdata: data.downregulated.map(row => ({id: row.internalId})),
          hoverinfo: "text",
          hovertext: this.getTooltipData(data.downregulated, "Downregulated"),
          hoverlabel: this.getTooltipStyle(colors.getPaletteColor("blue")),
          marker: {
            color: colors.getPaletteColor("blue")
          }
        },
        {
          name: "Insignificant",
          type: "scattergl",
          mode: "markers",
          x: data.insignificant.map(row => row.log2),
          y: data.insignificant.map(row => -Math.log10(row.padj)),
          customdata: data.insignificant.map(row => ({id: row.internalId})),
          hoverinfo: "text",
          hovertext: this.getTooltipData(data.insignificant, "Insignificant"),
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

    parseData(data) {
      const lines = data.split("\n");
      const rows = [];
      for (let i = 1; i < lines.length; i++) {
        const blocks = lines[i].split("\t");
        rows.push( {
          internalId: blocks[0],
          externalId: blocks[1],
          symbol: blocks[2],
          log2: +blocks[3],
          padj: +blocks[4]
        });
      }

      const all = rows;
      const significant = rows.filter(row => row.padj <= 0.05);
      const insignificant = rows.filter(row => row.padj > 0.05);
      const upregulated = significant.filter(row => row.log2 > 0);
      const downregulated = significant.filter(row => row.log2 < 0);

      return {
        all,
        significant,
        insignificant,
        upregulated,
        downregulated
      }
    },

    getTooltipData(items, title) {
      return items.map(row => 
        `Gene: ${row.symbol}<br>` +
        `Log2 Fold Change: ${row.log2}<br>` +
        `Adjusted P-Value: ${row.padj}<br>` +
        `Consequence: ${title}`);
    },

    getTooltipStyle(color) {
      return {
        bgcolor: colors.getPaletteColor("white"),
        bordercolor: color,
        font: { color: colors.getPaletteColor("black") }
      };
    }
  }
}
</script>