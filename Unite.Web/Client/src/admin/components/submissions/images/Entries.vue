<template>
  <div class="col">
    <q-tabs class="q-ml-xs" dense align="left" v-model="tab">
      <q-tab v-if="imageRows?.length" :name="tabs.images" no-caps>Images ({{ imageRows.length }})</q-tab>
    </q-tabs>

    <q-tab-panels v-model="tab">
      <q-tab-panel v-if="imageRows?.length" :name="tabs.images" class="q-pa-xs">
        <u-table-viewer :entries="imageRows" />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import UTableViewer from "../TableViewer.vue";
import mixin from "../viewer-mixin.js";

export default {
  components: {
    UTableViewer
  },

  mixins: [mixin],

  setup() {
    return {
      tabs: {
        images: "images"
      }
    };
  },

  data() {
    return {
      tab: this.tabs.images,
      imageRows: []
    };
  },

  mounted() {
    const ignore = ["id", "donor_id", "creation_date", "creation_day"];
    const flatten = ["mr", "ct"];

    this.imageRows = this.data.map(row => ({
      id: row.id,
      donor_id: row.donor_id,
      creation_date: row.creation_date,
      creation_day: row.creation_day,
      ...this.mapProps(row, ignore, flatten)
    }));
  }
}
</script>