<template>
  <div class="col q-gutter-sm">
    <div class="row">
      <span class="text-h5 u-text-title">Donors Statistics</span>
    </div>

    <!-- Donors -->
    <div class="row">
      <div class="col">
        <div class="row">
          <span class="text-h6 u-text-title">General</span>
        </div>
        <div class="row">
          <div class="col-2">
            <div id="don-per-age" style="height: 300px;"></div>
          </div>
          <div class="col-2">
            <div id="don-per-gender" style="height: 300px;"></div>
          </div>
          <div class="col-2">
            <div id="don-per-vital" style="height: 300px;"></div>
          </div>
          <div class="col-2">
            <div id="don-per-prog" style="height: 300px;"></div>
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
    
    const donPerAge = this.getSeries(this.project.stats.donors.perAge);
    const donPerAgeMode = Math.max(...donPerAge[0].y) <= 5 ? "linear" : "auto";
    const donPerGender = this.getSeries(this.project.stats.donors.perGender);
    const donPerGenderMode = Math.max(...donPerGender[0].y) <= 5 ? "linear" : "auto";
    const donPerVital = this.getSeries(this.project.stats.donors.perVitalStatus);
    const donPerVitalMode = Math.max(...donPerVital[0].y) <= 5 ? "linear" : "auto";
    const donPerProg = this.getSeries(this.project.stats.donors.perProgressionStatus);
    const donPerProgMode = Math.max(...donPerProg[0].y) <= 5 ? "linear" : "auto";

    Plotly.newPlot("don-per-age", donPerAge, this.getLayout("Age", null, null, donPerAgeMode), config);
    Plotly.newPlot("don-per-gender", donPerGender, this.getLayout("Sex", null, null, donPerGenderMode), config);
    Plotly.newPlot("don-per-vital", donPerVital, this.getLayout("Vital Status", null, null, donPerVitalMode), config);
    Plotly.newPlot("don-per-prog", donPerProg, this.getLayout("Progression Status", null, null, donPerProgMode), config);
  },

  methods: {
    getSeries(data, mapx = (value) => value, mapy = (value) => value) {
      return [{
        x: Object.keys(data).map(mapx),
        y: Object.values(data).map(mapy),
        type: "bar",
        orientation: "v"
      }];
    },

    getLayout(title, xtitle = null, ytitle = null, tickmode = "auto", margin = { t:50, r:50, b:55, l:50 }) {
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
