<template>
  <div class="col q-gutter-y-sm">
    <div class="row items-center q-gutter-sm">
      <slot name="header-before">
        <div v-show="false" id="header-before"></div>
      </slot>
      <u-location v-if="!slot" :location="location" />
      
      <q-space />
      
      <u-location v-if="slot" :location="location" />
      <q-btn dense flat stretch  icon="las la-sliders-h" title="View settings" no-caps>
        <u-view-menu v-model="options" @clear-cache="onClearCache" />
      </q-btn>
    </div>

    <div class="row">
      <div class="col">
        <q-card class="q-mx-xs q-pa-xs">
          <u-plotly
            id="profile" style="height: 65vh" 
            :data="data" :layout="layout" :config="config"
            @zoom="onZoom" @reset="onReset" />
        </q-card>
      </div>
    </div>

    
  </div>
</template>

<script>
import { colors } from "quasar";
import UPlotly from "../../_shared/Plotly.vue";
import UViewMenu from "./view/ViewMenu.vue";
import ULocation from "./Location.vue";

import genesDataService from "./data-service-genes";
import svsDataService from "./data-service-svs";
import cnvsDataService from "./data-service-cnvs";
import smsDataService from "./data-service-sms";
import expsDataService from "./data-service-exps";
import cacheDataService from "./data-service-cache";

export default {
  components: { UPlotly, UViewMenu, ULocation },

  props: {
    profile: {
      type: Object,
      required: true
    },
    density: {
      type: Number,
      default: 512
    }
  },

  data() {
    return {
      slot: false,
      ranges: [],
      genes: [],
      exps: [],
      sms: [],
      cnvs: [],
      svs: [],
      hasExps: false,
      hasSms: false,
      hasCnvs: false,
      hasSvs: false,
      options: {}
    }
  },

  watch: {
    async profile(profile) {
      await this.setData(profile);
    }
  },

  computed: {
    data() { return this.getSeries(); },
    layout() { return this.getScales(); },
    config() { return this.getConfig(); },

    location() {
      if (!this.ranges.length) return null;
      let start = this.ranges.slice(0, 1)[0];
      let end = this.ranges.slice(-1)[0];
      return { start, end };
    }
  },

  async mounted() {
    this.slot = document.getElementById("header-before") == null;
    this.options = this.getViewOptions();
    await this.setData(this.profile);
  },

  methods: {
    async setData(profile) {
      this.ranges = profile.ranges;
      this.genes = profile.genes;
      this.exps = profile.exps;
      this.sms = profile.sms;
      this.cnvs = profile.cnvs;
      this.svs = profile.svs;
      this.hasExps = profile?.hasExps || false;
      this.hasSms = profile?.hasSms || false;
      this.hasCnvs = profile?.hasCnvs || false;
      this.hasSvs = profile?.hasSvs || false;
    },

    async onZoom({ start, end }) {
      let location = this.getLocation(Math.ceil(start), Math.floor(end), this.ranges, this.location);
      await this.fetchData(location, this.density);
    },

    async onReset() {
      let location = { start: { c: 0, s: 0 }, end: { c: 0, e: 0 } };
      await this.fetchData(location, this.density);
    },

    async onClearCache() {
      cacheDataService.clear();
    },

    async fetchData(location, density = 512) {
      let criteria = this.getCriteria(location, density);
      this.$emit("fetch", criteria);
    },

    getViewOptions() {
      let view = {};

      if (this.profile?.hasSms) {
        view.sms = {
          category: "Impact",
          high: true,
          low: true,
          moderate: true,
          unknown: false
        }
      }

      if (this.profile?.hasCnvs) {
        view.cnvs = {
          type: true
        }
      }

      if (this.profile?.hasSvs) {
        view.svs = {
          type: true
        }
      }

      if (this.profile?.hasExps) {
        view.exps = {
          reads: false,
          tpm: false,
          fpkm: true
        }
      }

      return view;
    },

    getLocation(min, max, ranges, current) {
      let start = min <= 0 ? current.start : ranges.find(range => range.i == min); //ranges[min];
      let end = max >= ranges.length ? current.end : ranges.find(range => range.i == max); //ranges[max];
      return { start, end };
    },

    getCriteria(location, density = 512) {
      return {
        startChr: location?.start.c || 0,
        start: location?.start.s || 0,
        endChr: location?.end.c || 0,
        end: location?.end.e || 0,
        density: density
      };
    },

    getGeneDomain() {
      let start = 0.00;
      return [start, start + 0.10];
    },

    getSvDomain() {
      let start = 0.10;
      return [start, start + 0.05];
    },

    getCnvDomain() {
      let start = 0.15;
      if (!this.options.svs) start -= 0.05;
      return [start, start + 0.05];
    },

    getSmDomain() {
      let start = 0.20;
      let end = 1.00;
      if (!this.options.svs) start -= 0.05;
      if (!this.options.cnvs) start -= 0.05;
      if (this.options.exps) end -= 0.30;
      return [start, end];
    },

    getExpDomain() {
      let start = 0.70;
      if (!this.options.svs) start -= 0.05;
      if (!this.options.cnvs) start -= 0.05;
      if (!this.options.sms) start -= 0.50;
      return [start, 1.00]; 
    },

    getTick(ticks, index, range, ranges, length) {
      const getChromosome = (chr) => {
        return chr == 23 ? "X" : chr == 24 ? "Y" : `${chr}`;
      };

      const getPosition = (pos) => {
        return length < 1e3 ? `${pos}`
             : length < 1e6 ? `${(pos / 1e3).toFixed(0)}K`
             : `${(pos / 1e6).toFixed(0)}M`;
      };
       
      const chrRange = range.s == 1 ? range : null;
      if (chrRange) {
        const chr = getChromosome(chrRange.c);
        return [...ticks, { index: index, value: index, label: `<b>${chr}</b>` }];
      }

      const firstRange = range.i == 0 ? range : null;
      if (firstRange) {
        const chr = getChromosome(firstRange.c);
        const pos = getPosition(firstRange.s);
        return [...ticks, { index: index, value: index, label: `${chr}:${pos}` }];
      }

      const lastRange = range.i == ranges.length - 1 ? range : null;
      if (lastRange) {
        const chr = getChromosome(lastRange.c);
        const pos = getPosition(lastRange.e);
        return [...ticks, { index: index, value: index, label: `${chr}:${pos}` }];
      }

      const prevRange = ranges[ticks.at(-1).index];
      const nextRange = ranges.slice(index + 1).find(range => range.s == 1 || range.i == ranges.length - 1);
      if (range.i - prevRange.i >= 50 && nextRange.i - range.i >= 25) {
        const chr = getChromosome(range.c);
        const pos = getPosition(range.s);
        return [...ticks, { index: index, value: index, label: `${chr}:${pos}` }];
      }

      return ticks;
    },

    getSeries() {
      let categories = ["Impact", "Change from", "Change to"];
      let series = [];

      // Genes
      series.push(genesDataService.getSeriesMinus(this.genes || [], "x1", "y1"));
      series.push(genesDataService.getSeriesPlus(this.genes || [], "x1", "y1"));

      // SVs type
      if (this.options.svs) {
        series.push(svsDataService.getSeries(this.svs || [], "x1", "y2"));
      }

      // CNVs type
      if (this.options.cnvs) {
        series.push(cnvsDataService.getSeries(this.cnvs || [], "x1", "y3"));
      }

      // TODO: Refactor this to add 2 changes from and to + 6 groups of changes from-to

      // SMs impact
      if (this.options.sms?.category == categories[0]) {
        if (this.options.sms.high)
          series.push(smsDataService.getImpactSeries(this.sms || [], 0, "x1", "y4"));
        if (this.options.sms.moderate)
          series.push(smsDataService.getImpactSeries(this.sms || [], 1, "x1", "y4"));
        if (this.options.sms.low)
          series.push(smsDataService.getImpactSeries(this.sms || [], 2, "x1", "y4"));
        if (this.options.sms.unknown)
          series.push(smsDataService.getImpactSeries(this.sms || [], 3, "x1", "y4"));
      }

      // SMs change from
      if (this.options.sms?.category == categories[1]) {
        const impacts = [];

        if (this.options.sms.high)
          impacts.push(0);
        if (this.options.sms.moderate)
          impacts.push(1);
        if (this.options.sms.low)
          impacts.push(2);
        if (this.options.sms.unknown)
          impacts.push(3);

        series.push(smsDataService.getChangeFromSeries(this.sms || [], 0, impacts, "x1", "y4"));
        series.push(smsDataService.getChangeFromSeries(this.sms || [], 1, impacts, "x1", "y4"));
        series.push(smsDataService.getChangeFromSeries(this.sms || [], 2, impacts, "x1", "y4"));
        series.push(smsDataService.getChangeFromSeries(this.sms || [], 3, impacts, "x1", "y4"));
      }

      // SMs change to
      if (this.options.sms?.category == categories[2]) {
        const impacts = [];

        if (this.options.sms.high)
          impacts.push(0);
        if (this.options.sms.moderate)
          impacts.push(1);
        if (this.options.sms.low)
          impacts.push(2);
        if (this.options.sms.unknown)
          impacts.push(3);

        series.push(smsDataService.getChangeToSeries(this.sms || [], 0, impacts, "x1", "y4"));
        series.push(smsDataService.getChangeToSeries(this.sms || [], 1, impacts, "x1", "y4"));
        series.push(smsDataService.getChangeToSeries(this.sms || [], 2, impacts, "x1", "y4"));
        series.push(smsDataService.getChangeToSeries(this.sms || [], 3, impacts, "x1", "y4"));
      }

      // Exps reads
      if (this.options.exps?.reads) {
        series.push(expsDataService.getSeries(this.exps || [], 0, "x1", "y5"));
      }

      // Exps TPM
      if (this.options.exps?.tpm) {
        series.push(expsDataService.getSeries(this.exps || [], 1, "x1", "y5"));
      }

      // Exps FPKM
      if (this.options.exps?.fpkm) {
        series.push(expsDataService.getSeries(this.exps || [], 2, "x1", "y5"));
      }

      return series;
    },

    getScales() {
      const scales = {
        // modebar: { remove: ["pan", "select", "lasso", "zoomin", "zoomout", "resetscale"] },
        showlegend: false,
        margin:  { l: 60, t: 40, r: 60, b: 60 },
        barmode: "relative",
        shapes: [],
      }

      // Chromosomes X-Axis
      scales.xaxis1 = this.getGenomeScale(null, "x1", [0.00, 1.00], this.ranges);

      // Genes Y-Axis
      scales.yaxis1 = genesDataService.getScales("y1", this.getGeneDomain());
      scales.shapes.push(this.getLine(0.10));

      // SVs Y-Axis
      if (this.options.svs) {
        const domain = this.getSvDomain();
        scales.yaxis2 = svsDataService.getScales("y2", domain);
        scales.shapes.push(this.getLine(domain[1]));
      };

      // CNVs Y-Axis
      if (this.options.cnvs) {
        const domain = this.getCnvDomain();
        scales.yaxis3 = cnvsDataService.getScales("y3", domain);
        scales.shapes.push(this.getLine(domain[1]));
      };

      // SMs Y-Axis
      if (this.options.sms) {
        const domain = this.getSmDomain();
        const high = this.options.sms.high ? this.sms?.map(v => v.i[0].n) || [0] : [0];
        const moderate = this.options.sms.moderate ? this.sms?.map(v => v.i[1].n) || [0] : [0];
        const low = this.options.sms.low ? this.sms?.map(v => v.i[2].n) || [0] : [0];
        const unknown = this.options.sms.unknown ? this.sms?.map(v => v.i[3].im) || [0] : [0];
        const max = Math.max(...high, ...moderate, ...low, ...unknown);
        scales.yaxis4 = smsDataService.getScales("y4", domain, max);
      };

      // Exps Y-Axis
      if (this.options.exps) {
        const domain = this.getExpDomain();
        const reads = this.options.exps.reads ? this.exps?.map(v => v.reads[0]) || [0] : [0];
        const tpm = this.options.exps.tpm ? this.exps?.map(v => v.reads[1]) || [0] : [0];
        const fpkm = this.options.exps.fpkm ? this.exps?.map(v => v.reads[2]) || [0] : [0];
        const max = Math.max(...reads, ...tpm, ...fpkm);
        scales.yaxis5 = expsDataService.getScales("Expressions", "y5", domain, max);
      }

      return scales;
    },

    getGenomeScale(name, x, domain, ranges) {
      const length = ranges.reduce((acc, range) => acc + range.e - range.s + 1, 0);
      const ticks = ranges.reduce((acc, range, index, ranges) => this.getTick(acc, index, range, ranges, length), []);

      return {
        title: name,
        anchor: x,
        type: "number",
        domain: domain,
        showgrid: true,
        showline: true,
        ticklen: 5,
        tickwidth: 2,
        tickvals: ticks.map(v => v.value),
        ticktext: ticks.map(v => v.label),
        range: [0, ranges.length -1]
      };
    },

    getLine(y) {
      return {
        type: "line",
        layer: "top",
        xref: "paper",
        yref: "paper",
        x0: 0,
        y0: y,
        x1: 1,
        y1: y,
        line: {
          color: colors.getPaletteColor("black"),
          // opacity: 0.5,
          width: 0.5,
        }
      };
    },

    getConfig() {
      return {
        displayModeBar: false,
        displaylogo: false,
        responsive: true,
      }
    }
  }
}
</script>
