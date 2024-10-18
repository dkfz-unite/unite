<template>
  <div class="col q-gutter-y-sm">
    <div class="row">Resulting dataset contains:</div>
    <div class="row q-gutter-x-xs">
      <div class="col-1"># Cells:</div>
      <div class="col">{{ meta.cells_number?.toLocaleString() }}</div>
    </div>
    <div class="row q-gutter-x-xs">
      <div class="col-1"># Genes:</div>
      <div class="col">{{ meta.genes_number?.toLocaleString() }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    data: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      meta: ""
    }
  },

  mounted() {
    this.getContent(this.data);
  },

  methods: {
    async getContent(blob) {
      const json = await blob.text();
      this.meta = JSON.parse(json);
    }
  }
}
</script>