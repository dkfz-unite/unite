<template>
  <div v-if="data" class="col q-pa-xs">
    <div v-if="comments?.length" class="row">
      <div class="col q-gutter-sm q-pb-sm">
        <div v-for="(line, index) in comments">
          {{ line.replace(/^#\s*/, "") }}
        </div>
      </div>
    </div>
    <div v-if="values?.length" class="row">
      <div class="col">
        <q-table :rows="values" separator="cell" dense flat bordered />
      </div>
    </div>
  </div>
</template>

<script>
import * as Papa from "papaparse";

export default {
  props: {
    data: {
      type: [String, Array, Object, Blob],
      required: true
    }
  },

  data() {
    return {
      values: null,
      comments: null
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
      await this.parseData(this.data);
    },

    async parseData(blob, lines = null) {
      const tsv = await blob.text();
      const comments = tsv.trim().split("\n").filter(line => line.startsWith("#"));
      const rows = tsv.trim().split("\n").filter(line => !line.startsWith("#"));
      const values = Papa.parse(rows.join("\n"), { header: true, delimiter: "\t" });

      this.values = values.data;
      this.comments = comments;
    }
  }
}
</script>