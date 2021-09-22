<template>
  <div class="col q-gutter-sm">
    <u-histogram-bar-tooltip :target="targetHistogramBar" :data="targetHistogramBarData" />
    <u-grid-cell-tolltip :target="targetGridCell" :data="targetGridCellData" />
    <u-track-cell-tooltip :target="targetTrackCell" :data="targetTrackCellData" />
    <u-clinical-data-track-tooltip :target="clinicalDataTrack" />

    <div class="row">
      <q-btn-group>
        <q-btn
          icon="las la-border-all"
          title="Toggle grid lines"
          :class="{ 'bg-grey-3 text-blue-8': showGridLines }"
          @click="toggleGridLines()"
        />
        <q-btn
          icon="las la-burn"
          title="Toggle heat map"
          :class="{ 'bg-grey-3 text-blue-8': heatMapMode }"
          @click="toggleHeatMap()"
        />
        <q-btn
          icon="las la-crosshairs"
          title="Toggle zoom"
          :class="{ 'bg-grey-3 text-blue-8': crosshairMode }"
          @click="toggleCrosshair()"
        />
        <q-btn
          icon="las la-sort-amount-down"
          title="Reset genes"
          @click="toggleCluster()"
        />
        <q-btn
          icon="las la-undo-alt"
          title="Reset grid"
          @click="reloadGrid()"
        />
      </q-btn-group>
    </div>

    <div class="row">
      <div class="col-10">
        <q-card class="q-pa-sm">
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

import consequences from "../_common/consequences.js";
import oncogridColors from "./oncogrid-colors.js";
import donorTracks from "./oncogrid-tracks-donor";

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
      clinicalDataTrack: false
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

  mounted() {
    let parameters = {
      element: "#oncoGrid",
      donors: this.data.donors,
      genes: this.data.genes,
      observations: this.data.observations,
      donorTracks: donorTracks,
      donorFillFunc: this.getDonorTrackCellColor,
      donorOpacityFunc: this.getDonorTrackCellOpacity,
      colorMap: oncogridColors,
      trackHeight: 15,
      scaleToFit: true,
      width: 970,
      trackLegendLabel: "<i class='las la-question-circle'></i>",
      margin: { top: 0, right: 0, bottom: 0, left: 0 }
    };

    this.initializeGrid(parameters);
  },

  methods: {
    initializeGrid(parameters) {
      this.oncoGrid = new OncoGrid(parameters);
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
      } else if (data.type === "gene") {
        this.$router.push({ name: "gene", params: { id: data.domain.id }});
      }
    },


    onGridCellHover(data) {
      let element = this.getHoverElement();

      let consequence = consequences.find(consequence => consequence.type == data.observation.consequence);

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

    getDonorTrackCellColor(trackCell) {
      if (trackCell.type == "age") {
        return trackCell.value != null ? colors.getPaletteColor("purple-6") :
               colors.getPaletteColor("grey-4")
      } else if (trackCell.type == "gender") {
        return trackCell.value == "Male" ? colors.getPaletteColor("blue-4") : 
               trackCell.value == "Female" ? colors.getPaletteColor("orange-4") :
               trackCell.value == "Other" ? colors.getPaletteColor("pink-4") :
               colors.getPaletteColor("grey-4");
      } else if (trackCell.type == "vitalStatus") {
        return trackCell.value == true ? colors.getPaletteColor("green-4") : 
               trackCell.value == false ? colors.getPaletteColor("red-4") :
               colors.getPaletteColor("grey-4");
      } else {
        return colors.getPaletteColor("grey-4");
      }
    },

    getDonorTrackCellOpacity(trackCell) {
      if (trackCell.type == "age") {
        return trackCell.value / 100 + 0.1;
      } else {
        return 1;
      }
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
    font-size: 0.6rem;
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
    font-size: 0.55rem;
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
    font-size: 0.6rem;
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
