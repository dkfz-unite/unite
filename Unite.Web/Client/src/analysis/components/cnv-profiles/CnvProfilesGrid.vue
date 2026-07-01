<template>
  <div class="col q-gutter-sm">
    <u-track-cell-tooltip :target="targetTrackCell" :data="targetTrackCellData" />

    <div class="row">
      <q-btn-group>
        <q-btn
            icon="las la-border-all"
            title="Toggle grid lines"
            :class="{ 'bg-grey-3 text-blue-8': showGridLines }"
            @click="toggleGridLines()"
        />
        <q-btn
            icon="las la-crosshairs"
            title="Toggle zoom"
            :class="{ 'bg-grey-3 text-blue-8': crosshairMode }"
            @click="toggleCrosshair()"
        />
        <q-btn
            icon="las la-undo-alt"
            title="Reset grid"
            @click="reloadGrid()"
        />
      </q-btn-group>
    </div>

    <div class="row">
      <div class="col-12">
        <div id="oncoGrid" :class="{ 'og-crosshair-mode' : crosshairMode }" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { colors } from "quasar";

import impactsMap from "@/visualization/_shared/genome/impacts-map.js";
import effectsMap from "@/visualization/_shared/genome/effects-map.js";
import * as d3 from "d3";
import UTrackCellTooltip from "@/analysis/components/gaf/tooltips/TrackCellTooltip.vue";

export default {
  components: {
    UTrackCellTooltip
  },

  props: ["data"],

  data() {
    return {
      oncoGrid: null,
      showGridLines: true,
      crosshairMode: false,

      targetTrackCell: false,
      targetTrackCellData: null,
    };
  },

  async mounted() {
    let parameters = {
      element: "#oncoGrid",
      donors: this.data.donors,
      genes: this.data.genes,
      ssmObservations: this.data.observations,  // was: observations
      donorTracks: this.data.sampleTracks,
      accountableConsequences: ["gain", "loss"],
      colorMap: {
        mutation: {
          gain:       'red',
          loss:       'blue',
          neutral:    'gray'
        }
      },
      donorFillFunc: this.data.sampleFillFunc,
      donorOpacityFunc: function(d) { return 1; },
      scaleToFit: true,
      width: 1000,
      height: 320,
      margin: {
        left: 40,
        top: 30,
        right: 100,
        bottom: 15
      }
    };

    this.initializeGrid(parameters);
  },

  methods: {
    initializeGrid(parameters) {
      this.oncoGrid = new UniteOncoGrid(parameters);
      this.oncoGrid.setGridLines(this.showGridLines);
      this.oncoGrid.render();
      this.addEvents();
    },

    addEvents() {
      const parseEvent = function(event) {
        return {
          target: event.target,
          data: event.target.__data__
        };
      };

      setTimeout(() => {
        const trackCells = d3.selectAll("[data-track-data-index]");

        trackCells.on("mouseover", (event) => this.onTrackCellHover(parseEvent(event)));
        trackCells.on("click", (event) => this.onTrackCellClick(parseEvent(event)));
      }, 0);
    },

    toggleGridLines() {
      this.showGridLines = !this.showGridLines;
      this.oncoGrid.setGridLines(this.showGridLines);
    },

    toggleCrosshair() {
      this.crosshairMode = !this.crosshairMode;
      this.oncoGrid.setCrosshair(this.crosshairMode);
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

    onTrackCellHover(event) {
      let element = event.target;

      let donor = this.data.donors.find(donor => donor.id == event.data.id)?.displayId;
      let key = event.data.displayName;
      let value = event.data.type === "vitalStatus" ? event.data.value ? "Yes" : "No"
          : event.data.type === "progressionStatus" ? event.data.value ? "Yes" : "No"
              : event.data.value;

      let properties = [
        { key: "Donor", value: donor },
        { key: key, value: value }
      ];

      this.targetTrackCellData = properties;
      this.targetTrackCell = element;
    },

    onTrackCellClick(event) {
      let donorId = this.data.donors.find(donor => donor.id == event.data.id)?.donorId;
      if(donorId) {
        this.$router.push({ name: "donor", params: { id: donorId, tab: "summary" }});
      }
    }
  }
}
</script>

<style scoped lang="scss">
  #oncoGrid .og-track-data {
    shape-rendering: crispEdges;
  }
</style>