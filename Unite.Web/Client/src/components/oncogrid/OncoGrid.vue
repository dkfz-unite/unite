<template>
  <div class="col q-gutter-sm">
    <!-- Grid cell tooltip -->
    <q-tooltip v-if="!!targetGridCellData" :target="targetGridCell" content-class="bg-grey-1 text-grey-10 shadow-5 text-caption">
      <div class="col">
        <div>
          <span class="text-weight-light">Donor: </span>
          <span class="text-weight-medium">
            {{targetGridCellData.donor}}
          </span>
        </div>
        <div>
          <span class="text-weight-light">Gene: </span>
          <span class="text-weight-medium">
            {{targetGridCellData.gene}}
          </span>
        </div>
        <div>
          <span class="text-weight-light">Mutation: </span>
          <span class="text-weight-medium">
            {{targetGridCellData.mutation}}
          </span>
        </div>
        <div>
          <span class="text-weight-light">Consequence: </span>
          <span class="text-weight-medium" :style="{ color: getImpactColor(targetGridCellData.consequence.impact)}">
            {{targetGridCellData.consequence.name}}
          </span>
        </div>
      </div>
    </q-tooltip>

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
        <q-card class="q-px-lg q-py-sm">
          <div id="oncoGrid" :class="{ 'og-crosshair-mode' : crosshairMode }" />
        </q-card>
      </div>

      <div class="col-2">
        <div class="col q-px-md q-py-sm">
          <div class="row q-col-gutter-xs">
            <div class="col-12" v-for="(paletteColor, index) in colorPalette" :key="index">
              <div class="row q-gutter-x-xs justyfy-left content-center no-wrap">
                <div style="height: 20px; width: 20px" v-bind:style="{ backgroundColor: paletteColor.color }"></div>
                <span class="text-body2">{{ paletteColor.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { colors } from "quasar";

import OncoGrid from "oncogrid";
import UOncoGridFilters from "../common/filters/OncoGridFilters.vue";

import consequences from "./consequences.js";

export default {
  props: ["oncoGridData"],

  data() {
    return {
      oncogrid: null,
      gridLinesMode: true,
      crosshairMode: false,
      heatMapMode: false,

      targetGridCell: false,
      targetGridCellData: null,

      colorMap: consequences.reduce((self, item) => { return { ...self, [item["type"]]: item.color } })
    }
  },

  computed: {
    colorPalette() {
      if (!!this.oncoGridData) {
        let uniqueConsequences = this.oncoGridData.observations
          .filter((value, index, self) => self.findIndex((uniqueValue) => uniqueValue.consequence === value.consequence) === index)
          .map((value) => value.consequence);

        let palette = consequences
          .filter((value) => uniqueConsequences.includes(value.type));

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
    },

    // Grid cell mouse over
    onGridCellHover(data) {
      var elements = document.querySelectorAll(":hover");
      var element = elements[elements.length -1];

      this.targetGridCellData = {
        donor: data.donor.id,
        gene: data.gene.symbol ?? data.gene.id,
        mutation: data.observation.id,
        consequence: consequences.filter(consequence => consequence.type == data.observation.consequence)[0]
      };

      this.targetGridCell = (element);
    },

    // Grid cell click
    onGridCellClick(data) {
      // TODO: Navigate to mutation page
      console.log(data);
    },


    // Track group mouse over
    onTrackGroupHover(data) {

    },

    // Track cell mouse over
    onTrackCellHover(data) {

    },

    // Track cell click
    onTrackCellClick(data) {

    },

    getImpactColor(impact) {
      switch (impact) {
        case "High": return colors.getPaletteColor("red");
        case "Moderate": return colors.getPaletteColor("orange");
        case "Low": return colors.getPaletteColor("green");
        default: return colors.getPaletteColor("grey");
      }
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
      colorMap: this.colorMap,
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

    this.oncoGrid.on('gridMouseOver', this.onGridCellHover);
    this.oncoGrid.on('gridClick', this.onGridCellClick);
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
