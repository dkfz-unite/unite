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
    screening: {
      type: Object,
      required: true
    }
  },

  setup(props) {
    const plotColors = {
      inhibition: colors.getPaletteColor("blue"),
      concentration: colors.getPaletteColor("grey")
    };

    return {
      plotColors
    }
  },

  computed: {
    inhibitions() {
      return this.screening.inhibitionsSample;
    },

    concentrations() { 
      return [
        this.screening.minConcentration,
        this.screening.minConcentration * Math.pow(10, 1),
        this.screening.minConcentration * Math.pow(10, 2),
        this.screening.minConcentration * Math.pow(10, 3),
        this.screening.minConcentration * Math.pow(10, 4),
      ];
    }
  },

  async mounted() {
    const inhibitionTrace = {
      name: "Inhibition",
      x: this.concentrations,
      y: this.inhibitions,
      mode: "lines+markers",
      hoverinfo: "y+name",
      line: { 
        color: this.plotColors.inhibition, 
        width: 3,
        shape: "spline"
      },
      marker: {
        color: this.plotColors.inhibition,
        size: 8 
      },
      type: "scatter"
    };

    const concentrationTrace = {
      name: "50%",
      x: [this.screening.absIC50, this.screening.absIC50],
      y: [-45, 145],
      mode: "lines",
      hoverinfo: "x+name",
      line: {
        color: this.plotColors.concentration,
        width: 2,
        shape: "line",
        dash: "dot",
        type: "scatter"
      }
    };

    const data = [inhibitionTrace, concentrationTrace];

    const layout = {
      margin: { t: 30, r: 15, b: 35, l: 40 },
      showlegend: false,
      modebar: {
        remove: ["lasso", "select", "zoomin", "zoomout", "autoscale"]
      },
      xaxis: {
        title: "Concentration (nM)",
        type: "log",
        showline: true
      },
      yaxis: {
        title: "% Inhibition",
        showline: true,
        range: [-50, 150]
      }
    };

    const config = {
      displayModeBar: true,
      displaylogo: false,
      responsive: true
    };

    const plot = await Plotly.newPlot(this.id, data, layout, config);
  }
}
</script>