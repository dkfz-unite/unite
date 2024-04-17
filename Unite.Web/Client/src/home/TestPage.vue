<template>
  <div class="col">
    <u-plotly :data="series" :layout="scales" />
  </div>
</template>

<script>
import UPlotly from "@/visualization/_shared/Plotly.vue";

export default {
  components: {
    UPlotly,
  },

  data() {
    return {
      series: null,
      scales: null,
    };
  },

  mounted() {
    this.series = this.getSeries();
    this.scales = this.getScales();
  },

  methods: {
    getSeries() {
      const rangesA = [[0, 10], [15, 25], [30, 40]];
      const rangesB = [[0, 10], [8, 18], [23, 33]];
      const rangesC = [[0, 10], [8, 18], [16, 26]];
      const rangesD = [[0, 10], [5, 15], [3, 13], [6, 16]];
      let i = 0;
      const color = ["red", "blue", "green", "yellow", "cyan", "orange", "pink", "brown", "black", "grey"]
      return [{
          type: "bar",
          orientation: "h",
          base: rangesA.map(r => r[0]),
          x: rangesA.map(r => r[1] - r[0]),
          y: rangesA.map(r => "A"),
          marker: {
            color: rangesA.map(r => color[i++]),
            opacity: 0.2,
          },
        },
        {
          type: "bar",
          orientation: "h",
          base: rangesB.map(r => r[0]),
          x: rangesB.map(r => r[1] - r[0]),
          y: rangesB.map(r => "B"),
          marker: {
            color: rangesB.map(r => color[i++ % 10]),
            opacity: 0.2,
          },
        },
        {
          type: "bar",
          orientation: "h",
          base: rangesC.map(r => r[0]),
          x: rangesC.map(r => r[1] - r[0]),
          y: rangesC.map(r => "C"),
          marker: {
            color: rangesC.map(r => color[i++ % 10]),
            opacity: 0.2,
          },
        },
        {
          type: "bar",
          orientation: "h",
          base: rangesD.map(r => r[0]),
          x: rangesD.map(r => r[1] - r[0]),
          y: rangesD.map(r => "D"),
          marker: {
            color: rangesD.map(r => color[i++ % 10]),
            opacity: 0.2,
          },
        },
      ];
    },

    getScales() {
      return {
        title: "Test Plot",
        yaxis: {
          fixedrange: true,
        }
      };
    },
  }
}
</script>