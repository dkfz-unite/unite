<template>
  <div class="col q-gutter-y-sm">

    <div class="row">
      <div class="col">
        <q-card class="q-mx-xs q-pa-xs">
          <u-plotly
            id="profile" style="min-height: 55vh" 
            :data="data" :layout="layout" :config="config"
            @zoom="onZoom" @reset="onReset" />
        </q-card>
      </div>
    </div>

    <div class="row q-gutter-x-md">
      <u-location :location="location" />
      <u-stats title="#SSM" :stats="ssms?.data" />
      <u-stats title="#CNV" :stats="cnvs?.data" />
      <q-space />
      <q-btn dense flat color="red" @click="onClearCache">Clear Cache</q-btn>
    </div>
  </div>
</template>

<script>
import UPlotly from "../../_shared/Plotly.vue";
import ULocation from "./Location.vue";
import UStats from "./Stats.vue";
import ssmDataService from "./profile-data-service-ssm";
import cnvDataService from "./profile-data-service-cnv";
import expDataService from "./profile-data-service-exp";
import cacheDataService from "./profile-data-service-cache";


export default {
  components: { UPlotly, UStats, ULocation },

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
      ranges: [],
      hasSsm: false,
      hasCnv: false,
      hasExp: false
    }
  },

  watch: {
    async profile(profile) {
      await this.setData(profile);
    }
  },

  computed: {
    data() { return this.getDatasets(); },
    layout() { return this.getScales(); },
    config() { return this.getConfig(); },

    location() {
      if (!this.ranges.length) return null;
      let start = this.ranges.slice(0, 1)[0];
      let end = this.ranges.slice(-1)[0];
      return { start, end };
    },

    ssms() {
      if (!this.hasSsm) return null;
      return ssmDataService.getStatsImpact(this.ranges);
    },

    cnvs() {
      if (!this.hasCnv) return null;
      return cnvDataService.getStats(this.ranges);
    }
  },

  async mounted() {
    await this.setData(this.profile);
  },

  methods: {
    onClearCache() {
      cacheDataService.clear();
    },

    async setData(profile) {
      this.ranges = profile?.ranges || [];
      this.hasSsm = profile?.hasSsm || false;
      this.hasCnv = profile?.hasCnv || false;
      this.hasExp = profile?.hasExp || false;
    },


    async onZoom({ start, end }) {
      let location = this.getLocation(Math.ceil(start), Math.floor(end), this.profile.ranges, this.location);
      await this.fetchData(location, this.density);
    },

    async onReset() {
      let location = { start: { chr: 0, start: 0 }, end: { chr: 0, end: 0 } };
      await this.fetchData(location, this.density);
    },

    async fetchData(location, density = 512) {
      let criteria = this.getCriteria(location, density);
      this.$emit("fetch", criteria);
    },

    getLocation(min, max, ranges, current) {
      let start = min <= 0 ? current.start : ranges[min];
      let end = max >= ranges.length ? current.end : ranges[max];
      return { start, end };
    },

    getCriteria(location, density = 512) {
      return {
        startChr: location?.start.chr || 0,
        start: location?.start.start || 0,
        endChr: location?.end.chr || 0,
        end: location?.end.end || 0,
        density: density
      };
    },

    getSsmDomain() {
      return this.hasCnv ? [0, 0.70] : [0, 1];
    },

    getCnvDomain() {
      return this.hasSsm ? [0.71, 1] : [1, 1];
    },

    getTickValue(range, index, length) {
      let chromosomeTick = range.start == 1;
      let firstTick = index == 0;
      let lastTick = index == length - 1;
      
      return chromosomeTick ? range.code
           : firstTick ? range.code
           : lastTick ? range.code
           : null;
    },

    getTickLabel(range) {
      let chromosomeTick = range.start == 1;
      let chromosome = range.chr == 23 ? "X" : range.chr == 24 ? "Y" : `${range.chr}`;
      let position = Math.floor(range.start / 1000000);

      return chromosomeTick ? chromosome : `${chromosome}:${position}M`;
    },

    getDatasets() {
      if (!this.ranges?.length) return null;

      let datasets = [];

      if (this.hasSsm) {
        datasets.push(...ssmDataService.getDataImpact(this.ranges, "x1", "y1"));
      }

      if (this.hasCnv) {
        if (this.cnvs.hasTcn) {
          datasets.push(...cnvDataService.getDataTcn(this.ranges, "x1", "y2"));
        } else {
          datasets.push(...cnvDataService.getDataCna(this.ranges, "x1", "y2"));
        }
      }

      if (this.hasExp) {
        datasets.push(...expDataService.getData(this.ranges, "x1", "y3"));
      }

      return datasets;
    },

    getScales() {
      if (!this.ranges?.length) return null;
      let length = this.ranges.length;

      let scales = {
        modebar: { remove: ["pan", "select", "lasso", "zoomin", "zoomout", "resetscale"] },
        legend: { orientation: "h", y: 1.1, x: 0.25 },
        margin:  { l: 60, t: 0, r: 60, b: 60 },
        barmode: "relative",
        grid: {
          rows: 3,
          columns: 1,
          roworder: "bottom to top",
        }
      }

      scales.xaxis1 = {
        anchor: "x1",
        type: "category",
        tickvals: this.ranges.map((range, index) => this.getTickValue(range, index, length)),
        ticktext: this.ranges.map(range => this.getTickLabel(range)),
        showgrid: true,
        ticklen: 5,
        tickwidth: 2,
        range: [0, length -1]
      }

      if (this.hasSsm) {
        let domain = this.getSsmDomain();
        let dtick = this.ssms.max <= 5 ? 1 : null;
        scales.yaxis1 = ssmDataService.getScaleImpact("y1", domain, dtick);
      }

      if (this.hasCnv) {
        let domain = this.getCnvDomain();
        scales.yaxis2 = this.cnvs?.hasTcn
          ? cnvDataService.getScaleTcn("y2", domain)
          : cnvDataService.getScaleCna("y2", domain);
      }

      if (this.hasExp) {
        let domain = this.getSsmDomain();
        scales.yaxis3 = expDataService.getScale("y3", domain);
      }

      return scales;
    },

    getConfig() {
      return {
        displayModeBar: true,
        displaylogo: false,
        responsive: true,
      }
    },

    getChromosomeLabel(chr) {
      return chr == 23 ? "X" : chr == 24 ? "Y" : `${chr}`;
    }
  }
}
</script>