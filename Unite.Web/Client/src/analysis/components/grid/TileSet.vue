<template>
  <div class="canvas-container" ref="container">
    <u-two-canvas
        ref="twoCanvas"
        :width="canvasWidth"
        :height="canvasHeight"
        type="svg"
        @ready="onCanvasReady"
    />
  </div>
</template>

<script lang="ts">
import TileSetDefinition, {PropertyValue, Tile, TilePosition, TileProperty} from "./tileSetDefinition";
import UTwoCanvas from "@/_shared/components/graphics/TwoCanvas.vue"

export default {
  props: {
    definition: {
      type: TileSetDefinition,
      required: true
    }
  },

  components: {
    UTwoCanvas
  },

  data() {
    return {
      resizeObserver: null,
      containerObserved: false
    }
  },

  computed: {
    tileHeight() {
      return this.definition.tileHeight ? this.definition.tileHeight : 20;
    },
    tileWidth() {
      return this.definition.tileWidth ? this.definition.tileWidth : 5;
    },

    canvasWidth() {
      return this.tileWidth * this.definition.columns.values.size;
    },

    canvasHeight() {
      return this.tileHeight * this.definition.rows.values.size;
    }
  },

  mounted() {
    this.resizeObserver = new ResizeObserver(() => {
      if (!this.containerObserved) {
        this.containerObserved = true
        return
      }
      this.drawGrid()
    })
    this.resizeObserver.observe(this.$refs.container)
  },

  beforeUnmount() {
    this.resizeObserver.disconnect()
  },

  methods: {
    onCanvasReady(two) {
      this.two = two;
      this.drawGrid();
    },

    drawGrid() {
      if (!this.two)
        return;

      this.two.clear();

      const columns = this.definition.columns;
      const columnCount = columns.values.size;

      const rows = this.definition.rows;
      const rowsCount = rows.values.size;

      const properties = this.definition.tileProperties;

      const columnWidth = this.tileWidth;
      const rowHeight = this.tileHeight;

      //Fill canvas with default tile
      const defaultTile: Tile = this.definition.defaultTile;
      for(let i = 0; i < columnCount; i++) {
        let x = i * columnWidth;
        for (let j = 0; j < rowsCount; j++) {
          let y = j * rowHeight;
          this.drawTile(x, y, columnWidth, rowHeight, defaultTile, properties, this.two);
        }
      }

      let x = 0, y = 0;
      for(const tile of this.definition.tiles) {
        const pos = Tile.getPosition(tile);
        x = TilePosition.getColumn(pos) * columnWidth;
        y = TilePosition.getRow(pos) * rowHeight;

        this.drawTile(x, y, columnWidth, rowHeight, tile, properties, this.two);
      }

      this.$refs.twoCanvas.redraw();
    },

    drawTile(x: number, y: number, tileWidth: number, tileHeight: number, tile: Tile, properties: Array<TileProperty>, graphicContext: any) {
      const propertyValue = Tile.getFirstPropertyValue(tile);
      if(propertyValue) {
        const index = PropertyValue.getIndex(propertyValue);
        const value = PropertyValue.getValue(propertyValue);
        const valueColor = properties[index].colors[value];

        const dx = tileWidth / 2;
        const dy = tileHeight / 2;

        const rect = graphicContext.makeRectangle(x + dx, y + dy, tileWidth, tileHeight);
        rect.fill = valueColor;
        rect.noStroke();
      }
    },

    getTile(col: number, row: number) {
      for(const tile of this.definition.tiles) {
        let position = tile[0];
        if(position[0] == col && position[1] == row) {
          return tile;
        }
      }
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