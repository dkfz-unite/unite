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

import UHistogramBarTooltip from "./tooltips/HistogramBarTooltip.vue";
import UGridCellTolltip from "./tooltips/GridCellTooltip.vue";
import UTrackCellTooltip from "./tooltips/TrackCellTooltip.vue";
import UClinicalDataTrackTooltip from "./tooltips/ClinicalDataTrackTooltip.vue";

import consequences from "../../_shared/consequences.js";
import impactsMap from "../../_shared/impacts-map.js";
import consequencesMap from "../../_shared/consequences-map.js";
import oncogridColors from "./oncogrid-colors.js";
import donorTracks from "./oncogrid-tracks-donor";
import * as d3 from "d3";

export default {
  components: {
    UHistogramBarTooltip,
    UGridCellTolltip,
    UTrackCellTooltip,
    UClinicalDataTrackTooltip  
  },

  props: ["data"],

  data() {
    return {
      oncoGrid: null,
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
    };
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
      width: 1000,
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
      this.addEvents();

      // NOTE: These events are legacy and do not work in moder JS with Vite package manager
      // this.oncoGrid.on("histogramMouseOver", this.onHistogramHover);
      // this.oncoGrid.on("histogramClick", this.onHistogramClick);
      // this.oncoGrid.on("gridMouseOver", this.onGridCellHover);
      // this.oncoGrid.on("gridClick", this.onGridCellClick1);
      // this.oncoGrid.on("trackLegendMouseOver", this.onTrackGroupHover);
      // this.oncoGrid.on("trackMouseOver", this.onTrackCellHover);
      // this.oncoGrid.on("trackClick", this.onTrackCellClick);
    },

    addEvents() {
      const parseEvent = function(event) {
        return {
          target: event.target,
          data: event.target.__data__
        };
      };

      setTimeout(() => {
        const itemBars = d3.selectAll("[data-domain-index]");
        const gridCells = d3.selectAll("[data-obs-index]"); 
        const trackCells = d3.selectAll("[data-track-data-index]");
        const trackLabels = d3.selectAll(".og-track-group-label");

        itemBars.on("mouseover", (event) => this.onItemBarHover(parseEvent(event)));
        gridCells.on("mouseover", (event) => this.onGridCellHover(parseEvent(event)));
        trackCells.on("mouseover", (event) => this.onTrackCellHover(parseEvent(event)));
        trackLabels.on("mouseover", (event) => this.onTrackLabelHover(parseEvent(event)));

        itemBars.on("click", (event) => this.onItemBarClick(parseEvent(event)));
        gridCells.on("click", (event) => this.onGridCellClick(parseEvent(event)));
        trackCells.on("click", (event) => this.onTrackCellClick(parseEvent(event)));
      }, 0);
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
      this.addEvents();
    },

    onItemBarHover(event) {
      let element = event.target;
      let properties = null;

      if (event.data.x != undefined) {
        properties = [
          { key: "Donor", value: event.data.displayId },
          { key: "Mutations", value: event.data.count },
        ];
      } else if (event.data.y != undefined) {
        properties = [
          { key: "Gene", value: event.data.symbol },
          { key: "Mutations", value: event.data.count },
        ];
      }

      this.targetHistogramBarData = properties;
      this.targetHistogramBar = element;
    },

    onItemBarClick(event) {
      if (event.data.x != undefined) {
        this.$router.push({ name: "donor", params: { id: event.data.id }});
      } else if (event.data.y != undefined) {
        this.$router.push({ name: "gene", params: { id: event.data.id }});
      }
    },

    onGridCellHover(event) {
      let element = event.target;

      let donor = this.data.donors.find(donor => donor.id == event.data.donorId)?.displayId;
      let gene = this.data.genes.find(gene => gene.id == event.data.geneId)?.symbol;
      let impact = impactsMap.get(event.data.impact);
      let consequence = consequencesMap.get(event.data.consequence);

      let properties = [
        { key: "Donor", value: donor},
        { key: "Gene", value: gene },
        { key: "Mutation", value: event.data?.code },
        { key: "Impact", value: impact.name, color: impact.color },
        { key: "Consequence", value: consequence.name, color: consequence.color },
      ];

      this.targetGridCellData = properties;
      this.targetGridCell = element;
    },

    onGridCellClick(event) {
      this.$router.push({ name: "ssm", params: { id: event.data.id }});
    },

    onTrackCellHover(event) {
      let element = event.target;

      let donor = this.data.donors.find(donor => donor.id == event.data.id)?.displayId;
      let key = event.data.displayName;
      let value = event.data.type === "vitalStatus" ? event.data.value ? "Living" : "Deceased" : event.data.value;

      let properties = [
        { key: "Donor", value: donor },
        { key: key, value: value }
      ];

      this.targetTrackCellData = properties;
      this.targetTrackCell = element;
    },

    onTrackCellClick(event) {
      this.$router.push({ name: "donor", params: { id: event.data.id, tab: "clinical" }});
    },

    onTrackLabelHover(data) {
      var element = data.target;

      if (data.target.innerHTML == "Clinical Data") {
        this.clinicalDataTrack = element;
      }
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
  }
}
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

  /* Hides bug */
  #oncoGrid .og-tooltip-oncogrid {
    display: none;
  }
</style>
