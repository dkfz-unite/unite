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
      clickedTraceIndex: null,
      clickedMarkerIndex: null,
      plotColors: {
        normal: colors.getPaletteColor("orange-6"),
        clicked: colors.getPaletteColor("orange-3")
      }
    }
  },

  computed: {
    drugs() { return this.screenings.sort((a,b) => b.dss - a.dss) },
    drugNames() { return this.drugs.map(screening => screening.drug) },
    drugScores() { return this.drugs.map(screening => screening.dss) },
    colors() { return this.drugs.map(screening => this.plotColors.normal) }
  },

  async mounted() {
    var dssTrace = {
      type: "bar",
      x: this.drugNames,
      y: this.drugScores,
      marker: {
        color: this.plotColors.normal,
      }
    };

    var data = [dssTrace];

    var layout = {
      margin: { t: 20, r: 10, b: 110, l: 40 },
      modebar: {
        remove: ["lasso", "select", "zoomin", "zoomout", "autoscale"]
      },
      xaxis: {
        // title: "Drug",
        showline: false,
        tickfont: {
          size: this.drugs.length > 50 ? 9 : 12,
        }
      },
      yaxis: {
        title: "DSS",
        showline: true
      }
    };

    var config = {
      displayModeBar: true,
      displaylogo: false,
      responsive: true,
    };
    
    var plot = await Plotly.newPlot(this.id, data, layout, config);
    plot.on("plotly_click", this.onClick);
  },

  methods: {
    onClick(event) {
      const target = event.target;
      const data = this.getTargetBarData(event);
      this.highlightTargetBar(event, this.plotColors.clicked);
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
      return drugs.map(screening => this.plotColors.normal);
    }
  }
}
</script>