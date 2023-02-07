<template>
  <div class="col" @dblclick="dbClick">
    <bar ref="chart" v-if="d.datasets?.length" :data="d" :options="o" style="height: 70vh; width: 100vw;"/>
  </div>
</template>

<script>
import { Chart, Title, Tooltip, Legend, BarElement, PointElement, LineElement, CategoryScale, LinearScale, LogarithmicScale } from "chart.js";
import { Bar } from "vue-chartjs";
import zoomPlugin from "chartjs-plugin-zoom";
import { colors } from "quasar";
import api from "../api";

Chart.register(CategoryScale, LinearScale, LogarithmicScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);
Chart.register(zoomPlugin);

export default {
  props: ["donor"],

  components: {
    Bar
  },

  data() {
    return {
      loading: false,
      profile: null,
      plugins: {
        zoom: {
          zoom: {
            drag: { enabled: true },
            mode: "x",
            onZoom: this.onZoom
          },
        }
      },
    }
  },

  computed: {
    labels() { return this.getLabels(); },
    datasets() { return this.getValues(); },
    scales() { return this.getScales(); },
    d() {
      return {
        labels: this.labels,
        datasets: this.datasets
      }
    },
    o() {
      return {
        plugins: this.plugins,
        scales: this.scales
      }
    }
  },

  async mounted() {
    this.ranges = await this.fetchData();
  },

  methods: {
    async onZoom(payload) {
      let {min ,max} = payload.chart.scales.x;
      let start = this.profile.ranges[min];
      let end = this.profile.ranges[max];

      await this.fetchData(start.chr, start.start, end.chr, end.end);
      this.$refs.chart.chart.resetZoom();
    },

    async dbClick() {
      await this.fetchData();
      this.$refs.chart.chart.resetZoom();
    },

    async fetchData(startChr = 0, start = 0, endChr = 0, end = 0) {
      try {
        this.loading = true;
        this.profile = await api.getVariantsProfile(this.donor.id, { startChr, start, endChr, end});
      } finally {
        this.loading = false;
      }
    },

    getLabels() {
      if (!this.profile?.ranges?.length) return null;

      return this.profile.ranges.map(range => range.code)
    },

    getValues() {
      if (!this.profile?.ranges?.length) return null;

      let datasets = [];

      if (this.profile.hasSsm) {
        datasets.push({
          label: "High",
          backgroundColor: colors.getPaletteColor("red"),
          data: this.profile.ranges.map(range => range.ssm?.h),
          yAxisID: "ssm"
        });

        datasets.push({
          label: "Moderate",
          backgroundColor: colors.getPaletteColor("orange"),
          data: this.profile.ranges.map(range => range.ssm?.m),
          yAxisID: "ssm"
        });

        datasets.push({
          label: "Low",
          backgroundColor: colors.getPaletteColor("green"),
          data: this.profile.ranges.map(range => range.ssm?.l),
          yAxisID: "ssm"
        });

        datasets.push({
          label: "Unknown",
          backgroundColor: colors.getPaletteColor("grey"),
          data: this.profile.ranges.map(range => range.ssm?.u),
          yAxisID: "ssm"
        });
      }

      if (this.profile.hasCnv) {
        if (this.profile.ranges.some(range => range.cnv?.tcn != null)) {
          //TODO: Add ploidy line
          datasets.push({
            label: "TCN",
            backgroundColor: colors.getPaletteColor("blue"),
            data: this.profile.ranges.map(range => range.cnv?.tcn),
            type: 'line',
            yAxisID: "cnv"
          });
        } else {
          datasets.push({
            label: "CNA",
            backgroundColor: colors.getPaletteColor("blue"),
            data: this.profile.ranges.map(range => range.cnv?.cna),
            type: 'line',
            yAxisID: "cnv"
          });
        }
      }

      return datasets;
    },

    getScales() {
      if (!this.profile?.ranges?.length) return null;

      let scales = {};

      scales.x = {
        type: "category",
        position: "bottom",
        stacked: true,
        grid: { display: true }
      };

      scales.ssm = {
        type: "linear",
        position: "left",
        stack: "left",
        stackWeight: 4,
        weight: 1,
        offset: false,
        title: { display: true, text: "#Mutations" },
        grid: { display: false },
        ticks: { stepSize: 1 },
        suggestedMin: 0,
        suggestedMax: 2
      };

      if (this.profile.hasCnv) {
        if (this.profile.ranges.some(range => range.cnv?.tcn != null)) {
          scales.cnv = {
            type: "linear",
            position: "left",
            stack: "left",
            stackWeight: 1,
            weight: 2,
            offset: true,
            title: { display: true, text: "TCN" },
            grid: { display: true, color: colors.getPaletteColor("blue-2") },
            ticks: { color: colors.getPaletteColor("blue") }
          }
        } else {
          scales.cnv = {
            type: "category",
            position: "left",
            stack: "left",
            stackWeight: 1,
            weight: 2,
            offset: true,
            labels: ["Gain", "Neutral", "Loss"],
            title: { display: true, text: "CNA" },
            grid: { display: true, color: colors.getPaletteColor("blue-2") },
            ticks: { color: colors.getPaletteColor("blue") }
          }
        }
      }

      return scales;
    }
  }
}
</script>