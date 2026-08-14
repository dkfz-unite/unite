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
      sortByFrequency: false,
      colorMap: this.data.palette,
      grid: true,
      margin: { top: 15, right: 15, bottom: 10, left: 40 },
      width: 1100,
      height: this.data.rows.length * 10,
      trackHeight: 10,
    };

    const grid = new EventGrid(config);
    grid.addEventListener(EventGrid.eventNames.gridMouseOver, this.cellHover);
    grid.addEventListener(EventGrid.eventNames.columnHistogramMouseOver, this.columnHover);
    grid.addEventListener(EventGrid.eventNames.columnTrackMouseOver, this.columnTrackHover);
    grid.addEventListener(EventGrid.eventNames.rowHistogramMouseOver, this.rowHover);
    grid.render();

    this.grid = grid;
  },

  methods: {
    cellHover({ detail }) {
      const sample = this.data.columns.find(col => col.id == detail.data.columnId);
      const region = this.data.rows.find(row => row.id == detail.data.rowId);

      this.tooltipData = [
        { key: "Donor", value: sample.donorId },
        { key: "Specimen", value: sample.specimenId },
        { key: "Region", value: region.label },
        { key: "Event", value: detail.data.type }
      ];

      this.tooltipElement = detail.element;
    },

    columnHover({ detail }) {
      const sample = this.data.columns.find(col => col.id == detail.data.columnId);
      const events = this.data.events.filter(event => event.columnId == detail.data.columnId);

      this.tooltipData = [
        { key: "Donor", value: sample.donorId },
        { key: "Specimen", value: sample.specimenId },
        { key: "Event", value: detail.data.label },
        { key: "Events Count", value: detail.data.count },
        { key: "Events Total", value: events.length }
      ];

      this.tooltipElement = detail.element;
    },

    columnTrackHover({ detail }) {
      const sample = this.data.columns.find(col => col.id == detail.data.columnId);

      this.tooltipData = [
        { key: "Donor", value: sample.donorId },
        { key: "Specimen", value: sample.specimenId },
        { key: detail.data.label, value: detail.data.value }
      ];

      this.tooltipElement = detail.element;
    },

    rowHover({ detail }) {
      const region = this.data.rows.find(row => row.id == detail.data.rowId);
      const events = this.data.events.filter(event => event.rowId == detail.data.rowId);

      this.tooltipData = [
        { key: "Region", value: region.label },
        { key: "Event", value: detail.data.label },
        { key: "Events Count", value: detail.data.count },
        { key: "Events Total", value: events.length }
      ];

      this.tooltipElement = detail.element;
    },

    toggleGridLines() {
      this.grid.toggleGridLines();
    },

    toggleHeatmap() {
      this.grid.toggleHeatmap();
    },

    toggleCrosshair() {
      this.grid.toggleCrosshair();
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