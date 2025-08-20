<template>
  <div class="col q-gutter-sm">
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
          icon="las la-undo-alt"
          title="Reset genes"
          @click="toggleReset()"
        />
      </q-btn-group>
    </div>

    <div class="row">
      <div class="col">
        <div id="event-matrix"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { colors } from "quasar";
import preparer from "./oncogrid-data-service";
import effectColors from "./oncogrid-colors";
import EventMatrix from "event-matrix";

export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      matrix: null,
      showGridLines: true,
      heatMapMode: false,
      crosshairMode: false
    }
  },

  mounted() {
    const data = preparer.prepare(this.data);

    const params = {
      element: "#event-matrix",
      rows: data.rows,
      columns: data.columns,
      entries: data.entries,
      grid: {
        width: 1200,
        appearance: (val) => ({ color: effectColors[val.sm.effect], opacity: 1 })
      },
      histogram: {
        top: { label: 'Mutation freq.' },
        side: { label: 'Mutation freq.'}
      },
      description: {
        bottom: {
          fields: data.columnFields,
          appearance: this.getColumnsTrackStyle
        }
      },
    };

    this.init(params);
  },

  beforeUnmount() {
    this.matrix.destroy();
  },

  methods: {
    init(params) {
      this.matrix = new EventMatrix(params);

      this.matrix.on("grid:cell:hover", this.onGridCellHover);
      this.matrix.on("grid:cell:click", this.onGridCellClick);
      this.matrix.on("description:cell:hover", this.onTrackCellHover);
      this.matrix.on("description:cell:click", this.onTrackCellClick);
      this.matrix.on("histogram:hover", this.onHistogramHover);
      this.matrix.on("histogram:click", this.onHistogramClick);
      this.matrix.on("grid:selection:finished", () => {
        this.toggleCrosshair()
      });

      this.matrix.render();
    },

    update() {
      this.matrix.destroy();
      this.matrix.render();
    },

    getColumnsTrackStyle(val) {
      let color = colors.getPaletteColor("grey-3");
      let opacity = 1;

      if (val.type === "sex") {
        color = val.value === "Male" ? colors.getPaletteColor("blue-3") : colors.getPaletteColor("pink-3");
      } else if (val.type === "age") {
        color = colors.getPaletteColor("purple");
        opacity = val.value / 100;
      } else if (val.type === "vitalStatus") {
        color = val.value === true ? colors.getPaletteColor("green-3")
              : val.value === false ? colors.getPaletteColor("red-3")
              : colors.getPaletteColor("grey");
      } else if (val.type === "progressionStatus") {
        color = val.value === true ? colors.getPaletteColor("green-3")
              : val.value === false ? colors.getPaletteColor("red-3")
              : colors.getPaletteColor("grey");
      }

      return {
        color: color,
        opacity: opacity
      }
    },

    onGridCellHover({target, rowId, columnId, entryId}) {
      // console.log("grid:cell:hover");
      // console.log(rowId, columnId, entryId);
    },

    onGridCellClick({target, rowId, columnId, entryId}) {
      // console.log("grid:cell:click");
      // console.log(rowId, columnId, entryId);
    },

    onTrackCellHover({target, type, field, domainId}) {
      // console.log("description:cell:hover");
      // console.log(type, field, domainId);
    },

    onTrackCellClick({target, type, field, domainId}) {
      // console.log("description:cell:click");
      // console.log(type, field, domainId);
    },

    onHistogramHover({target, type, domainId}) {
      // console.log(type, domainId);
    },

    onHistogramClick({target, type, domainId}) {
      // console.log(type, domainId);
    },

    toggleGridLines() {
      this.showGridLines = !this.showGridLines;
      this.matrix.setGridLines(this.showGridLines);
    },

    toggleHeatMap() {
      this.heatMapMode = !this.heatMapMode;
      this.matrix.setHeatmap(this.heatMapMode);
    },

    toggleCrosshair() {
      this.crosshairMode = !this.crosshairMode;
      this.matrix.setCrosshair(this.crosshairMode);
    },

    toggleReset() {
      this.matrix.reset();
    },
  }
}
</script>

<style>

#event-matrix {
  padding-top: 12px;
}
#event-matrix .og-container__content {
  display: flex;
}
#event-matrix .og-container__content.og-container__content--main {
  flex-direction: column;
}
#event-matrix #og-histogram-container-top {
  margin-bottom: 5px;
}
#event-matrix #og-histogram-container-top svg {
  display: block;
}
#event-matrix #og-histogram-container-side {
  margin-left: 6px;
}

/* Grid background */
#event-matrix .og-background {
  fill: #f0f0f0;
  stroke: #101010;
  stroke-width: 0.1;
}

/* Grid line */
#event-matrix line {
  stroke: #101010;
  stroke-width: 0.2;
}

/* Crosshair mode */
#event-matrix.og-crosshair-mode {
  cursor: crosshair;
}

/* Crosshair line (vertical) */
#event-matrix line.og-vertical-cross {
  stroke: #101010;
  stroke-width: 0.5;
}

/* Crosshair line (horizontal) */
#event-matrix line.og-horizontal-cross {
  stroke: #101010;
  stroke-width: 0.5;
}


/* Axis label */
#event-matrix .og-label-text-font {
  font-size: 0.6rem;
}

/* Axis bar */
#event-matrix .og-sortable-bar {
  cursor: pointer;
}

/* Axis bar (hover) */
#event-matrix .og-sortable-bar:hover {
  fill-opacity: 0.5;
}


/* Row label */
#event-matrix .og-row-label {
  font-size: 0.55rem;
}

/* Row label (hover) */
#event-matrix .og-row-label {
  cursor: grab;
}

/* Row label (active) */
#event-matrix .og-row-label:active {
  fill: #00ff00;
  cursor: grabbing;
}

/* Row grid cell */
#event-matrix .og-sortable-rect {
  cursor: pointer;
}

#event-matrix .og-grid-row {
  transform-origin: 0 0;
}

/* Row grid cell */
#event-matrix .og-sortable-rect, #event-matrix .og-sortable-bar, #event-matrix .og-grid__row-wrapper, #event-matrix .og-grid-cell, #event-matrix .og-track-data, #event-matrix .og-gridlines-row, #event-matrix .og-gridlines-column {
  transition: all .3s ease-out;
}

#event-matrix .og-maingrid-svg.og-maingrid-svg--locked .og-sortable-rect {
  pointer-events: none;
}

/* Row grid cell (hover) */
#event-matrix .og-sortable-rect:hover {
  fill-opacity: 0.5;
}


/* Description field group label */
#event-matrix .og-track-group-label {
  font-size: 0.8em;
  cursor: pointer;
}

/* Description field label */
#event-matrix .og-track-label {
  font-size: 0.6rem;
  cursor: pointer;
}

/* Description field label (hover) */
#event-matrix .og-track-label:hover {
  fill: #00ff00;
}

/* Description field grid cell */
#event-matrix .og-track-data {
  cursor: pointer;
}

/* Description field grid cell (hover) */
#event-matrix .og-track-data:hover {
  fill-opacity: 0.5;
}

/* Description field grid cell (hover) */
#event-matrix .og-track-data:hover {
  fill-opacity: 0.5;
}

/* Hides bug */
/*#event-matrix .og-tooltip-oncogrid {*/
/*    display: none*/
/*}*/
</style>