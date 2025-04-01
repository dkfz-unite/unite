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
      concentration: colors.getPaletteColor("grey"),
      inhibitionError: colors.getPaletteColor("grey-10"),
    };

    return {
      plotColors
    }
  },

  watch: {
    async screening(value) {
      await this.plot(value);
    }
  },

  async mounted() {
    await this.plot(this.screening);
  },

  methods: {
    getInhibitionLineTrace(screening) {
      const trace = {
        name: "Inhibition",
        type: "scatter",
        mode: "lines",
        x: screening.doses,
        y: screening.responses,
        hovertemplate: "%{y} \% at %{x} nM",
        line: { 
          color: this.plotColors.inhibition, 
          width: 4,
          shape: "spline"
        }
      };

      return trace;
    },

    getInhibitionPointsTrace(screening) {
      var map = screening.doses
        .map((value, index) => { return { value, index } })
        .sort((a, b) => a.value - b.value);

      // Why do I do this?
      // var concentrations1 = [];
      // var concentrations2 = [];
      // var inhibitions1 = [];
      // var inhibitions2 = [];

      // for (var i = 0; i < map.length; i += 2) {
      //   var value1 = screening.inhibition[map[i].index];
      //   var value2 = screening.inhibition[map[i+1].index];

      //   if (value1 >= value2) {
      //     concentrations1.push(map[i].value);
      //     concentrations2.push(map[i+1].value);
      //     inhibitions1.push(value1);
      //     inhibitions2.push(value2);
      //   } else {
      //     concentrations2.push(map[i].value);
      //     concentrations1.push(map[i+1].value);
      //     inhibitions2.push(value1);
      //     inhibitions1.push(value2);
      //   }
      // }

      // var concentrations = [...concentrations1, ...concentrations2.reverse()];
      // var inhibitions = [...inhibitions1, ...inhibitions2.reverse()];

      let concentrations = screening.doses;
      let inhibitions = screening.responses;

      const trace = {
        name: "Inhibition",
        type: "scatter",
        mode: "markers",
        x: concentrations,
        y: inhibitions,
        hovertemplate: "%{y} \% at %{x} nM",
        marker: { 
          color: this.plotColors.inhibitionError, 
          size: 2
        }
      };

      return trace;
    },

    getInhibition50Trace(dose50) {
      const trace = {
        name: "50% Inhibition",
        type: "scatter",
        mode: "lines+markers",
        x: [dose50, dose50, dose50, dose50],
        y: [-1, 0, 0.5, 2],
        hovertemplate: "%{x} nM",
        line: {
          color: this.plotColors.concentration,
          width: 2,
          shape: "linear",
          dash: "dot"
        }
      };

      return trace;
    },

    async plot(screening) {
      const data = [];

      // Inhibition line
      // if (screening.concentrationLine?.length && screening.inhibitionLine.length) {
        data.push(this.getInhibitionLineTrace(screening));
      // }

      // Inhibition Points
      if (screening.doses?.length && screening.responses?.length) {
        data.push(this.getInhibitionPointsTrace(screening));
      }

      // Concentration at 50% inhibition
      var doseMin = Math.min(...screening.doses);
      var doseMax = Math.max(...screening.doses);
      var dose50 = screening.dose50;

      if (doseMin < dose50 && dose50 < doseMax) {
        data.push(this.getInhibition50Trace(dose50));
      }

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
          title: "Inhibition (%)",
          showline: true,
          range: [-0.5, 1.5]
        }
      };

      const config = {
        displayModeBar: true,
        displaylogo: false,
        responsive: true
      };

      await Plotly.newPlot(this.id, data, layout, config);
    }
  }
}
</script>
