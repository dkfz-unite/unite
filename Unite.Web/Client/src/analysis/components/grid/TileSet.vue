<template>
  <div class="canvas-container" ref="container">
    <canvas
        ref="canvas"
    />
  </div>
</template>

<script lang="ts">
import TileSetDefinition, {Tile} from "./tileSetDefinition";

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
    this.resizeCanvas();
    window.addEventListener('resize', this.resizeCanvas);
  },

  beforeUnmount() {
    window.removeEventListener('resize', this.resizeCanvas);
  },

  methods: {
    resizeCanvas() {
      const container = this.$refs.container as HTMLElement;
      const canvas = this.$refs.canvas as HTMLCanvasElement;

      canvas.width = container.offsetWidth;
      canvas.height = 20 * this.definition.rows.values.size;
      // optionally fix the height too:
      // canvas.height = container.offsetHeight;

      this.drawCanvas(); // re-draw after resize
    },

    drawCanvas() {
      const canvas = this.$refs.canvas;
      if (!canvas)
        return;

      const ctx = canvas.getContext('2d');

      const columns = this.definition.columns;
      const columnCount = columns.values.size;

      const rows = this.definition.rows;
      const rowsCount = rows.values.size;

      const properties = this.definition.tileProperties;

      const columnWidth = Math.floor(canvas.width / columnCount);
      const rowHeight = 20;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      //Fill canvas with default tile
      const defaultTile: Tile = this.definition.defaultTile;
      for(let i = 0; i < columnCount; i++) {
        let x = i * columnWidth;
        for (let j = 0; j < rowsCount; j++) {
          let y = j * rowHeight;
          this.drawTile(x, y, columnWidth, rowHeight, defaultTile, ctx);
        }
      }

      let x = 0, y = 0;
      for(let tile of this.definition.tiles) {
        x = tile[0][0] * columnWidth;
        y = tile[0][1] * rowHeight;

        this.drawTile(x, y, columnWidth, rowHeight, tile, ctx);
      }
    },

    drawTile(x: number, y: number, tileWidth: number, tileHeight: number, tile: Tile, canvasContext: CanvasRenderingContext2D) {
      const propertyIndex = tile[1][0];
      const valueColor = this.definition.tileProperties[propertyIndex].colors[tile[1][1]];

      canvasContext.fillStyle = valueColor;
      canvasContext.fillRect(x, y, tileWidth, tileHeight);
    },

    getTile(col: number, row: number) {
      for(const tile of this.definition.tiles) {
        let position = tile[0];
        if(position[0] == col && position[1] == row) {
          return tile;
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
  //position: relative;
  overflow: auto;
  width: 100%;
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