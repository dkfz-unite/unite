<template>
  <u-plotly
    id="kmeier"
    :data="traces" 
    :layout="layout" 
    :config="config" 
  />
</template>

<script>
import Papa from "papaparse";
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
      type: Object,
      required: true
    }
  },

  data() {
    return {
      meta: "",
      traces: null,
      layout: null,
      config: null
    }
  },

  async mounted() {
    await this.getContent(this.data);
    this.layout = this.getLayout(this.meta);
    this.traces = this.getTraces(this.meta);
  },

  methods: {
    getTraces(data) {
      return [
        {
          name: "Survival Probability",
          type: "scatter",
          mode: "markers+lines",
          x: data.map(row => row.time),
          y: data.map(row => row.survival_prob),
          error_y: {
            array: data.map(row => row.conf_int_upper - row.survival_prob),
            arrayminus: data.map(row => row.survival_prob - (row.survival_prob - row.conf_int_lower)),
            visible: true
          },
          marker: {
            color: colors.getPaletteColor("red"),
            size: 10
          }
        }
      ];
    },

    getLayout(data) {
      const minTime = Math.min(...data.map(row => row.time));
      const maxTime = Math.max(...data.map(row => row.time));

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
            text: "Time (Days)",
            standoff: 0
          },
          range: [minTime - 5, maxTime + 5],
          showline: true,
        },
        yaxis: {
          title: {
            text: "Probability (%)",
            standoff: 0
          },
          range: [0, 1],
          showline: true,
          minallowed: 0
        }
      };
    },

    async getContent(blob) {
      const tsv = await blob.text();
      const json = Papa.parse(tsv.trim(), { header: true });
      const meta = json.data.map(row => {
        return {
          time: parseInt(row.time),
          survival_prob: parseFloat(row.survival_prob).toFixed(2),
          conf_int_lower: parseFloat(row.conf_int_lower).toFixed(2),
          conf_int_upper: parseFloat(row.conf_int_upper).toFixed(2)
        };
      });
      this.meta = meta;
    }
  }
}
</script>