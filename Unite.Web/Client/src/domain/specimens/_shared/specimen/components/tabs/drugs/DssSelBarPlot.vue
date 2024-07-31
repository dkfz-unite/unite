<template>
  <div :id="id"></div>
</template>

<script>
import Plotly from "plotly.js-dist-min";
import { colors } from "quasar";

export default {
  props: {
    id: {
      type: String,
      required: true
    },
    screenings: {
      type: Array,
      default: () => null
    }
  },

  emits: ["click"],

  data() {
    return {
      plotColors: {
        positiveNormal: colors.getPaletteColor("blue-6"),
        positiveClicked: colors.getPaletteColor("blue-3"),
        negativeNormal: colors.getPaletteColor("red-6"),
        negativeClicked: colors.getPaletteColor("red-3")
      }
    }
  },

  computed: {
    drugs() { return this.screenings.sort((a,b) => b.dssS - a.dssS) },
    drugNames() { return this.drugs.map(screening => screening.drug) },
    drugScores() { return this.drugs.map(screening => screening.dssS) },
    colors() { return this.getMarkerColors(this.drugs) }
  },

  async mounted() {
    var dssTrace = {
      type: "bar",
      x: this.drugNames,
      y: this.drugScores,
      marker: {
        color: this.colors
      }
    };

    var layout = {
      margin: { t: 20, r: 10, b: 110, l: 40 },
      modebar: {
        remove: ["lasso", "select", "zoomin", "zoomout", "autoscale"]
      },
      xaxis: {
        showline: true,
        tickfont: {
          size: this.drugs.length > 50 ? 9 : 12,
        }
      },
      yaxis: {
        title: "sDSS",
        showline: true
      }
    };

    var config = {
      displayModeBar: true,
      displaylogo: false,
      responsive: true,
    };
    
    var plot = await Plotly.newPlot(this.id, [dssTrace], layout, config);
    plot.on("plotly_click", this.onClick);
  },

  methods: {
    onClick(event) {
      const target = event.target;
      const data = this.getTargetBarData(event);
      const color = data.dssS > 0 ? this.plotColors.positiveClicked : this.plotColors.negativeClicked;
      this.highlightTargetBar(event, color);
      this.$emit("click", { target, data });
    },

    getTargetBarData(event) {
      const point = event.points[0];
      const label = point.label;

      return this.drugs.find(screening => screening.drug == label);
    },

    highlightTargetBar(event, color) {
      const point = event.points[0];
      const traceIndex = point.curveNumber;
      const markerIndex = point.pointNumber;

      var markerColors = this.getMarkerColors(this.drugs);
      markerColors[markerIndex] = color;

      var update = { marker: { color: markerColors }};
      Plotly.restyle(this.id, update, traceIndex);
    },

    getMarkerColors(drugs) {
      const positive = this.plotColors.positiveNormal;
      const negative = this.plotColors.negativeNormal;
      return drugs.map(screening => screening.dssS > 0 ? positive : negative );
    }
  }
}
</script>