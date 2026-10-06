<template>
  <u-tooltip v-if="tooltipElement && tooltipData" :target="tooltipElement" :data="tooltipData" />
  
  <div class="col">
    <div class="row items-center q-gutter-md">
      <div class="col-auto">
        <u-controls
          :lines="true"
          @toggle-lines="toggleGridLines"
          @toggle-heatmap="toggleHeatmap"
          @toggle-crosshair="toggleCrosshair"
          @cluster="cluster"
          @reset="reset"
        />
      </div>
      <div class="col">
        <slot name="header" />
      </div>
    </div>

    <div class="row">
      <div class="col">
        <div :id="id"></div>
      </div>
    </div>
  </div>
</template>

<script>
import UControls from "./EventGridControls.vue";
import UTooltip from "./EventGridTooltip.vue";
import EventGrid from '@dkfz-unite/event-grid';
import '@dkfz-unite/event-grid/style.css';

export default {
  components: {
    UControls,
    UTooltip
  },
  props: {
    id: {
      type: String,
      required: true
    },
    data: {
      type: [String, Array, Object, Blob],
      required: true
    }
  },

  data() {
    return {
      grid: null,
      showGridLines: true,
      heatMapMode: false,
      crosshairMode: false,
      tooltipElement: null,
      tooltipData: null
    }
  },

  mounted() {
    const element = document.getElementById(this.id);

    const config = {
      element: element,
      columns: this.data.columns,
      rows: this.data.rows,
      events: this.data.events,
      columnTracks: this.data.columnTracks,
      rowTracks: this.data.rowTracks,
      sortByFrequency: true,
      colorMap: this.data.palette,
      grid: true,
      margin: { top: 15, right: 15, bottom: 10, left: 0 },
      width: 1000,
      height: this.data.rows.length * 10 + 100,
      trackHeight: 15,
    };

    const grid = new EventGrid(config);
    grid.addEventListener(EventGrid.eventNames.gridMouseOver, this.cellHover);
    grid.addEventListener(EventGrid.eventNames.columnHistogramMouseOver, this.columnHover);
    grid.addEventListener(EventGrid.eventNames.columnTrackMouseOver, this.columnTrackHover);
    grid.addEventListener(EventGrid.eventNames.rowHistogramMouseOver, this.rowHover);
    grid.addEventListener(EventGrid.eventNames.rowTrackMouseOver, this.rowTrackHover);
    grid.render();

    this.grid = grid;
  },

  methods: {
    cellHover({ detail }) {
      this.tooltipData = [
        { key: "Donor", value: this.data.columns.find(col => col.id == detail.data.columnId).label },
        { key: "Gene", value: this.data.rows.find(row => row.id == detail.data.rowId).label },
        { key: "Position", value: detail.data.data.position },
        { key: "Change", value: detail.data.data.change },
        { key: "Type", value: detail.data.data.type },
        { key: "Impact", value: detail.data.data.impact },
        { key: "Effect", value: detail.data.data.effect }
      ];

      this.tooltipElement = detail.element;
    },

    columnHover({ detail }) {
      this.tooltipData = [
        { key: "Donor", value: this.data.columns.find(col => col.id == detail.data.columnId).label },
        { key: "Event", value: detail.data.label },
        { key: "Events Count", value: detail.data.count },
        { key: "Events Total", value: this.data.events.filter(event => event.columnId == detail.data.columnId).length }
      ];

      this.tooltipElement = detail.element;
    },

    columnTrackHover({ detail }) {
      this.tooltipData = [
        { key: "Donor", value: detail.data.columnId },
        { key: detail.data.label, value: detail.data.value }
      ];

      this.tooltipElement = detail.element;
    },

    rowHover({ detail }) {
      this.tooltipData = [
        { key: "Gene", value: this.data.rows.find(row => row.id == detail.data.rowId).label },
        { key: "Event", value: detail.data.label },
        { key: "Events Count", value: detail.data.count },
        { key: "Events Total", value: this.data.events.filter(event => event.rowId == detail.data.rowId).length }
      ];

      this.tooltipElement = detail.element;
    },

    rowTrackHover({ detail }) {
      this.tooltipData = [
        { key: "Gene", value: detail.data.rowId },
        { key: detail.data.label, value: detail.data.value }
      ];

      this.tooltipElement = detail.element;
    },

    toggleGridLines() {
      this.grid.toggleGridLines();
      this.showGridLines = !this.showGridLines;
    },

    toggleHeatmap() {
      this.grid.toggleHeatmap();
      this.heatMapMode = !this.heatMapMode;
    },

    toggleCrosshair() {
      this.grid.toggleCrosshair();
      this.crosshairMode = !this.crosshairMode;
    },

    cluster() {
      this.grid.cluster();
    },

    reset() {
      this.grid.reload();
    }
  }
}
</script>