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
    getDrugResponseTrace(screening) {
      const trace = {
        name: "Inhibition",
        type: "scatter",
        mode: "lines",
        x: screening.dose,
        y: screening.response,
        hovertemplate: "%{y} \% at %{x} nM",
        line: { 
          color: this.plotColors.inhibition, 
          width: 4,
          shape: "spline"
        }
      };

      return trace;
    },

    getDrugInhibitionTrace(screening) {
      var map = screening.concentration
        .map((value, index) => { return { value, index } })
        .sort((a, b) => a.value - b.value);

      var concentrations1 = [];
      var concentrations2 = [];
      var inhibitions1 = [];
      var inhibitions2 = [];

      for (var i = 0; i < map.length; i+=2) {
        var value1 = screening.inhibition[map[i].index];
        var value2 = screening.inhibition[map[i+1].index];

        if (value1 >= value2) {
          concentrations1.push(map[i].value);
          concentrations2.push(map[i+1].value);
          inhibitions1.push(value1);
          inhibitions2.push(value2);
        } else {
          concentrations2.push(map[i].value);
          concentrations1.push(map[i+1].value);
          inhibitions2.push(value1);
          inhibitions1.push(value2);
        }
      }

      var concentrations = [...concentrations1, ...concentrations2.reverse()];
      var inhibitions = [...inhibitions1, ...inhibitions2.reverse()];

      const trace = {
        name: "Inhibition",
        type: "scatter",
        mode: "markers",
        x: concentrations,
        y: inhibitions,
        hovertemplate: "%{y} \% at %{x} nM",
        // fill: "tozerox",
        // fillcolor: "rgba(0,100,80,0.2)",
        // line: { shape: "spline" },
        marker: { 
          color: this.plotColors.inhibitionError, 
          size: 6 
        }
      };

      return trace;
    },

    getDrugConcentration50Trace(dose50) {
      const trace = {
        name: "50% Inhibition",
        type: "scatter",
        mode: "lines+markers",
        x: [dose50, dose50, dose50, dose50, dose50],
        y: [-45, 0, 50, 100, 145],
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

      // Drug response
      if (screening.dose?.length && screening.response.length) {
        data.push(this.getDrugResponseTrace(screening));
      }

      // Drug inhibition
      if (screening.inhibition?.length && screening.concentration?.length) {
        data.push(this.getDrugInhibitionTrace(screening));
      }

      // Concentration at 50% inhibition
      var doseMin = Math.min(...screening.dose);
      var doseMax = Math.max(...screening.dose);
      var dose50 = screening.absIC50;

      if (doseMin < dose50 && dose50 < doseMax) {
        data.push(this.getDrugConcentration50Trace(dose50));
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
          range: [-50, 150]
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
