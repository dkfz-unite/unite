<template>
  <u-onco-grid v-if="meta" :id="id" :data="meta" />
</template>

<script>
import UOncoGrid from "./OncoGrid.vue";

export default {
  components: {
    UOncoGrid
  },

  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    data: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      meta: null
    }
  },

  async mounted() {    
    await this.init();
  },

  watch: {
    async data(value) {   
      await this.init();
    }
  },

  methods: {
    async init() {
      this.meta = null;
      this.meta = await this.getMeta(this.data);
    },

    async getMeta(blob) {
      const json = await blob.text();
      return JSON.parse(json);
    }
  }
}
</script>