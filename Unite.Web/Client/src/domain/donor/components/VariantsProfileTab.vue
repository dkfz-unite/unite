<template>
  <div id="profile"></div>
</template>

<script>
import Plotly from "plotly.js-dist-min";
import { colors } from "quasar";

export default {
  props: ["donor"],

  data() {
    return {
      title: "Variants Profile",
      ranges: null
    }
  },

  async mounted() {
    let response = await fetch(`/composer/api/donor/${this.donor.id}/variants-profile`);
    let ranges = await response.json();
    
    let getLabel = function(chr) {
      let c = chr <= 22 ? `${chr}` : chr == 23 ? "X" : "Y";
      return `${c}`;
    }

    let getValue = function(chr, start, end) {
      let c = getLabel(chr);
      return `${c}.${start}-${end}`;
    };

    let x = ranges.map(range => getValue(range.chr, range.start, range.end));
    let tickValues = ranges.filter(range => range.start == 1).map(range => getValue(range.chr, range.start, range.end));
    let tickLabels = ranges.filter(range => range.start == 1).map(range => getLabel(range.chr));

    let y1 = ranges.map(range => range.ssm?.h);
    let y2 = ranges.map(range => range.ssm?.m);
    let y3 = ranges.map(range => range.ssm?.l);
    let y4 = ranges.map(range => range.ssm?.u);

    let values = ranges.map(range => Math.max(range.ssm?.h || 0, range.ssm?.m || 0, range.ssm?.l || 0, range.ssm?.u || 0));
    values.sort((a,b) => b- a);
    let base = Math.round(values[Math.round(values.length / 2)] * 1.5);
    let gain = Math.round(base * 1.5);
    let loss = Math.round(base * 0.5);

    let yCna = ranges.map(range => {
      return range.tcn > 2.5 ? gain
           : range.tcn < 1.5 ? loss
           : base;

      // return range.tcn;
    });

    let getTrace = function(x, y, name, color) {
      return { 
        x: x, y: y, 
        name: name, 
        marker: { color: color },
        type: 'bar' 
      }
    }

    let getCnvTrace = function(x, y, name, color) {
      return { 
        x: x, y: y, 
        name: name, 
        marker: { line: { width: 10, opacity: 0.3 }, color: color },
        type: 'scatter'
      }
    }

    let trace1 = getTrace(x, y1, "SSM.High", colors.getPaletteColor("red"));
    let trace2 = getTrace(x, y2, "SSM.Moderate", colors.getPaletteColor("orange"));
    let trace3 = getTrace(x, y3, "SSM.Low", colors.getPaletteColor("green"));
    let trace4 = getTrace(x, y4, "SSM.Unknown", colors.getPaletteColor("grey"));
    var trace5 = getCnvTrace(x, yCna, "CNA", colors.getPaletteColor("blue"));

    let data = [trace5, trace1, trace2, trace3, trace4];

    var layout = {
      barmode: 'stack',
      xaxis: {
        title: "Location",
        tickvals: tickValues,
        ticktext: tickLabels,
        tickwidth: 2,
      },
      yaxis: {
        title: "#Mutations",
        tickwidth: 2,
        // type: 'log',
        // autorange: true
      },
    };

    await Plotly.newPlot('profile', data, layout);
  }
}
</script>