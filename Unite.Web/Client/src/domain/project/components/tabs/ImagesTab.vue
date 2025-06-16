<template>
  <div class="col q-gutter-sm">
    <div class="row">
      <span class="text-h5 u-text-title">Images Statistics</span>
    </div>

    <div class="row">
      <div class="col">
        <div class="row">
          <span class="text-h6 u-text-title">MR</span>
        </div>
        <div class="row">
          <div class="col-2">
            <div id="mr-per-size" style="height: 300px;"></div>
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
    
    const mrPerSize = this.getSeries(this.project.stats.images.mr.perSize, this.getRangeKey);
    const mrPerSizeMode = Math.max(...mrPerSize[0].y) <= 5 ? "linear" : "auto";

    Plotly.newPlot("mr-per-size", mrPerSize, this.getLayout("Whole Tumor Size", null, null, mrPerSizeMode), config);
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

    getRangeKey(row, index, array) {
      if (index == 0)
        return `<${row.key - 1}`;
      else if (index == array.length - 1)
        return `>${row.key - 1}`;
      else
        return `${array[index - 1].key} - ${row.key}`;
    }
  }
}
</script>
