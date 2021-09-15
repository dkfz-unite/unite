<template>
  <div class="col q-gutter-sm">
    <u-histogram-bar-tooltip :target="targetHistogramBar" :data="targetHistogramBarData" />
    <u-grid-cell-tolltip :target="targetGridCell" :data="targetGridCellData" />
    <u-track-cell-tooltip :target="targetTrackCell" :data="targetTrackCellData" />
    <u-clinical-data-track-tooltip :target="clinicalDataTrack" />

    <div class="row">
      <q-btn-group>
        <q-btn icon="las la-border-all" :class="{ 'bg-grey-3 text-blue-8': showGridLines }" @click="toggleGridLines()" />
        <q-btn icon="las la-burn" :class="{ 'bg-grey-3 text-blue-8': heatMapMode }" @click="toggleHeatMap()" />
        <q-btn icon="las la-crosshairs" :class="{ 'bg-grey-3 text-blue-8': crosshairMode }" @click="toggleCrosshair()" />
        <q-btn icon="las la-sort-amount-down" @click="toggleCluster()" />
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

import UHistogramBarTooltip from "./tooltips/HistogramBarTooltip.vue";
import UGridCellTolltip from "./tooltips/GridCellTooltip.vue";
import UTrackCellTooltip from "./tooltips/TrackCellTooltip.vue";
import UClinicalDataTrackTooltip from "./tooltips/ClinicalDataTrackTooltip.vue";
import UOncoGridFilters from "../../_common/filters/visualization/OncoGridFilters.vue";

import consequences from "./consequences.js";

export default {
  props: ["data"],

  data() {
    return {
      oncogrid: null,
      showGridLines: true,
      crosshairMode: false,
      heatMapMode: false,

      targetHistogramBar: false,
      targetHistogramBarData: null,
      targetGridCell: false,
      targetGridCellData: null,
      targetTrackCell: false,
      targetTrackCellData: null,
      clinicalDataTrack: false,

      colorMap: consequences.reduce((self, item) => { return { ...self, [item["type"]]: item.color } })
    }
  },

  computed: {
    colorPalette() {
      if (!!this.data) {
        let uniqueConsequences = this.data.observations
          .filter((value, index, self) => self.findIndex((uniqueValue) => uniqueValue.consequence === value.consequence) === index)
          .map((value) => value.consequence);

        let palette = consequences
          .filter((value) => uniqueConsequences.includes(value.type));

        return palette;
      } else {
        return null;
      }
    }
  },

  methods: {
    toggleGridLines() {
      this.showGridLines = !this.showGridLines;

      this.oncoGrid.setGridLines(this.showGridLines);
    },

    toggleHeatMap() {
      this.heatMapMode = !this.heatMapMode;

      this.oncoGrid.setHeatmap(this.heatMapMode);
    },

    toggleCrosshair() {
      this.crosshairMode = !this.crosshairMode;

      this.oncoGrid.setCrosshair(this.crosshairMode);
    },

    toggleCluster() {
      this.oncoGrid.cluster();
    },

    reloadGrid() {
      this.showGridLines = true;
      this.crosshairMode = false;
      this.heatMapMode = false;

      this.oncoGrid.reload();
      this.oncoGrid.setGridLines(this.showGridLines);
      this.oncoGrid.setCrosshair(this.crosshairMode);
      this.oncoGrid.setHeatmap(this.heatMapMode);
      
    },


    onHistogramHover(data) {
      let element = this.getHoverElement();
      let properties = null;

      if (data.domain.x != undefined) {
        properties = [
          { key: "Donor", value: data.domain.displayId },
          { key: "Mutations", value: data.domain.count },
        ];
      } else {
        properties = [
          { key: "Gene", value: data.domain.symbol },
          { key: "Mutations", value: data.domain.count },
        ];
      }

      this.targetHistogramBarData = properties;
      this.targetHistogramBar = element;
    },

    onHistogramClick(data) {
      if (data.type === "donor") {
        this.$router.push({ name: "donor", params: { id: data.domain.id }});
      } else {
        window.open(`http://feb2014.archive.ensembl.org/Homo_sapiens/Gene/Summary?db=core;g=${data.domain.ensemblId}`, '_blank').focus();
      }
    },


    onGridCellHover(data) {
      var element = this.getHoverElement();

      let consequence = consequences.filter(consequence => consequence.type == data.observation.consequence)[0];

      let properties = [
        { key: "Donor", value: data.donor.displayId },
        { key: "Gene", value: data.gene.symbol },
        { key: "Mutation", value: data.observation.code },
        { key: "Consequence", value: consequence.name, color: this.getImpactColor(consequence.impact) },
      ];

      this.targetGridCellData = properties;
      this.targetGridCell = element;
    },

    onGridCellClick(data) {
      this.$router.push({ name: "mutation", params: { id: data.observation.id }});
    },


    onTrackGroupHover(data) {
      var element = this.getHoverElement();

      if (data.group == "Clinical Data") {
        this.clinicalDataTrack = element;
      }
    },

    onTrackCellHover(data) {
      var element = this.getHoverElement();

      if(data.type === "donor") {
        let properties = [{ key: "Donor", value: data.domain.displayId }];

        if (data.domain.type === "age") {
          properties.push({ key: "Age", value: data.domain.value });
        } else if (data.domain.type === "vital") {
          properties.push({key: "Vital status", value: data.domain.value ? "Living" : "Deceased" });
        } else if (data.domain.type === "gender") {
          properties.push({key: "Gender", value: data.domain.value });
        }

        this.targetTrackCellData = properties;
        this.targetTrackCell = element;
      }
    },

    onTrackCellClick(data) {
      this.$router.push({ name: "donor", params: { id: data.domain.id }});
    },


    getImpactColor(impact) {
      switch (impact) {
        case "High": return "red";
        case "Moderate": return "orange";
        case "Low": return "green";
        default: return "grey";
      }
    },

    getHoverElement() {
      var elements = document.querySelectorAll(":hover");
      var element = elements[elements.length -1];

      return element;
    }
  },

  mounted() {
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
      donors: this.data.donors,
      genes: this.data.genes,
      observations: this.data.observations,
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
    this.oncoGrid.setGridLines(this.showGridLines);
    this.oncoGrid.render();

    this.oncoGrid.on("histogramMouseOver", this.onHistogramHover);
    this.oncoGrid.on("histogramClick", this.onHistogramClick);
    this.oncoGrid.on("gridMouseOver", this.onGridCellHover);
    this.oncoGrid.on("gridClick", this.onGridCellClick);
    this.oncoGrid.on("trackLegendMouseOver", this.onTrackGroupHover);
    this.oncoGrid.on("trackMouseOver", this.onTrackCellHover);
    this.oncoGrid.on("trackClick", this.onTrackCellClick);
  },

  components: {
    UHistogramBarTooltip: UHistogramBarTooltip,
    UGridCellTolltip: UGridCellTolltip,
    UTrackCellTooltip: UTrackCellTooltip,
    UClinicalDataTrackTooltip: UClinicalDataTrackTooltip,
    UOncoGridFilters: UOncoGridFilters,
  },
};
</script>

<style lang="scss">
  @import '@/styles/quasar.variables.scss';

  /* Grid background */
  #oncoGrid .background {
    fill: $grey-1;
    stroke: $grey-10;
    stroke-width: 0.1;
  }

  /* Grid line */
  #oncoGrid line {
    stroke: $grey-10;
    stroke-width: 0.2;
  }

  /* Crosshair mode */
  #oncoGrid.og-crosshair-mode {
    cursor: crosshair;
  }

  /* Crosshair line (vertical) */
  #oncoGrid line.og-vertical-cross {
    stroke: $grey-10;
    stroke-width: 0.5;
  }

  /* Crosshair line (horizontal) */
  #oncoGrid line.og-horizontal-cross {
    stroke: $grey-10;
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
  #oncoGrid .og-gene-label {
    cursor: grab;
  }

  /* Gene label (active) */
  #oncoGrid .og-gene-label:active {
    fill: $blue-8;
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
    fill: $blue-8;
  }

  /* Track grid cell */
  #oncoGrid .og-track-data {
    cursor: pointer;
  }

  /* Track grid cell (hover) */
  #oncoGrid .og-track-data:hover {
    fill-opacity: 0.5;
  }
</style>
