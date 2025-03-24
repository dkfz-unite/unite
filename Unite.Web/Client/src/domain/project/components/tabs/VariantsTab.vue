<template>
  <div class="col q-gutter-sm">
    <div class="row">
      <span class="text-h5 u-text-title">Variants Statistics</span>
    </div>

    <!-- SSM -->
    <div class="row">
       <div class="col">
        <div class="row">
          <span class="text-h6 u-text-title">Simple Somatic Mutations (SSM)</span>
        </div>
        <div class="row">
          <div class="col-2">
            <div id="ssm-per-analysis" style="height: 300px;"></div>
          </div>
          <div class="col-2">
            <div id="ssm-per-type" style="height: 300px;"></div>
          </div>
          <div class="col-2">
            <div id="ssm-per-base-ref" style="height: 300px;"></div>
          </div>
          <div class="col-2">
            <div id="ssm-per-base-alt" style="height: 300px;"></div>
          </div>
        </div>
        <div class="row">
          <div class="col-2">
            <div id="ssm-per-impact" style="height: 400px;"></div>
          </div>
          <div class="col-6">
            <div id="ssm-per-effect" style="height: 400px;"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- CNV -->
    <div class="row">
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
    <div class="row">
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
import EffectType from "@/domain/genome/variants/_shared/variants/models/enums/effect-type.js";

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
    const getType = (value) => enumHelpers.getLabel(value, EffectType.values);    
    
    const ssmPerAnalysis = this.getSeries(this.project.stats.dna.ssm.perAnalysis);
    const ssmPerAnalysisMode = Math.max(...ssmPerAnalysis[0].y) <= 5 ? "linear" : "auto";
    const ssmPerType = this.getSeries(this.project.stats.dna.ssm.perType);
    const ssmPerBaseRef = this.getSeries(this.project.stats.dna.ssm.perBaseRef);
    const ssmPerBaseAlt = this.getSeries(this.project.stats.dna.ssm.perBaseAlt);
    const ssmPerImpact = this.getSeries(this.project.stats.dna.ssm.perEffectImpact);
    const ssmPerEffect = this.getSeriesH(this.project.stats.dna.ssm.perEffectType, getType);

    const cnvPerAnalysis = this.getSeries(this.project.stats.dna.cnv.perAnalysis);
    const cnvPerAnalysisMode = Math.max(...cnvPerAnalysis[0].y) <= 5 ? "linear" : "auto";
    const cnvPerType = this.getSeries(this.project.stats.dna.cnv.perType);

    const svPerAnalysis = this.getSeries(this.project.stats.dna.sv.perAnalysis);
    const svPerAnalysisMode = Math.max(...svPerAnalysis[0].y) <= 5 ? "linear" : "auto";
    const svPerType = this.getSeries(this.project.stats.dna.sv.perType);      
    
    const config = {
      displayModeBar: false,
      displaylogo: false,
      responsive: true,
    };

    Plotly.newPlot("ssm-per-analysis", ssmPerAnalysis, this.getLayout("Analysis Type", null, null, ssmPerAnalysisMode), config);
    Plotly.newPlot("ssm-per-type", ssmPerType, this.getLayout("Variant Type", null, null, "auto"), config);
    Plotly.newPlot("ssm-per-base-ref", ssmPerBaseRef, this.getLayout("Change From", null, null, "auto"), config);
    Plotly.newPlot("ssm-per-base-alt", ssmPerBaseAlt, this.getLayout("Change To", null, null, "auto"), config);
    Plotly.newPlot("ssm-per-impact", ssmPerImpact, this.getLayout("Effect Impact", null, null, "auto"), config);
    Plotly.newPlot("ssm-per-effect", ssmPerEffect, this.getLayoutH("Effect Type", null, null, "auto", { t: 50, r: 50, b: 55, l:230 }), config);
    
    Plotly.newPlot("cnv-per-analysis", cnvPerAnalysis, this.getLayout("Analysis Type", null, null, cnvPerAnalysisMode), config);
    Plotly.newPlot("cnv-per-type", cnvPerType, this.getLayout("Variant Type", null, null, "auto"), config);
    
    Plotly.newPlot("sv-per-analysis", svPerAnalysis, this.getLayout("Analysis Type", null, null, svPerAnalysisMode), config);
    Plotly.newPlot("sv-per-type", svPerType, this.getLayout("Variant Type", null, null, "auto"), config);
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

    getSeriesH(data, mapx = (value) => value, mapy = (value) => value) {
      return [{
        y: Object.keys(data).map(mapx),
        x: Object.values(data).map(mapy),
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
          showline: false
        },
        yaxis: {
          title: ytitle,
          showline: true,
          tickmode: tickmode
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
          showline: true
        },
        yaxis: {
          title: ytitle,
          showline: true
        }
      };
    }
  }
}
</script>