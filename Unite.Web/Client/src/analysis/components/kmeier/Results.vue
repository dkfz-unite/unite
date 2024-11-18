<template>
  <div class="row">
    <div class="col">
      <u-plotly
        id="kmeier"
        :data="traces" 
        :layout="layout" 
        :config="config" 
      />
    </div>
  </div>
  <div class="row q-pl-sm" v-if="meta.rank != null">
    <span class="q-gutter-x-sm">
      <span>&Chi;<sup>2</sup>: <b>{{ meta.rank.chi2 }}</b></span> 
      <span>P-Value: <b>{{ meta.rank.p }}</b></span>
    </span>
  </div>
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
      const tracks = [];

      for (const key in data.curves) {
        const curve = data.curves[key];
        
        tracks.push({
          name: key,
          type: "scatter",
          mode: "markers+lines",
          x: curve.time,
          y: curve.survival_prob,
          error_y: {
            array: curve.survival_prob.map((value, i) => Math.abs(value - curve.conf_int_upper[i])),
            arrayminus: curve.survival_prob.map((value, i) => Math.abs(value - curve.conf_int_lower[i])),
            visible: true,
            color: colors.getPaletteColor("grey-4"),
            thickness: 1,
            width: 2,
          },
          marker: {
            // color: colors.getPaletteColor("red-5"),
            size: 4
          },
          line: {
            // color: colors.getPaletteColor("red-5"),
            width: 1
          }
        });
      }

      return tracks;
    },

    getLayout(data) {
      const values = Object.keys(data.curves).map(key => data.curves[key].time);
      const minTime = values.reduce((acc, value) => Math.min(acc, ...value), 0);
      const maxTime = values.reduce((acc, value) => Math.max(acc, ...value), 0);

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
          zeroline: false,
          minallowed: 0
        },
        yaxis: {
          title: {
            text: "Probability (%)",
            standoff: 0
          },
          range: [0, 1.1],
          showline: true,
          zeroline: false,
          minallowed: 0
        }
      };
    },

    async getContent(blob) {
      const json = await blob.text();
      this.meta = JSON.parse(json);
    }
  }
}
</script>