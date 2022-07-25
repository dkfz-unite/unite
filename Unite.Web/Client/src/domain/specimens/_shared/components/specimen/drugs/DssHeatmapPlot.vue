<template>
  <div class="col">
    <div class="row justify-center">
      DSS Heatmap
    </div>
    <div class="row">
      <div class="col">
        <q-card>
          <div id="heatmap-plot" :style="heatmapStyle"></div>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import Plotly from "plotly.js-dist-min";
import { colors } from "quasar";

export default {
  props: {
    screenings: {
      type: Array,
      default: () => null
    }
  },

  computed:{
    drugsNames() {
      return this.screenings
        .sort((a,b) => a.dss - b.dss)
        .map(screening => screening.drug);
    },

    drugScores() {
      return this.screenings
        .sort((a,b) => a.dss - b.dss)
        .map(screening => [screening.dss]);
    },

    heatmapStyle() {
      return {
        height: `${this.screenings.length * 20}px`
      }
    }
  },

  mounted() {
    var data = [{
      x: ["Asymmetric DSS"],
      y: this.drugsNames,
      z: this.drugScores,
      type: 'heatmap',
      hoverinfo: "z", // ["y", "z"],
      colorscale: [
        [ 0, colors.getPaletteColor("blue-1")],
        [ 1, colors.getPaletteColor("blue-10")]
      ]
    }];

    var layout = {
      title: 'Drug Sensitivity Scores Heatmap',
      margin: { t: 35, r: 0, b: 35,l: 150 }
    };

    var config = {
      displayModeBar: true,
      displaylogo: false,
      responsive: true
    };
    
    Plotly.newPlot('heatmap-plot', data, layout, config);
  }
}
</script>