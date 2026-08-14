<template>
  <div class="row items-center q-gutter-sm">
    <span class="text-subtitle2">Controls: </span>

    <q-btn-group>
      <q-btn
        icon="las la-border-all"
        title="Grid lines"
        :class="{ 'bg-grey-3 text-blue-8': gridLines }"
        @click="toggleLines()"
      />
      <q-btn
        icon="las la-burn"
        title="Heatmap mode"
        :class="{ 'bg-grey-3 text-blue-8': gridHeatmap }"
        @click="toggleHeatmap()"
      />
      <q-btn
        icon="las la-crosshairs"
        title="Crosshair mode"
        :class="{ 'bg-grey-3 text-blue-8': gridCrosshair }"
        @click="toggleCrosshair()"
      />
      <q-btn
        icon="las la-sort-amount-down"
        title="Cluster grid"
        @click="cluster()"
      />
      <q-btn
        icon="las la-undo-alt"
        title="Reset grid"
        @click="reset()" 
      />
    </q-btn-group>
  </div>
</template>

<script>
export default {
  props: {
    lines: {
      type: Boolean,
      default: false
    },
    heatmap: {
      type: Boolean,
      default: false
    },
    crosshair: {
      type: Boolean,
      default: false
    }
  },

  emits: ["toggle-lines", "toggle-heatmap", "toggle-crosshair", "cluster", "reset"],

  data() {
    return {
      gridLines: this.lines,
      gridHeatmap: this.heatmap,
      gridCrosshair: this.crosshair
    }
  },

  methods: {
    toggleLines() {
      this.gridLines = !this.gridLines;
      this.$emit("toggle-lines", this.gridLines);
    },

    toggleHeatmap() {
      this.gridHeatmap = !this.gridHeatmap;
      this.$emit("toggle-heatmap", this.gridHeatmap);
    },

    toggleCrosshair() {
      this.gridCrosshair = !this.gridCrosshair;
      this.$emit("toggle-crosshair", this.gridCrosshair);
    },

    cluster() {
      this.$emit("cluster");
    },

    reset() {
      this.$emit("reset");
    }
  }
}
</script>