<template>
  <div class="heatmap-wrap">
    <div class="controls">
      <label>
        Columns
        <input type="range" min="5" max="80" step="1" v-model.number="cols" @input="regenerate" />
        {{ cols }}
      </label>
      <label>
        Rows
        <input type="range" min="5" max="60" step="1" v-model.number="rows" @input="regenerate" />
        {{ rows }}
      </label>
      <label>
        Cell size
        <input type="range" min="8" max="40" step="1" v-model.number="cellSize" @input="drawCanvas" />
        {{ cellSize }}px
      </label>
      <button @click="regenerate">Regenerate ↺</button>
    </div>

    <div class="canvas-container" ref="container">
      <canvas
          ref="canvas"
          @mousemove="onMouseMove"
          @mouseleave="onMouseLeave"
          @click="onClick"
      />
      <div
          v-if="tooltip.visible"
          class="tooltip"
          :style="{ left: tooltip.x + 'px', top: tooltip.y + 'px' }"
      >
        <b>{{ xLabel(tooltip.c) }}, {{ yLabel(tooltip.r) }}</b><br />
        value: <b>{{ (tooltip.value * 100).toFixed(1) }}</b>
      </div>
    </div>

    <div class="legend">
      <span>low</span>
      <canvas ref="legendCanvas" width="160" height="14" />
      <span>high</span>
    </div>

    <div class="info-bar">
      <template v-if="pinned">
        Pinned: <strong>{{ xLabel(pinned.c) }}, {{ yLabel(pinned.r) }}</strong>
        — value <strong>{{ (data[pinned.r]?.[pinned.c] * 100).toFixed(1) }}</strong>
        &nbsp;(click again to unpin)
      </template>
      <template v-else>
        Click a cell to pin its info here.
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeatmapCanvas',

  data() {
    return {
      cols: 30,
      rows: 20,
      cellSize: 20,
      axisX: 60,
      axisY: 30,
      data: [],
      pinned: null,
      hoverCell: null,
      tooltip: {
        visible: false,
        x: 0,
        y: 0,
        r: 0,
        c: 0,
        value: 0,
      },
    }
  },

  mounted() {
    this.generateData()
    this.drawCanvas()
    this.drawLegend()
  },

  methods: {
    // ── Data ──────────────────────────────────────────────────────────────

    generateData() {
      this.data = []
      for (let r = 0; r < this.rows; r++) {
        this.data[r] = []
        for (let c = 0; c < this.cols; c++) {
          const cx = c / this.cols
          const cy = r / this.rows
          const blob1 = Math.exp(-((cx - 0.25) ** 2 + (cy - 0.3) ** 2) / 0.05)
          const blob2 = Math.exp(-((cx - 0.75) ** 2 + (cy - 0.7) ** 2) / 0.08)
          const v = blob1 * 0.8 + blob2 * 0.9 + (Math.random() * 0.25 - 0.1)
          this.data[r][c] = Math.max(0, Math.min(1, v))
        }
      }
    },

    regenerate() {
      this.pinned = null
      this.hoverCell = null
      this.tooltip.visible = false
      this.generateData()
      this.drawCanvas()
    },

    // ── Color ─────────────────────────────────────────────────────────────

    colorForValue(v) {
      const stops = [
        [0,    [230, 241, 251]],
        [0.25, [181, 212, 244]],
        [0.5,  [55,  138, 221]],
        [0.75, [24,   95, 165]],
        [1,    [4,    44,  83]],
      ]
      for (let i = 1; i < stops.length; i++) {
        if (v <= stops[i][0]) {
          const t = (v - stops[i - 1][0]) / (stops[i][0] - stops[i - 1][0])
          return stops[i - 1][1].map((s, j) =>
              Math.round(s + t * (stops[i][1][j] - s))
          )
        }
      }
      return stops[stops.length - 1][1]
    },

    // ── Labels ────────────────────────────────────────────────────────────

    xLabel(c) { return `X${c + 1}` },
    yLabel(r) { return `Y${r + 1}` },

    // ── Drawing ───────────────────────────────────────────────────────────

    drawCanvas() {
      const canvas = this.$refs.canvas
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      const { cols, rows, cellSize, axisX, axisY, hoverCell, pinned, data } = this

      canvas.width  = axisX + cols * cellSize + 2
      canvas.height = axisY + rows * cellSize + 2
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const textColor = isDark ? '#ccc' : '#555'
      const axisColor = isDark ? '#555' : '#ccc'

      // Axis labels — X
      const fontSize = Math.max(9, Math.min(12, cellSize - 4))
      ctx.font = `${fontSize}px sans-serif`
      ctx.fillStyle = textColor
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      const cStep = Math.max(1, Math.ceil(cols / 20))
      for (let c = 0; c < cols; c += cStep) {
        ctx.fillText(this.xLabel(c), axisX + c * cellSize + cellSize / 2, axisY / 2)
      }

      // Axis labels — Y
      ctx.textAlign = 'right'
      const rStep = Math.max(1, Math.ceil(rows / 20))
      for (let r = 0; r < rows; r += rStep) {
        ctx.fillText(this.yLabel(r), axisX - 4, axisY + r * cellSize + cellSize / 2)
      }

      // Cells
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const v = data[r][c]
          const [ri, gi, bi] = this.colorForValue(v)
          const x = axisX + c * cellSize
          const y = axisY + r * cellSize

          ctx.fillStyle = `rgb(${ri},${gi},${bi})`
          ctx.fillRect(x, y, cellSize, cellSize)

          const isHover  = hoverCell && hoverCell.r === r && hoverCell.c === c
          const isPinned = pinned    && pinned.r    === r && pinned.c    === c

          if (isHover || isPinned) {
            ctx.strokeStyle = isPinned ? '#E24B4A' : '#fff'
            ctx.lineWidth   = isPinned ? 2 : 1.5
            ctx.strokeRect(x + 1, y + 1, cellSize - 2, cellSize - 2)
          }

          // Value labels inside cells
          if (cellSize >= 18) {
            const brightness = 0.299 * ri + 0.587 * gi + 0.114 * bi
            ctx.fillStyle    = brightness > 140 ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.85)'
            ctx.font         = `${Math.max(8, cellSize * 0.38)}px sans-serif`
            ctx.textAlign    = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText((v * 100).toFixed(0), x + cellSize / 2, y + cellSize / 2)
          }
        }
      }

      // Border around grid
      ctx.strokeStyle = axisColor
      ctx.lineWidth   = 0.5
      ctx.strokeRect(axisX, axisY, cols * cellSize, rows * cellSize)
    },

    drawLegend() {
      const lc  = this.$refs.legendCanvas
      if (!lc) return
      const ctx = lc.getContext('2d')
      for (let x = 0; x < lc.width; x++) {
        const [r, g, b] = this.colorForValue(x / lc.width)
        ctx.fillStyle = `rgb(${r},${g},${b})`
        ctx.fillRect(x, 0, 1, lc.height)
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