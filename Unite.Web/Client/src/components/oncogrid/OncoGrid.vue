<template>
  <div class="col">
    <div class="row">
      <q-expansion-item default-opened dense dense-toggle expand-separator icon="las la-tools" label="Oncogrid Toolbar">
        <div class="col">
          <div class="onco-toolbar">
            <q-btn icon="las la-border-all" @click="toggleGridLines()"></q-btn>
            <q-btn icon="las la-crosshairs" @click="toggleCrosshair()"></q-btn>
            <q-btn icon="las la-undo-alt" @click="reloadGrid()"></q-btn>
          </div>
        </div>

        <div class="col">
          <div class="onco-legend-container">
            <div class="onco-legend-square" v-bind:style="{backgroundColor:availableMutation.color}" v-for="(availableMutation, key) in availableMutationsWithLabelsAndColors">
              <div class="onco-legend-text">
                {{ availableMutationsWithLabelsAndColors[key].label }}
              </div>
            </div>
          </div>
        </div>
      </q-expansion-item>
    </div>
    <div class="row">
      <div class="col">
        <div id="oncoGrid"/>
      </div>
    </div>
  </div>
</template>
<script>
import OncoGrid from "oncogrid";
import UOncoGridFilters from "../common/filters/OncoGridFilters.vue";

let availableMutationsWithLabelsAndColors = [
  { value: "transcript_ablation", label: "Transcript ablation", color: '#696969' },
  { value: "splice_acceptor_variant", label: "Splice acceptor", color: '#c0c0c0' },
  { value: "splice_donor_variant", label: "Splice donor", color: '#556b2f' },
  { value: "stop_gained", label: "Stop gained", color: '#228b22' },
  { value: "frameshift_variant", label: "Frameshift", color: '#8b0000' },
  { value: "stop_lost", label: "Stop lost", color: '#808000' },
  { value: "start_lost", label: "Start lost", color: '#483d8b' },
  { value: "transcript_amplification", label: "Transcript amplification", color: '#008080' },
  { value: "inframe_insertion", label: "Inframe insertion", color: '#4682b4' },
  { value: "inframe_deletion", label: "Inframe deletion", color: '#9acd32' },
  { value: "missense_variant", label: "Missense", color: '#00008b' },
  { value: "protein_altering_variant", label: "Protein altering", color: '#daa520' },
  { value: "splice_region_variant", label: "Splice region", color: '#7f007f' },
  { value: "incomplete_terminal_codon_variant", label: "Incomplete terminal codon", color: '#8fbc8f' },
  { value: "start_retained_variant", label: "Start retained", color: '#b03060' },
  { value: "stop_retained_variant", label: "Stop retained", color: '#ff0000' },
  { value: "synonymous_variant", label: "Synonymous", color: '#00ced1' },
  { value: "coding_sequence_variant", label: "Coding sequence", color: '#ff8c00' },
  { value: "mature_miRNA_variant", label: "Mature miRNA", color: '#ffff00' },
  { value: "5_prime_UTR_variant", label: "UTR 5", color: '#00ff00' },
  { value: "3_prime_UTR_variant", label: "UTR 3", color: '#00ff7f' },
  { value: "non_coding_transcript_exon_variant", label: "Non coding transcript exon", color: '#dc143c' },
  { value: "intron_variant", label: "Intron", color: '#0000ff' },
  { value: "NMD_transcript_variant", label: "NMD transcript", color: '#a020f0' },
  { value: "non_coding_transcript_variant", label: "Non coding transcript", color: '#ff00ff' },
  { value: "upstream_gene_variant", label: "Upstream gene", color: '#1e90ff' },
  { value: "downstream_gene_variant", label: "Downstream gene", color: '#fa8072' },
  { value: "TFBS_ablation", label: "TFBS ablation", color: '#dda0dd' },
  { value: "TFBS_amplification", label: "TFBS amplification", color: '#ff1493' },
  { value: "TF_binding_site_variant", label: "TF binding site", color: '#7b68ee' },
  { value: "regulatory_region_ablation", label: "Regulatory region ablation", color: '#ee82ee' },
  { value: "regulatory_region_amplification", label: "Regulatory region amplification", color: '#98fb98' },
  { value: "feature_elongation", label: "Feature elongation", color: '#87cefa' },
  { value: "regulatory_region_variant", label: "Regulatory region", color: '#7fffd4' },
  { value: "feature_truncation", label: "Feature truncation", color: '#ffe4b5' },
  { value: "intergenic_variant", label: "Intergenic", color: '#ffb6c1' }
];

let colorMap = {};
colorMap['mutation'] = {};
for (let i = 0; i < availableMutationsWithLabelsAndColors.length; i++) {
  colorMap['mutation'][availableMutationsWithLabelsAndColors[i].value] = availableMutationsWithLabelsAndColors[i].color;
}

let oncoGrid;

export default {
  name: 'oncogrid',
  props: ["oncoGridData"],
  data() {
    return {
      colorMap: colorMap['mutation'],
      availableMutationsWithLabelsAndColors: availableMutationsWithLabelsAndColors,
    }
  },
  methods: {
    onInput() {
      this.$emit("filter");
    },

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
  },

  components: {
    UOncoGridFilters: UOncoGridFilters,
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