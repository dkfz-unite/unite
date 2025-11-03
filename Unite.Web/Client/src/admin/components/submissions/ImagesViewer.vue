<template>
  <div class="col">
    <u-table-viewer :entries="rows" />
  </div>
</template>

<script>
import UTableViewer from "./TableViewer.vue";
import mixin from "./viewer-mixin.js";

export default {
  components: {
    UTableViewer
  },

  mixins: [mixin],

  data() {
    return {
      rows: []
    };
  },

  mounted() {
    this.rows = this.data.map(img => ({
      id: img.id,
      donor_id: img.donor_id,
      creation_date: img.creation_date,
      ...this.mapProps(img, ["id, donor_id, creation_date"])
    }));
  }
}
</script>