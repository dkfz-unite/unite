<template>
  <div class="col q-gutter-y-sm">
    <div class="row">
      <span class="text-h5 u-text-title">Genomic Profile</span>
    </div>
    <div class="row q-gutter-x-md">
      <div>
        <div>Location: {{ min?.chr }}.{{ min?.start }} - {{ max?.chr }}.{{ max?.end }}</div>
      </div>
      <div class="row">
        <div class="q-mr-sm">#Mutations:</div>
        <div :style="{ height: '20px', width: `${ssms?.h.number > 0 ? (ssms?.h.percent || 1) * 3 : 0}px`, backgroundColor: colors.red }">
          <q-tooltip style="font-size: 12px;">
            High impact: {{ ssms?.h.number }} ({{ ssms?.h.percent }}%)
          </q-tooltip>
        </div>
        <div :style="{ height: '20px', width: `${ssms?.m.number > 0 ? (ssms?.m.percent || 1) * 3 : 0}px`, backgroundColor: colors.orange }">
          <q-tooltip style="font-size: 12px;">
            Moderate impact: {{ ssms?.m.number }} ({{ ssms?.m.percent }}%)
          </q-tooltip>
        </div>
        <div :style="{ height: '20px', width: `${ssms?.l.number > 0 ? (ssms?.l.percent || 1) * 3 : 0}px`, backgroundColor: colors.green }">
          <q-tooltip style="font-size: 12px;">
            Low impact: {{ ssms?.l.number }} ({{ ssms?.l.percent }}%)
          </q-tooltip>
        </div>
        <div :style="{ height: '20px', width: `${ssms?.u.number > 0 ? (ssms?.u.percent || 1) * 3 : 0}px`, backgroundColor: colors.grey }">
          <q-tooltip style="font-size: 12px;">
            Unknown impact: {{ ssms?.u.number }} ({{ ssms?.u.percent }}%)
          </q-tooltip>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <q-card class="q-mx-xs q-pa-xs">
          <div id="profile" ref="plot" style="min-height: 61vh"></div>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import Plotly from "plotly.js-dist-min";
import { colors } from "quasar";
import api from "../api";


export default {
  props: ["donor"],

  setup(props) {
    return {
      colors: {
        red: colors.getPaletteColor("red"),
        orange: colors.getPaletteColor("orange"),
        green: colors.getPaletteColor("green"),
        grey: colors.getPaletteColor("grey-4"),
        blue: colors.getPaletteColor("blue")
      }
    };
  },

  data() {
    return {
      profile: null,
      plot: null,
      min: null,
      max: null      
    }
  },

  computed: {
    data() { return this.getValues(); },
    layout() { return this.getScales(); },
    ssms() {
      let hNumber = this.profile?.ranges.map(range => range.ssm?.h || 0).reduce((a, b) => a + b);
      let mNumber = this.profile?.ranges.map(range => range.ssm?.m || 0).reduce((a, b) => a + b);
      let lNumber = this.profile?.ranges.map(range => range.ssm?.l || 0).reduce((a, b) => a + b);
      let uNumber = this.profile?.ranges.map(range => range.ssm?.u || 0).reduce((a, b) => a + b);
      let tNumber = hNumber + mNumber + lNumber + uNumber;

      return {
        t: { number: tNumber },
        h: { number: hNumber, percent: Math.round(hNumber/tNumber*100) },
        m: { number: mNumber, percent: Math.round(mNumber/tNumber*100) },
        l: { number: lNumber, percent: Math.round(lNumber/tNumber*100) },
        u: { number: uNumber, percent: Math.round(uNumber/tNumber*100) }
      };
    }
  },

  async mounted() {
    let config = {
      displayModeBar: false,
      displaylogo: false,
      responsive: true,
    };

    await this.fetchData();
    this.plot = await Plotly.newPlot("profile", this.data, this.layout, config);
    this.plot.on("plotly_relayout", this.onZoom);
  },

  methods: {
    async onZoom(payload) {
      if (payload["xaxis.range[0]"] && payload["xaxis.range[1]"]) {
        let min = Math.ceil(payload["xaxis.range[0]"]);
        let max = Math.floor(payload["xaxis.range[1]"]);
        let length = this.profile.ranges.length;
        let start = min <= 0 ? this.min : this.profile.ranges[min];
        let end = max >= length ? this.max : this.profile.ranges[max];
        await this.fetchData(start.chr, start.start, end.chr, end.end);
        await Plotly.react("profile", this.data, this.layout);
      } else if (payload["xaxis.autorange"]) {
        await this.fetchData();
        await Plotly.react("profile", this.data, this.layout);
      }
    },

    async fetchData(startChr = 0, start = 0, endChr = 0, end = 0) {
      try {
        let density = 512;
        this.profile = await api.getVariantsProfile(this.donor.id, { startChr, start, endChr, end, density});
        this.min = this.profile?.ranges?.slice(0, 1)[0];
        this.max = this.profile?.ranges?.slice(-1)[0];
      } finally {
      }
    },

    getSsmDomain() {
      return this.profile?.hasCnv ? [0, 0.80] : [0, 1];
    },

    getCnvDomain() {
      return this.profile?.hasSsm ? [0.81, 1] : [1, 1];
    },

    getTickValue(range, index) {
      let length = this.profile?.ranges?.length;
      if (range.start == 1) return range.code;
      else if (index == 0 || index == length - 1) return range.code;
      else return null;
    },

    getTickLabel(range) {
      let chr = range.chr == 23 ? "X" : range.chr == 24 ? "Y" : `${range.chr}`;
      let start = range.start;
      let millions = Math.floor(start / 1000000);

      return start == 1 ? chr : `${chr}.${millions}M`;
    },

    getValues() {
      if (!this.profile?.ranges?.length) return null;

      let datasets = [];

      if (this.profile.hasSsm) {
        datasets.push({
          name: "High",
          type: "bar",
          x: this.profile.ranges.map(range => range.code),
          y: this.profile.ranges.map(range => range.ssm?.h),
          marker: { color: this.colors.red },
          xaxis: "x1",
          yaxis: "y1"
        });

        datasets.push({
          name: "Moderate",
          type: "bar",
          x: this.profile.ranges.map(range => range.code),
          y: this.profile.ranges.map(range => range.ssm?.m),
          marker: { color: this.colors.orange },
          xaxis: "x1",
          yaxis: "y1"
        });

        datasets.push({
          name: "Low",
          type: "bar",
          x: this.profile.ranges.map(range => range.code),
          y: this.profile.ranges.map(range => range.ssm?.l),
          marker: { color: this.colors.green },
          xaxis: "x1",
          yaxis: "y1"
        });

        datasets.push({
          name: "Unknown",
          type: "bar",
          x: this.profile.ranges.map(range => range.code),
          y: this.profile.ranges.map(range => range.ssm?.u),
          marker: { color: this.colors.grey },
          xaxis: "x1",
          yaxis: "y1"
        });
      }

      if (this.profile.hasCnv) {
        if (this.profile.ranges.some(range => range.cnv?.tcn != null)) {
          datasets.push({
            name: "TCN",
            type: "scatter",
            x: this.profile.ranges.map(range => range.code),
            y: this.profile.ranges.map(range => range.cnv?.tcn),
            line: { width: 3, color: this.colors.blue },
            xaxis: "x1",
            yaxis: "y2"
          });
        } else {
          datasets.push({
            name: "CNA",
            type: "scatter",
            x: this.profile.ranges.map(range => range.code),
            y: this.profile.ranges.map(range => range.cnv?.cna),
            line: { width: 5, color: this.colors.blue },
            xaxis: "x1",
            yaxis: "y2"
          });
        }
      }

      return datasets;
    },

    getScales() {
      if (!this.profile?.ranges?.length) return null;

      let scales = {
        modebar: {
          remove: ["pan", "select", "lasso", "zoomin", "zoomout", "resetscale"],
        },
        legend: { orientation: "h", y: 1.05, x: 0.35 },
        margin:  { l: 60, t: 40, r: 60, b: 40 },
        barmode: "stack",
        xaxis1: {
          anchor: "x1",
          tickvals: this.profile?.ranges?.map((range, index) => this.getTickValue(range, index)),
          ticktext: this.profile?.ranges?.map(range => this.getTickLabel(range)),
          ticklen: 5,
          tickwidth: 2,
        },
        yaxis1: {
          title: "#Mutations",
          anchor: "y1",
          domain: this.getSsmDomain(),
          fixedrange: true,
          showline: true
        },
        yaxis2: {
          anchor: "y2",
          domain: this.getCnvDomain(),
          autorange: false,
          fixedrange: true,
          showline: true,
          type: "category",
          categoryarray: ["Loss", "Neutral", "Gain"],
          color: this.colors.blue,
        },
        grid: {
          rows: 2,
          columns: 1,
          roworder: "bottom to top",
        }
      };

      return scales;
    }
  }
}
</script>