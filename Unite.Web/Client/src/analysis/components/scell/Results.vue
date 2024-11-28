<template>
  <!-- <div class="col q-gutter-y-sm">
    <div class="row">Resulting dataset contains:</div>
    <div class="row q-gutter-x-xs">
      <div class="col-1"># Cells:</div>
      <div class="col">{{ meta.cells_number?.toLocaleString() }}</div>
    </div>
    <div class="row q-gutter-x-xs">
      <div class="col-1"># Genes:</div>
      <div class="col">{{ meta.genes_number?.toLocaleString() }}</div>
    </div>
  </div> -->
  <!-- <div class="col"> -->
    <q-inner-loading :showing="loading" label="Please wait..."></q-inner-loading>
    <iframe v-if="!loading" :src="meta" class="fit" style="border: 0px;"></iframe>
  <!-- </div> -->
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
      loading: false,
      meta: ""
    }
  },

  mounted() {
    this.getContent(this.data);
  },

  methods: {
    async getContent(text) {
      const parts = text.split("|");
      const networkUrl = parts[0];
      const localUrl = parts[1];

      this.loading = true;

      setTimeout(() => {
        if (window.location.host.includes("localhost:8080")) {
          this.loading = false;
          this.meta = localUrl;
        } else {
          this.loading = false;
          this.meta = networkUrl;
        }
      }, 3000);
    }
  }
}
</script>