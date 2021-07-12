<template>
  <div class="col q-gutter-sm">
    <div class="row">
      <q-btn-group>
        <q-btn icon="las la-border-all" @click="toggleGridLines()" />
        <q-btn icon="las la-sort-amount-down" @click="toggleCluster()" />
        <q-btn icon="las la-burn" @click="toggleHeatMap()" />
        <q-btn icon="las la-crosshairs" @click="toggleCrosshair()" />
        <q-btn icon="las la-undo-alt" @click="reloadGrid()" />
      </q-btn-group>
    </div>

    <div class="row">
      <div class="col-10">
        <q-card class="q-px-lg q-py-sm" style="margin-bottom: 100px">
          <div id="oncoGrid" :class="{ 'og-crosshair-mode' : crosshairMode }" />
        </q-card>
      </div>

      <div class="col-2">
        <div class="col q-px-md q-py-sm">
          <div class="row q-col-gutter-xs">
            <div class="col-12" v-for="(paletteColor, index) in colorPalette" :key="index">
              <div class="row q-gutter-x-xs justyfy-left content-center no-wrap">
                <div style="height: 20px; width: 20px" v-bind:style="{ backgroundColor: paletteColor.color }"></div>
                <span class="text-body2">{{ paletteColor.label }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { colors } from 'quasar'
import OncoGrid from "oncogrid";
import UOncoGridFilters from "../common/filters/OncoGridFilters.vue";

let availableMutationsWithLabelsAndColors = [
  { value: "transcript_ablation", label: "Transcript ablation", color: colors.getPaletteColor("red-10") },
  { value: "splice_acceptor_variant", label: "Splice acceptor", color: colors.getPaletteColor("red-9") },
  { value: "splice_donor_variant", label: "Splice donor", color: colors.getPaletteColor("red-8") },
  { value: "stop_gained", label: "Stop gained", color: colors.getPaletteColor("red-7") },
  { value: "frameshift_variant", label: "Frameshift", color: colors.getPaletteColor("red-6") },
  { value: "stop_lost", label: "Stop lost", color: colors.getPaletteColor("red-5") },
  { value: "start_lost", label: "Start lost", color: colors.getPaletteColor("red-4") },
  { value: "transcript_amplification", label: "Transcript amplification", color: colors.getPaletteColor("red-3") },

  { value: "inframe_insertion", label: "Inframe insertion", color: colors.getPaletteColor("orange-10") },
  { value: "inframe_deletion", label: "Inframe deletion", color: colors.getPaletteColor("orange-9") },
  { value: "missense_variant", label: "Missense", color: colors.getPaletteColor("orange-8") },
  { value: "protein_altering_variant", label: "Protein altering", color: colors.getPaletteColor("orange-7") },

  { value: "splice_region_variant", label: "Splice region", color: colors.getPaletteColor("green-10") },
  { value: "incomplete_terminal_codon_variant", label: "Incomplete terminal codon", color: colors.getPaletteColor("green-9") },
  { value: "start_retained_variant", label: "Start retained", color: colors.getPaletteColor("green-8") },
  { value: "stop_retained_variant", label: "Stop retained", color: colors.getPaletteColor("green-7") },
  { value: "synonymous_variant", label: "Synonymous", color: colors.getPaletteColor("green-6") },

  { value: "coding_sequence_variant", label: "Coding sequence", color: colors.getPaletteColor("blue-grey-7") },
  { value: "mature_miRNA_variant", label: "Mature miRNA", color: colors.getPaletteColor("blue-grey-7") },
  { value: "5_prime_UTR_variant", label: "UTR 5", color: colors.getPaletteColor("blue-grey-7") },
  { value: "3_prime_UTR_variant", label: "UTR 3", color: colors.getPaletteColor("blue-grey-6") },
  { value: "non_coding_transcript_exon_variant", label: "Non coding transcript exon", color: colors.getPaletteColor("blue-grey-6") },
  { value: "intron_variant", label: "Intron", color: colors.getPaletteColor("blue-grey-6") },
  { value: "NMD_transcript_variant", label: "NMD transcript", color: colors.getPaletteColor("blue-grey-5") },
  { value: "non_coding_transcript_variant", label: "Non coding transcript", color: colors.getPaletteColor("blue-grey-5") },
  { value: "upstream_gene_variant", label: "Upstream gene", color: colors.getPaletteColor("blue-grey-5") },
  { value: "downstream_gene_variant", label: "Downstream gene", color: colors.getPaletteColor("blue-grey-4") },
  { value: "TFBS_ablation", label: "TFBS ablation", color: colors.getPaletteColor("blue-grey-4") },
  { value: "TFBS_amplification", label: "TFBS amplification", color: colors.getPaletteColor("blue-grey-4") },
  { value: "TF_binding_site_variant", label: "TF binding site", color: colors.getPaletteColor("blue-grey-3") },
  { value: "regulatory_region_ablation", label: "Regulatory region ablation", color: colors.getPaletteColor("orange-6") },
  { value: "regulatory_region_amplification", label: "Regulatory region amplification", color: colors.getPaletteColor("blue-grey-3") },
  { value: "feature_elongation", label: "Feature elongation", color: colors.getPaletteColor("blue-grey-3") },
  { value: "regulatory_region_variant", label: "Regulatory region", color: colors.getPaletteColor("blue-grey-2") },
  { value: "feature_truncation", label: "Feature truncation", color: colors.getPaletteColor("blue-grey-2") },
  { value: "intergenic_variant", label: "Intergenic", color: colors.getPaletteColor("blue-grey-2") },
];

let colorMap = {};

availableMutationsWithLabelsAndColors.forEach(option => colorMap[option.value] = option.color);

export default {
  name: "oncogrid",
  props: ["oncoGridData"],

  data() {
    return {
      gridLinesMode: true,
      crosshairMode: false,
      heatMapMode: false
    }
  },

  computed: {
    colorPalette() {
      if (!!this.oncoGridData) {
        let consequences = this.oncoGridData.observations
          .filter((value, index, self) => self.findIndex((uniqueValue) => uniqueValue.consequence === value.consequence) === index)
          .map((value) => value.consequence);

        let palette = availableMutationsWithLabelsAndColors
          .filter((value) => consequences.includes(value.value));

        return palette;
      } else {
        return null;
      }
    },
  },

  methods: {
    toggleCluster() {
      this.oncoGrid.cluster();
    },

    reloadGrid() {
      this.gridLinesMode = true;
      this.crosshairMode = false;
      this.heatMapMode = false;
      this.oncoGrid.reload();
      this.oncoGrid.setGridLines(this.gridLinesMode);
    },

    toggleCrosshair() {
      this.oncoGrid.toggleCrosshair();
      this.crosshairMode = this.oncoGrid.crosshairMode;
    },

    toggleGridLines() {
      this.oncoGrid.toggleGridLines();
      this.gridLinesMode = this.oncoGrid.drawGridLines;
    },

    toggleHeatMap() {
      this.oncoGrid.toggleHeatmap();
      this.heatMapMode = this.oncoGrid.heatMapMode;
    }
  },

  async mounted() {
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

    var sortBool = function (field) {
      return function (a, b) {
        return b[field] - a[field];
      }
    }

    var donorFill = function (track) {
      if (track.type == "age") {
        return colors.getPaletteColor("purple-10");
      } else if (track.type == "vital") {
        return track.value == true ? colors.getPaletteColor("green-5") : colors.getPaletteColor("red-5");
      } else if (track.type == "gender") {
        return track.value == "Male" ? colors.getPaletteColor("blue-5") : colors.getPaletteColor("orange-5");
      } else {
        return colors.getPaletteColor("blue-grey");
      }
    };

    var donorOpacity = function (track) {
      if (track.type == "age") {
        return track.value / 100 + 0.1;
      } else {
        return 1;
      }
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
      { name: "Age", fieldName: "age", type: "age", sort: sortInt, group: "Clinical Data" },
      { name: "Vital Status", fieldName: "vitalStatus", type: "vital", sort: sortBool, group: "Clinical Data" },
      { name: "Gender", fieldName: "gender", type: "gender", sort: sortString, group: "Clinical Data" }
    ];

    var params = {
      element: "#oncoGrid",
      donors: this.oncoGridData.donors,
      genes: this.oncoGridData.genes,
      observations: this.oncoGridData.observations,
      donorTracks: donorTracks,
      donorOpacityFunc: donorOpacity,
      donorFillFunc: donorFill,
      colorMap: colorMap,
      trackHeight: 15,
      scaleToFit: true,
      // width: 500,
      // height: 500,
      trackLegendLabel: "<i class='las la-question-circle'></i>",
      margin: { top: 0, right: 0, bottom: 0, left: 0 }
    };

    this.oncoGrid = new OncoGrid(params);
    this.oncoGrid.render();
    this.oncoGrid.setGridLines(this.gridLinesMode);
  },

  components: {
    UOncoGridFilters: UOncoGridFilters,
  },
};
</script>

<style>
  /* Grid background */
  #oncoGrid .background {
    fill: white;
    stroke: black;
    stroke-width: 0.1;
  }

  /* Grid line */
  #oncoGrid line {
    stroke: black;
    stroke-width: 0.1;
  }


  /* Crosshair mode */
  #oncoGrid.og-crosshair-mode {
    cursor: crosshair;
  }

  /* Crosshair line (vertical) */
  #oncoGrid line.og-vertical-cross {
    stroke: black;
    stroke-width: 0.5;
  }

  /* Crosshair line (horizontal) */
  #oncoGrid line.og-horizontal-cross {
    stroke: black;
    stroke-width: 0.5;
  }


  /* Axis label */
  #oncoGrid .og-label-text-font {
    font-size: 0.5rem;
  }

  /* Axis bar */
  #oncoGrid .og-sortable-bar {
    cursor: pointer;
  }

  /* Axis bar (hover) */
  #oncoGrid .og-sortable-bar:hover {
    fill-opacity: 0.5;
  }


  /* Gene label */
  #oncoGrid .og-gene-label {
    font-size: 0.5rem;
  }

  /* Gene label (hover) */
  #oncoGrid .og-gene-label:hover {
    cursor: grab;
  }

  /* Gene label (active) */
  #oncoGrid .og-gene-label:active {
    fill: blue;
    cursor: grabbing;
  }

  /* Gene grid cell */
  #oncoGrid .og-sortable-rect {
    cursor: pointer;
  }

  /* Gene grid cell (hover) */
  #oncoGrid .og-sortable-rect:hover {
    fill-opacity: 0.5;
  }

  
  /* Track group label */
  #oncoGrid .og-track-group-label {
    font-size: 0.8em;
    cursor: pointer;
  }

  /* Track label */
  #oncoGrid .og-track-label {
    font-size: 0.5rem;
    cursor: pointer;
  }

  /* Track label (hover) */
  #oncoGrid .og-track-label:hover {
    fill: blue;
  }

  /* Track grid cell */
  #oncoGrid .og-track-data {
    cursor: pointer;
  }

  /* Track grid cell (hover) */
  #oncoGrid .og-track-data:hover {
    fill-opacity: 0.5;
  }


  /* Tooltip */
  #oncoGrid .og-tooltip-oncogrid {
    position: absolute;
    z-index: 1;
    padding: 5px;
    border: 1px solid grey;
    border-radius: 3px;
    background-color: white;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2);
  }
</style>
