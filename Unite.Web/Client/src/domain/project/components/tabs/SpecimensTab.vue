<template>
  <div class="col q-gutter-sm">
    <div class="row">
      <span class="text-h5 u-text-title">Specimens Statistics</span>
    </div>

    <div class="row">
      <div class="col">
        <div class="row">
          <span class="text-h6 u-text-title">General</span>
        </div>
        <div class="row">
          <div class="col-2">
            <div id="spe-per-type" style="height: 300px;"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Plotly from "plotly.js-dist-min";

export default {
  components: {
  },

  props: {
    project: {
      type: Object,
      required: true
    }
  },

  mounted() {    
    const config = {
      displayModeBar: false,
      displaylogo: false,
      responsive: true,
    };
      
    const spePerType = this.getSeries(this.project.stats.specimens.perType);
    const spePerTypeMode = Math.max(...spePerType[0].y) <= 5 ? "linear" : "auto";

    Plotly.newPlot("spe-per-type", spePerType, this.getLayout("Type", null, null, spePerTypeMode), config);
  },

  methods: {
    getSeries(data) {
      return [{
        x: Object.keys(data),
        y: Object.values(data),
        type: "bar",
        orientation: "v"
      }];
    },

    getLayout(title, xtitle = null, ytitle = null, tickmode = "auto", margin = { t: 50, r: 50, b:55, l:50 }) {
      return {
        margin: margin,
        title: title,
        dragmode: false,
        xaxis: {
          title: xtitle,
          showline: false,
          tickfont: {
            size: 11
          }
        },
        yaxis: {
          title: ytitle,
          showline: true,
          tickmode: tickmode,
          tickfont: {
            size: 11
          }
        }
      };
    }
  }
}
</script>