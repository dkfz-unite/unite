<template>
  <div>
    <div v-show="this.oncoGridData != null">
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
    <div v-if="this.oncoGridData == null">
      No suitable data found for OncoGrid
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
  initiator_codon_variant: '#5abaff',
  intron_variant: '#008080',
  upstream_gene_variant: '#800000',
  downstream_gene_variant: '#000080',
  synonymous_variant: '#808000',
  non_coding_transcript_exon_variant: '#c0c0c0'
};

let oncoGrid;

export default {
  name: 'oncogrid',
  props: ["oncoGridData"],
  data() {
    return {
      colorMap: colorMap['mutation'],
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

  async mounted() {
    if (this.oncoGridData == null) {
      return
    }

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

    var sortString = function (field) {
      return function (a, b) {
        return a[field].localeCompare(b[field]);
      };
    };

    /*  
      name - string - The name and label for the track
      fieldName - string - The field of the donor/gene object to read
      type - string - The type of the track data, not used by OncoGrid internally, but allows user to group behaviour for styling and the opacity function passed in for the tracks.
      sort - function - The function responsible for sorting
      group - string - the name of the group the track belongs to.
      collapsed - bool - if true, and the track group is in the expandableGroups array, then the track by default will not be shown.
    */
    var donorTracks = [
      /*  
        Copy Number Somatic Mutations (CNSM)
        Structural Somatic Mutations (StSM)
        Simple Germline Variants (SGV)
        Array-based DNA Methylation (METH-A)
        Sequence-based DNA Methylation (METH-S)
        Array-based Gene Expression (EXP-A)
        Sequence-based Gene Expression (EXP-S)
        Protein Expression (PEXP)
        Sequence-based miRNA Expression (miRNA)
        Exon Junctions (JCN)
      */
      {'name': 'Age at Diagnosis', 'fieldName': 'age', 'type': 'int', 'sort': sortInt},
      {'name': 'Vital Status', 'fieldName': 'vitalStatus', 'type': 'vital', 'sort': sortString},
      {'name': 'Gender', 'fieldName': 'gender', 'type': 'gender', 'sort': sortString},
      // { 'name': 'CNSM', 'fieldName': 'cnsmExists', 'type': 'bool', 'sort': sortBool},
      // { 'name': 'STSM', 'fieldName': 'stsmExists', 'type': 'bool', 'sort': sortBool},
      // { 'name': 'SGV', 'fieldName': 'sgvExists', 'type': 'bool', 'sort': sortBool},
      // { 'name': 'METH-A', 'fieldName': 'methaExists', 'type': 'bool', 'sort': sortBool},
      // { 'name': 'METH-S', 'fieldName': 'methsExists', 'type': 'bool', 'sort': sortBool},
      // { 'name': 'EXP-A', 'fieldName': 'expaExists', 'type': 'bool', 'sort': sortBool},
      // { 'name': 'EXP-S', 'fieldName': 'expsExists', 'type': 'bool', 'sort': sortBool},
      // { 'name': 'PEXP', 'fieldName': 'pexpExists', 'type': 'bool', 'sort': sortBool},
      // { 'name': 'miRNA-S', 'fieldName': 'mirnasExists', 'type': 'bool', 'sort': sortBool},
      // { 'name': 'JCN', 'fieldName': 'jcnExists', 'type': 'bool', 'sort': sortBool}
    ];

    var params = {
      element: '#oncoGrid',
      donors: this.oncoGridData.donors,
      genes: this.oncoGridData.genes,
      observations: this.oncoGridData.observations,
      heatMap: false,
      trackHeight: 20,
      trackLegendLabel: '<i>?</i>',
      donorTracks: donorTracks,
      colorMap: this.colorMap,
      donorOpacityFunc: donorOpacity,
      donorFillFunc: donorFill,
      geneOpacityFunc: geneOpacity
    };

    this.oncoGrid = new OncoGrid(params);
    this.oncoGrid.render();
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