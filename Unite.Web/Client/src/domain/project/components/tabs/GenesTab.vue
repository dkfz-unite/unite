<template>
  <div class="col q-gutter-sm">
    <div class="row">
      <span class="text-h5 u-text-title">Genes Statistics</span>
    </div>

    <!-- Bulk Exp -->
    <div v-if="showRna" class="row">
      <div class="col">
        <div class="row">
          <span class="text-h6 u-text-title">Bulk RNA</span>
        </div>
        <div class="row">
          <div class="col-2">
            <div id="exp-per-analysis" style="height: 300px;"></div>
          </div>
          <div class="col-6">
            <div id="exp-per-mutation" style="height: 300px;"></div>
          </div>
          <!-- <div class="col-6">
            <div id="exp-per-variation" style="height: 300px;"></div>
          </div> -->
        </div>
      </div>
    </div>

    <!--Bulk Variants -->
    <div v-if="showRna" class="row">
      <div class="col">
        <!-- <div class="row">
          <span class="text-h6 u-text-title">Variants</span>
        </div> -->
        <div class="row">
          <div class="col-6">
            <div id="exp-per-variation" style="height: 400px;"></div>
          </div>
          <!-- <div class="col-6">
            <div id="exp-per-mutation" style="height: 300px;"></div>
          </div> -->
        </div>
      </div>
    </div>

    <!-- Single Cell Exp -->
    <div v-if="showRnasc" class="row">
      <div class="col">
        <div class="row">
          <span class="text-h6 u-text-title">Single Cell RNA</span>
        </div>
        <div class="row">
          <div class="col-2">
            <div id="expsc-per-analysis" style="height: 300px;"></div>
          </div>
          <div class="col-2">
            <div id="expsc-per-cells" style="height: 300px;"></div>
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

  computed: {
    showRna() {
      return this.project.stats.rna.number > 0;
    },

    showRnasc() {
      return this.project.stats.rnasc.number > 0;
    }
  },

  mounted() {
    const config = {
      displayModeBar: false,
      displaylogo: false,
      responsive: true,
    };

    if (this.showRna) {
      const expPerAnalysis = this.getSeries(this.project.stats.rna.perAnalysis);
      const expPerAnalysisMode = Math.max(...expPerAnalysis[0].y) <= 5 ? "linear" : "auto";
      const expPerVariation = this.getSeriesBox(this.project.stats.rna.perVariation);
      const expPerMutation = this.getSeries(this.project.stats.rna.perMutation);
      const expPerMutationMode = Math.max(...expPerMutation[0].y) <= 5 ? "linear" : "auto";

      Plotly.newPlot("exp-per-analysis", expPerAnalysis, this.getLayout("Analysis Type", null, null, expPerAnalysisMode), config);
      Plotly.newPlot("exp-per-variation", expPerVariation, this.getLayoutLog("Most Variable Genes (highest CV)", null, "TPM"), config);
      Plotly.newPlot("exp-per-mutation", expPerMutation, this.getLayout("Most Mutated Genes", null, null, expPerMutationMode), config);
    }

    if (this.showRnasc) {
      const expscPerAnalysis = this.getSeries(this.project.stats.rnasc.perAnalysis);
      const expscPerCells = this.getSeries(this.project.stats.rnasc.perCells);

      Plotly.newPlot("expsc-per-analysis", expscPerAnalysis, this.getLayout("Analysis Type", null, null), config);
      Plotly.newPlot("expsc-per-cells", expscPerCells, this.getLayout("#Cells", null, null), config);
    }
  },

  methods: {
    getSeries(data, mapx = (row, index, array) => row.key, mapy = (row, index, array) => row.value) {
      return [{
        x: data.map(mapx),
        y: data.map(mapy),
        type: "bar",
        orientation: "v"
      }];
    },

    getSeriesRange(data, mapx = (row, index, array) => row.key, mapy = (row, index, array) => row.value) {      
      return [{
        x: data.map(mapx),
        y: data.map(mapy).map(v => v[1]),
        base: data.map(mapy).map(v => v[1] - v[0]),
        hovertemplate: '%{base} - %{y}<extra></extra>',
        type: "bar",
        orientation: "v"
      }];
    },

    getSeriesBox(data, mapx = (row, index, array) => row.key, mapy = (row, index, array) => row.value) {
      return [{
        x: data.map(mapx),
        lowerfence: data.map(mapy).map(v => v[0]),
        q1: data.map(mapy).map(v => v[1]),
        median: data.map(mapy).map(v => v[2]),
        q3: data.map(mapy).map(v => v[3]),
        upperfence: data.map(mapy).map(v => v[4]),
        mean: data.map(mapy).map(v => v[5]),
        sd: data.map(mapy).map(v => v[6]),
        type: "box",
        boxmean: true,
        boxpoints: false
      }];
    },

    getLayout(title, xtitle = null, ytitle = null, tickmode = "auto", margin = { t:50, r:50, b:55, l:50 }) {
      return {
        margin: margin,
        title: { text: title },
        dragmode: false,
        xaxis: {
          title: { text: xtitle },
          showline: false,
          tickfont: {
            size: 11
          }
        },
        yaxis: {
          title: { text: ytitle },
          showline: true,
          tickmode: tickmode,
          tickfont: {
            size: 11
          }
        }
      };
    },

    getLayoutLog(title, xtitle = null, ytitle = null, tickmode = "auto", margin = { t:50, r:50, b:55, l:50 }) {
      return {
        margin: margin,
        title: { text: title },
        dragmode: false,
        xaxis: {
          title: { text: xtitle },
          showline: true,
          tickfont: {
            size: 11
          }
        },
        yaxis: {
          title: { text: ytitle },
          showline: true,
          tickmode: tickmode,
          tickfont: {
            size: 11
          },
          type: "log"
        }
      };
    }
  }
}
</script>
