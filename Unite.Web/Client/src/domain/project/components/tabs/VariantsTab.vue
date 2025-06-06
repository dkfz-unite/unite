<template>
  <div class="col q-gutter-sm">
    <div class="row">
      <span class="text-h5 u-text-title">Variants Statistics</span>
    </div>

    <!-- SM -->
    <div v-if="showSm" class="row">
       <div class="col">
        <div class="row">
          <span class="text-h6 u-text-title">Simple Mutations (SM)</span>
        </div>
        <div class="row">
          <div class="col-1">
            <div id="sm-per-analysis" style="height: 300px;"></div>
          </div>
          <div class="col-2">
            <div id="sm-per-type" style="height: 300px;"></div>
          </div>
          <div class="col-1">
            <div id="sm-per-base-ref" style="height: 300px;"></div>
          </div>
          <div class="col-1">
            <div id="sm-per-base-alt" style="height: 300px;"></div>
          </div>
          <div class="col-3">
            <div id="sm-per-base-change" style="height: 300px;"></div>
          </div>
        </div>
        <div class="row">
          <div class="col-2">
            <div id="sm-per-impact" style="height: 400px;"></div>
          </div>
          <div class="col-6">
            <div id="sm-per-effect" style="height: 400px;"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- CNV -->
    <div v-if="showCnv" class="row">
       <div class="col">
        <div class="row">
          <span class="text-h6 u-text-title">Copy Number Variants (CNV)</span>
        </div>
        <div class="row">
          <div class="col-2">
            <div id="cnv-per-analysis" style="height: 300px;"></div>
          </div>
          <div class="col-2">
            <div id="cnv-per-type" style="height: 300px;"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- SV -->
    <div v-if="showSv" class="row">
       <div class="col">
        <div class="row">
          <span class="text-h6 u-text-title">Structural Variants (SV)</span>
        </div>
        <div class="row">
          <div class="col-2">
            <div id="sv-per-analysis" style="height: 300px;"></div>
          </div>
          <div class="col-2">
            <div id="sv-per-type" style="height: 300px;"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Plotly from "plotly.js-dist-min";
import enumHelpers from "@/_shared/helpers/enum-helpers.js";
import EffectType from "@/domain/omics/variants/_shared/variants/models/enums/effect-type.js";

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
    showSm() {
      return this.project.stats.dna.sm.number > 0;
    },

    showCnv() {
      return this.project.stats.dna.cnv.number > 0;
    },

    showSv() {
      return this.project.stats.dna.sv.number > 0;
    }
  },

  mounted() {
    const config = {
      displayModeBar: false,
      displaylogo: false,
      responsive: true,
    };    
    
    if (this.showSm) {
      const smPerAnalysis = this.getSeries(this.project.stats.dna.sm.perAnalysis);
      const smPerAnalysisMode = Math.max(...smPerAnalysis[0].y) <= 5 ? "linear" : "auto";
      const smPerType = this.getSeries(this.project.stats.dna.sm.perType);
      const smPerBaseRef = this.getSeries(this.project.stats.dna.sm.perBaseRef);
      const smPerBaseAlt = this.getSeries(this.project.stats.dna.sm.perBaseAlt);
      const smPerBaseChange = this.getSeries(this.project.stats.dna.sm.perBaseChange);
      const smPerImpact = this.getSeries(this.project.stats.dna.sm.perEffectImpact);
      const smPerEffect = this.getSeriesH(this.project.stats.dna.sm.perEffectType, this.getTypeKey);

      Plotly.newPlot("sm-per-analysis", smPerAnalysis, this.getLayout("Analysis Type", null, null, smPerAnalysisMode), config);
      Plotly.newPlot("sm-per-type", smPerType, this.getLayout("Variant Type", null, null, "auto"), config);
      Plotly.newPlot("sm-per-base-ref", smPerBaseRef, this.getLayout("Change From", null, null, "auto"), config);
      Plotly.newPlot("sm-per-base-alt", smPerBaseAlt, this.getLayout("Change To", null, null, "auto"), config);
      Plotly.newPlot("sm-per-base-change", smPerBaseChange, this.getLayout("Change Type", null, null, "auto"), config);
      Plotly.newPlot("sm-per-impact", smPerImpact, this.getLayout("Effect Impact", null, null, "auto"), config);
      Plotly.newPlot("sm-per-effect", smPerEffect, this.getLayoutH("Effect Type", null, null, "auto", { t: 50, r: 50, b: 55, l:230 }), config);
    }

    if (this.showCnv) {
      const cnvPerAnalysis = this.getSeries(this.project.stats.dna.cnv.perAnalysis);
      const cnvPerAnalysisMode = Math.max(...cnvPerAnalysis[0].y) <= 5 ? "linear" : "auto";
      const cnvPerType = this.getSeries(this.project.stats.dna.cnv.perType);

      Plotly.newPlot("cnv-per-analysis", cnvPerAnalysis, this.getLayout("Analysis Type", null, null, cnvPerAnalysisMode), config);
      Plotly.newPlot("cnv-per-type", cnvPerType, this.getLayout("Variant Type", null, null, "auto"), config);
    }

    if (this.showSv) {
      const svPerAnalysis = this.getSeries(this.project.stats.dna.sv.perAnalysis);
      const svPerAnalysisMode = Math.max(...svPerAnalysis[0].y) <= 5 ? "linear" : "auto";
      const svPerType = this.getSeries(this.project.stats.dna.sv.perType);      

      Plotly.newPlot("sv-per-analysis", svPerAnalysis, this.getLayout("Analysis Type", null, null, svPerAnalysisMode), config);
      Plotly.newPlot("sv-per-type", svPerType, this.getLayout("Variant Type", null, null, "auto"), config);
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

    getSeriesH(data, mapx = (row, index, array) => row.key, mapy = (row, index, array) => row.value) {
      return [{
        y: data.map(mapx),
        x: data.map(mapy),
        type: "bar",
        orientation: "h"
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
    },

    getLayoutH(title, xtitle = null, ytitle = null, tickmode = "auto", margin = { t: 50, r: 50, b:55, l:50 }) {
      return {
        margin: margin,
        title: title,
        dragmode: false,
        xaxis: {
          title: xtitle,
          showline: true,
          tickfont: {
            size: 11
          }
        },
        yaxis: {
          title: ytitle,
          showline: true,
          tickfont: {
            size: 11
          }
        }
      };
    },

    getTypeKey(row, index, array) {
      return enumHelpers.getLabel(row.key, EffectType.values);
    }
  }
}
</script>