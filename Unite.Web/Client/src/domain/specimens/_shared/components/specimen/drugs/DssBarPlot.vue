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

  // emits: ["hover", "unhover"],

  setup(props) {
    const barColors = {
        normalPositive: colors.getPaletteColor("orange")
    };

    return {
        barColors
    }
  },

  computed: {
    drugs() { return this.screenings.sort((a,b) => b.dss - a.dss) },
    drugNames() { return this.drugs.map(screening => screening.drug) },
    drugScores() { return this.drugs.map(screening => screening.dss) }
  },

  async mounted() {
    var dssTrace = {
      type: "bar",
      x: this.drugNames,
      y: this.drugScores,
      marker: {
        color: this.barColors.normalPositive,
      }
    };

    var layout = {
      margin: { t:15, r: 10, b: 110, l: 20 },
      modebar: {
        remove: ["lasso", "select", "zoomin", "zoomout", "autoscale"]
      },
      xaxis: {
        tickfont: {
          // size: 10,
        }}
    };

    var config = {
      displayModeBar: true,
      displaylogo: false,
      responsive: true,
    };
    
    var plot = await Plotly.newPlot(this.id, [dssTrace], layout, config);
    // plot.on("plotly_hover", this.onHover);
    // plot.on("plotly_unhover", this.onUnhover);
  },

  methods: {
    onHover(event) {
      let drug = event.points[0].label;
      let screening = this.drugs.find(screening => screening.drug == drug);
      this.$emit("hover", screening);
    },

    onUnhover(event) {
      this.$emit("unhover");
    }
  }
}
</script>