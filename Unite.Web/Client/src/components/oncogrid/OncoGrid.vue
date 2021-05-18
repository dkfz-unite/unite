<template>
  <div>
    <div v-show="this.isOncoRendered">
      <div class="onco-toolbar">
        <div>
          <q-btn icon="las la-border-all" @click="toggleGridLines()"></q-btn>
          <q-btn icon="las la-crosshairs" @click="toggleCrosshair()"></q-btn>
          <q-btn icon="las la-undo-alt" @click="reloadGrid()"></q-btn>
        </div>
        <div class="onco-legend-container">
          <div class="onco-legend-square" v-bind:style="{backgroundColor:color}" v-for="(color, key) in colorMap">
            <div class="onco-legend-text">
              {{ key }}
            </div>
          </div>
        </div>
      </div>
      <div id="oncoGrid">
      </div>
    </div>
    <div v-if="!this.isOncoRendered">
      <q-spinner
          color="primary"
          size="3em"
          :thickness="2"
      />
    </div>
  </div>
</template>
<script>
import OncoGrid from "oncogrid";

let colorMap = {};
colorMap['mutation'] = {
  missense_variant: '#ff9b6c',
  frameshift_variant: '#57dba4',
  stop_gained: '#af57db',
  start_lost: '#ff2323',
  stop_lost: '#d3ec00',
  initiator_codon_variant: '#5abaff'
};

let oncoGrid;

export default {
  name: 'oncogrid',
  data() {
    return {
      colorMap: colorMap['mutation'],
      isOncoRendered: false
    }
  },
  methods: {
    reloadGrid() {
      this.oncoGrid.reload();
    },

    toggleCrosshair() {
      this.oncoGrid.toggleCrosshair();
    },

    toggleGridLines() {
      this.oncoGrid.toggleGridLines();
    },
  },
  mounted() {
    "use strict";

    var donors = [
      {"id": "DO1", "age_diagnosis": 49, "alive": true},
      {"id": "DO2", "age_diagnosis": 62, "alive": false},
      {"id": "DO3", "age_diagnosis": 1, "alive": true},
      {"id": "DO4", "age_diagnosis": 59, "alive": true},
      {"id": "DO5", "age_diagnosis": 12, "alive": true},
      {"id": "DO6", "age_diagnosis": 32, "alive": true},
      {"id": "DO7", "age_diagnosis": 80, "alive": true}
    ];


    var genes = [
      {"id": "ENSG00000141510", "symbol": "TP53", "totalDonors": 40},
      {"id": "ENSG00000157764", "symbol": "BRAF", "totalDonors": 21},
      {"id": "ENSG00000155657", "symbol": "TTN", "totalDonors": 12},
      {"id": "ENSG00000164796", "symbol": "CSMD3", "totalDonors": 4}
    ];


    var observations = [
      {"id": "MU1", "donorId": "DO1", "geneId": "ENSG00000157764", "type": "mutation", "consequence": "start_lost"},
      {
        "id": "MU11",
        "donorId": "DO1",
        "geneId": "ENSG00000157764",
        "type": "mutation",
        "consequence": "missense_variant"
      },
      {"id": "MU2", "donorId": "DO1", "geneId": "ENSG00000141510", "type": "mutation", "consequence": "start_lost"},
      {
        "id": "MU3",
        "donorId": "DO2",
        "geneId": "ENSG00000141510",
        "type": "mutation",
        "consequence": "missense_variant"
      },
      {
        "id": "MU4",
        "donorId": "DO3",
        "geneId": "ENSG00000157764",
        "type": "mutation",
        "consequence": "frameshift_variant"
      },
      {
        "id": "MU5",
        "donorId": "DO4",
        "geneId": "ENSG00000157764",
        "type": "mutation",
        "consequence": "frameshift_variant"
      },
      {"id": "MU6", "donorId": "DO4", "geneId": "ENSG00000164796", "type": "mutation", "consequence": "start_lost"},
      {
        "id": "MU7",
        "donorId": "DO5",
        "geneId": "ENSG00000155657",
        "type": "mutation",
        "consequence": "initiator_codon_variant"
      },
      {"id": "MU8", "donorId": "DO5", "geneId": "ENSG00000157764", "type": "mutation", "consequence": "stop_gained"},
      {"id": "MU9", "donorId": "DO6", "geneId": "ENSG00000157764", "type": "mutation", "consequence": "stop_gained"}
    ];

    var donorOpacity = function (d) {
      if (d.type === 'int') {
        return d.value / 100;
      } else {
        return 1;
      }
    };

    var donorFill = function (d) {
      if (d.type === 'bool') {
        if (d.value === true) {
          return '#abc';
        } else {
          return '#f00';
        }
      } else {
        return '#6d72c5';
      }
    };

    var geneOpacity = function (d) {
      return d.value / 40;
    };

    var geneTracks = [
      {'name': 'Total Donors Affected', 'fieldName': 'totalDonors', 'type': 'int', 'group': 'ICGC'},
    ];

    var sortBool = function (field) {
      return function (a, b) {
        if (a[field] && !b[field]) {
          return 1;
        } else if (!a[field] && b[field]) {
          return -1;
        } else {
          return 0;
        }
      };
    };

    var sortInt = function (field) {
      return function (a, b) {
        return a[field] - b[field];
      };
    };

    var donorTracks = [
      {'name': 'Age at Diagnosis', 'fieldName': 'age_diagnosis', 'group': 'Clinical', 'type': 'int', 'sort': sortInt},
      {'name': 'Alive', 'fieldName': 'alive', 'type': 'bool', 'group': 'Clinical', 'sort': sortBool},
      {'name': 'Foobar', 'fieldName': 'foobar', 'type': 'bool', 'group': 'Data', 'sort': sortBool}
    ];

    var params = {
      element: '#oncoGrid',
      donors: donors,
      genes: genes,
      observations: observations,
      heatMap: true,
      trackHeight: 20,
      trackLegendLabel: '<i>?</i>',
      donorTracks: donorTracks,
      donorOpacityFunc: donorOpacity,
      donorFillFunc: donorFill,
      geneTracks: geneTracks,
      geneOpacityFunc: geneOpacity
    };

    this.oncoGrid = new OncoGrid(params);
    this.oncoGrid.render();
    //TODO: maybe use oncoGrid != null instead of boolean property
    this.isOncoRendered = true
  }
};
</script>

<style>
#oncoGrid {
  cursor: pointer;
}

#oncoGrid .crosshair-mode {
  cursor: crosshair;
}

#oncoGrid .background {
  fill: #fff;
  stroke: black;
  stroke-width: 0.5;
}

#oncoGrid line {
  stroke: grey;
  stroke-opacity: .5;
  shape-rendering: crispEdges;

}

#oncoGrid line .og-vertical-cross {
  stroke: black;
  stroke-opacity: 1;
  stroke-width: 2;
  shape-rendering: crispEdges;

}

#oncoGrid line .og-horizontal-cross {
  stroke: black;
  stroke-opacity: 1;
  stroke-width: 2;
  shape-rendering: crispEdges;

}

#oncoGrid .og-histogram-axis {
  stroke: #000;
  stroke-opacity: 0.5;
  shape-rendering: crispEdges;
}

#oncoGrid textarea {
  padding: 2px;
  width: 714px;
  height: 360px;
}

#oncoGrid .og-gene-label {
  cursor: move;
}

#oncoGrid .og-remove-gene:before {
  content: 'Remove';
}

#oncoGrid .og-remove-gene {
  cursor: pointer;
  font-size: 0.7rem;
  font-family: sans-serif;
  color: red;
}

#oncoGrid .og-label-text-font {
  font-size: 0.5rem;
}

#oncoGrid .og-track-group-label {
  font-size: 0.8em;
}

#oncoGrid .og-sortable-rect:hover {
  stroke: red;
  stroke-width: 3;
}

#oncoGrid .og-highlight {
  stroke: green;
  stroke-width: 1;
}

.og-tooltip-oncogrid {
  font-weight: 300;
  position: absolute;
  z-index: 100001;
  display: block;
  visibility: visible;
  font-size: .9rem;
  pointer-events: none;
  line-height: 1.6rem;
  border: 1px solid #B3B3B3;
  background-color: #fff;
  border-radius: 3px;
  -webkit-filter: drop-shadow(0 1px 3px hsla(0, 0%, 71%, .43));
  box-shadow: 0 1px 3px hsl(0, 71%, 43%);
  -moz-box-shadow: 0 1px 3px hsla(0, 0%, 71%, .43);
  filter: drop-shadow(0 1px 3px rgba(180, 180, 180, .43));
  padding: 5px;
}

.onco-legend-container {
  flex: 1 1 0;
  background: #e6e6e6;
  margin-left: 50px;
}

.onco-legend-square {
  display: inline-block;
  margin: 5px;
}

.onco-legend-text {
  padding: 5px;
  background: #e6e6e6;
  margin-left: 30px;
  width: 150px;
}

.onco-toolbar {
  display: flex;
  flex-direction: row;
}

</style>