<template>
  <div class="canvas-container" ref="container"></div>
</template>

<script lang="ts">
import TileSetDefinition, {PropertyValue, Tile, TilePosition, TileProperty} from "./tileSetDefinition";
import {Renderer, createRenderer} from "@/_shared/components/graphics/renderer"

export default {
  props: {
    definition: {
      type: TileSetDefinition,
      required: true
    },
    tileWidth: {
      type: Number,
      required: true
    },
    tileHeight: {
      type: Number,
      required: true
    }
  },

  computed: {
    canvasWidth() {
      return this.tileWidth * this.definition.columns.values.size;
    },

    canvasHeight() {
      return this.tileHeight * this.definition.rows.values.size;
    }
  },

  watch: {
    canvasWidth: 'redraw',
    canvasHeight: 'redraw'
  },

  mounted() {
    this.renderer = createRenderer("canvas", this.$refs.container, this.canvasWidth, this.canvasHeight) as Renderer;
    this.redraw();
  },

  beforeUnmount() {
    this.renderer.destroy();
  },

  methods: {
    redraw() {
      this.renderer.resize(this.canvasWidth, this.canvasHeight)
      this.draw(this.renderer)
    },

    draw(renderer: any) {
      //console.time('draw')
      renderer.clear();

      const columns = this.definition.columns;
      const columnCount = columns.values.size;

      const rows = this.definition.rows;
      const rowsCount = rows.values.size;

      const properties = this.definition.tileProperties;

      const columnWidth = this.tileWidth;
      const rowHeight = this.tileHeight;

      //Fill canvas with default tile
      const defaultTile: Tile = this.definition.defaultTile;
      const defaultTileFirstProperty = Tile.getFirstPropertyValue(defaultTile);
      const defaultTileColor = this.getTileColorValue(defaultTileFirstProperty, properties);
      renderer.drawRect(0, 0, columnWidth * columnCount, rowHeight * rowsCount, defaultTileColor);

      let x = 0, y = 0;
      for(const tile of this.definition.tiles) {
        const pos = Tile.getPosition(tile);
        x = TilePosition.getColumn(pos) * columnWidth;
        y = TilePosition.getRow(pos) * rowHeight;

        const tileFirstProperty = Tile.getFirstPropertyValue(tile);
        const tileColor = this.getTileColorValue(tileFirstProperty, properties);

        if(PropertyValue.getValue(tileFirstProperty) != PropertyValue.getValue(defaultTileFirstProperty)) {
          renderer.drawRect(x, y, columnWidth, rowHeight, tileColor);
        }
      }

      renderer.render();
      //console.timeEnd('draw')
    },

    getTileColorValue(propertyValue: PropertyValue, properties: Array<TileProperty>) {
      if(propertyValue) {
        const index = PropertyValue.getIndex(propertyValue);
        const value = PropertyValue.getValue(propertyValue);
        return properties[index].colors[value];
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