<template>
  <div class="col">
    <q-tabs class="q-ml-xs" dense align="left" v-model="tab">
      <q-tab v-if="rows?.length" :name="tabs.entries" no-caps>Entries ({{ rows.length }})</q-tab>
    </q-tabs>

    <q-tab-panels v-model="tab">
      <q-tab-panel v-if="rows?.length" :name="tabs.entries" class="q-pa-xs">
        <u-table-viewer :entries="rows" />
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
        entries: "entries"
      }
    };
  },

  data() {
    return {
      tab: this.tabs.entries,
      rows: []
    };
  },

  mounted() {
    this.rows = this.data
      .flatMap(row => row.entries.map(sub => ({
        specimen_id: row.specimen_id,
        specimen_type: row.specimen_type,
        donor_id: row.donor_id,
        ...sub
      })));

    return;
  }
}
</script>