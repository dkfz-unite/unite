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
            <div id="exp-per-variation" style="height: 300px;"></div>
          </div>
        </div>
      </div>
    </div>

    <!--Bulk Variants -->
    <div v-if="showRna" class="row">
      <div class="col">
        <div class="row">
          <span class="text-h6 u-text-title">Variants</span>
        </div>
        <div class="row">
          <div class="col-6">
            <div id="exp-per-mutation" style="height: 300px;"></div>
          </div>
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
      const expPerVariation = this.getSeriesRange(this.project.stats.rna.perVariation);
      const expPerMutation = this.getSeries(this.project.stats.rna.perMutation);
      const expPerMutationMode = Math.max(...expPerMutation[0].y) <= 5 ? "linear" : "auto";

      Plotly.newPlot("exp-per-analysis", expPerAnalysis, this.getLayout("Analysis Type", null, null, expPerAnalysisMode), config);
      Plotly.newPlot("exp-per-variation", expPerVariation, this.getLayoutLog("Most Variable Genes (TPM)", null, null), config);
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
    getSeries(data) {
      return [{
        x: Object.keys(data),
        y: Object.values(data),
        type: "bar",
        orientation: "v"
      }];
    },

    getSeriesRange(data) {      
      return [{
        x: Object.keys(data),
        y: Object.values(data).map(v => v[1]),
        base: Object.values(data).map(v => v[1] - v[0]),
        hovertemplate: '%{base} - %{y}<extra></extra>',
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
          showline: false
        },
        yaxis: {
          title: ytitle,
          showline: true,
          tickmode: tickmode
        }
      };
    },

    getLayoutLog(title, xtitle = null, ytitle = null, tickmode = "auto", margin = { t: 50, r: 50, b:55, l:50 }) {
      return {
        margin: margin,
        title: title,
        dragmode: false,
        xaxis: {
          title: xtitle,
          showline: true
        },
        yaxis: {
          title: ytitle,
          showline: true,
          tickmode: tickmode,
          type: "log"
        }
      };
    }
  }
}
</script>
