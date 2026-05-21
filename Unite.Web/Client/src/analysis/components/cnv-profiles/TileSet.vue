<template>
  <div class="canvas-container" ref="container">
    <canvas
        ref="canvas"
        @mousemove="onMouseMove"
        @mouseleave="onMouseLeave"
        @click="onClick"
    />
  </div>
</template>

<script lang="ts">
import TileSetDefinition from "./tileSetDefinition";

export default {
  props: {
    definition: {
      type: TileSetDefinition,
      required: true
    }
  },

  data() {
    return {

    }
  },

  mounted() {
    this.drawCanvas()
  },

  methods: {
    drawCanvas() {
      const canvas = this.$refs.canvas
      if (!canvas) return
      const ctx = canvas.getContext('2d')

      const xDimension = this.getXDimension();
      const yDimension = this.getYDimension();
      const tileWidth = 10;
      const tileHeight = 10;
      const columnsCount = this.getValuesCount(xDimension);
      const rowsCount = this.getValuesCount(yDimension);
      const eventDefinition = this.getFirstEventDefinition();

      canvas.width  = columnsCount * tileWidth;
      canvas.height = rowsCount * tileHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const defualtEventIndex = this.definition.defaultEvents[0];

      for (let i = 0; i < columnsCount; i++) {
        let x = i * tileWidth;

        for (let j = 0; j < rowsCount; j++) {
          const point = this.getPoint(i, j);
          const eventIndex = point ? point[2] : defualtEventIndex;
          const eventColor = eventDefinition.colors[eventIndex];

          ctx.fillStyle = eventColor;
          let y = j * tileHeight;
          ctx.fillRect(x, y, tileWidth, tileHeight);
        }
      }
    },

    getPoint(col: number, row: number) {
      for(const point of this.definition.points) {
        if(point[0] === col && point[1] === row) {
          return point;
        }
      }
    },

    getXDimension() {
      const axisKey = this.definition.axes.x;
      return this.getDimension(axisKey);
    },

    getYDimension() {
      const axisKey = this.definition.axes.y;
      return this.getDimension(axisKey);
    },

    getDimension(key: string) {
      for(const dimension of this.definition.dimensions ) {
        if (dimension.key === key)
          return dimension;
      }
    },

    getValuesCount(dimension) {
      return dimension.values.length;
    },

    getFirstEventDefinition() {
      if(this.definition.events.length > 0)
        return this.definition.events[0];
    },

    // ── Mouse helpers ─────────────────────────────────────────────────────

    cellFromEvent(e) {
      const rect = this.$refs.canvas.getBoundingClientRect()
      const c = Math.floor((e.clientX - rect.left  - this.axisX) / this.cellSize)
      const r = Math.floor((e.clientY - rect.top   - this.axisY) / this.cellSize)
      if (r >= 0 && r < this.rows && c >= 0 && c < this.cols) return { r, c }
      return null
    },

    // ── Event handlers ────────────────────────────────────────────────────

    onMouseMove(e) {
      const cell = this.cellFromEvent(e)
      if (!cell) {
        this.hoverCell = null
        this.tooltip.visible = false
        this.drawCanvas()
        return
      }

      this.hoverCell = cell
      this.drawCanvas()

      const { r, c } = cell
      const containerRect = this.$refs.container.getBoundingClientRect()
      const canvasRect    = this.$refs.canvas.getBoundingClientRect()

      this.tooltip = {
        visible: true,
        x: (canvasRect.left - containerRect.left) + this.axisX + c * this.cellSize + this.cellSize + 6,
        y: (canvasRect.top  - containerRect.top)  + this.axisY + r * this.cellSize,
        r,
        c,
        value: this.data[r][c],
      }
    },

    onMouseLeave() {
      this.hoverCell = null
      this.tooltip.visible = false
      this.drawCanvas()
    },

    onClick(e) {
      const cell = this.cellFromEvent(e)
      if (!cell) return
      const { r, c } = cell
      if (this.pinned && this.pinned.r === r && this.pinned.c === c) {
        this.pinned = null
      } else {
        this.pinned = { r, c }
      }
      this.drawCanvas()
    },
  },
}
</script>

<style scoped>
.heatmap-wrap {
  font-family: sans-serif;
  padding: 1rem 0;
}

.controls {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.controls label {
  font-size: 13px;
  color: #666;
  display: flex;
  align-items: center;
  gap: 8px;
}

.controls button {
  padding: 4px 12px;
  font-size: 13px;
  cursor: pointer;
  border: 0.5px solid #ccc;
  border-radius: 6px;
  background: transparent;
}

.controls button:hover {
  background: #f5f5f5;
}

.canvas-container {
  position: relative;
  overflow: auto;
}

canvas {
  display: block;
  cursor: crosshair;
}

.tooltip {
  position: absolute;
  background: #fff;
  border: 0.5px solid #ccc;
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 13px;
  pointer-events: none;
  line-height: 1.6;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.legend {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
}

.legend canvas {
  border-radius: 4px;
}

.legend span {
  font-size: 12px;
  color: #888;
}

.info-bar {
  margin-top: 12px;
  min-height: 36px;
  font-size: 13px;
  color: #888;
  display: flex;
  align-items: center;
  gap: 4px;
}

.info-bar strong {
  color: #222;
  font-weight: 500;
}
</style>