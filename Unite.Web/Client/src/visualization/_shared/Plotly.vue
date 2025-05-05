<template>
  <div :id="id"></div>
</template>

<script>
import Plotly from "plotly.js-dist-min";

export default {
  props: {
    id: {
      type: String,
      default: "plot"
    },
    data: {
      type: Array,
      default: () => null
    },
    layout: {
      type: Object,
      default: () => null
    },
    config: {
      type: Object,
      default: () => null
    }
  },

  emits: ["click", "hover", "unhover", "zoom", "reset", "ready"],

  data() {
    return {
      created: false,
      restored: false
    };
  },

  async updated() {
    if (!this.created){
      await this.create();
    } else {
      await this.update();
    }
  },

  async beforeUnmount() {    
    await this.destroy();
  },

  methods: {
    async create() {
      const plot = await Plotly.newPlot(this.id, this.data, this.layout, this.config);
      const dragLayers = [...document.getElementsByClassName("nsewdrag")];

      // Interaction events
      plot.on("plotly_click", (data) => {
        this.$emit("click", data);
      });
      plot.on("plotly_hover", (data) => {
        dragLayers.forEach(layer => layer.style.cursor = "pointer");
        this.$emit("hover", data);
      });
      plot.on("plotly_unhover", (data) => {
        dragLayers.forEach(layer => layer.style.cursor = "");
        this.$emit("unhover", data);
      });

      // Zoom events
      plot.on("plotly_relayout", (data) => this.onZoom(data));
      plot.on("plotly_doubleclick", (data) => this.onReset(data));

      // Ready event
      plot.on("plotly_afterplot", (data) => {        
        this.$emit("ready", data);
      });

      this.created = true;
    },

    async update() {
      // await Plotly.react(this.id, this.data, this.layout, this.config);
      await Plotly.react(this.id, this.data, this.layout);
    },

    async destroy() {
      await Plotly.purge(this.id);
    },

    onZoom(data) {
      const start = data["xaxis.range[0]"];
      const end = data["xaxis.range[1]"];
      // const reset = data["xaxis.autorange"] || data["yaxis.autorange"];

      if (!this.restored && (start != null || end != null)){
        this.$emit("zoom", { start, end });
      }
    },

    onReset(data) {
      this.$emit("reset");
      
      // prevent zoom event from firing
      this.restored = true;
      setTimeout(() => {
        this.restored = false;
      }, 10);
    }
  }
};
</script>