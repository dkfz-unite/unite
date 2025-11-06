<template>
  <div class="col">
    <q-tabs class="q-ml-xs" dense align="left" v-model="tab">
      <q-tab v-if="entries?.length" :name="tabs.entries" no-caps>Entries ({{ entries.length }})</q-tab>
    </q-tabs>

    <q-tab-panels v-model="tab">
      <q-tab-panel v-if="entries?.length" :name="tabs.entries" class="q-pa-xs">
        <u-table-viewer :entries="entries" />
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
      entries: []
    };
  },

  mounted() {
    this.entries = this.data
      .flatMap(row => row.entries.map(sub => ({
        donor_id: row.donor_id, 
        ...sub
      })));

    return;
  }
}
</script>