<template>
  <div class="col">
    <!-- Sample mode -->
    <template v-if="isSample">
      <u-sample :sample="data" />
    </template>

    <!-- Analysis mode -->
    <template v-else>
      <template v-if="data.tsample">
        <u-sample :sample="data.tsample" />
      </template>

      <template v-if="data.msample">
        <div class="row justify-center">vs</div>
        <u-sample :sample="data.msample" />
      </template>
    </template>

    <q-tabs class="q-ml-xs" dense align="left" v-model="tab">
      <q-tab v-if="data.entries?.length" :name="tabs.entries" no-caps>Entries ({{ data.entries.length }})</q-tab>
      <q-tab v-if="data.resources?.length" :name="tabs.resources" no-caps>Resources ({{ data.resources.length }})</q-tab>
    </q-tabs>

    <q-tab-panels v-model="tab">
      <q-tab-panel v-if="data.entries?.length" :name="tabs.entries" class="q-pa-xs">
        <u-table-viewer :entries="data.entries" />
      </q-tab-panel>

      <q-tab-panel v-if="data.resources?.length" :name="tabs.resources" class="q-pa-xs">
        <u-table-viewer :entries="data.resources" />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import UTableViewer from "../TableViewer.vue";
import USample from "./Sample.vue";
import mixin from "../viewer-mixin.js";

import SubmissionType from "@/domain/submissions/models/enums/submission-type-omics";

export default {
  components: {
    USample,
    UTableViewer
  },

  mixins: [mixin],

  setup() {
    return {
      tabs: {
        entries: "entries",
        resources: "resources"
      }
    };
  },

  data() {
    return {
      tab: this.data.entries?.length ? this.tabs.entries
         : this.data.resources?.length ? this.tabs.resources
         : null
    };
  },

  computed: {
    isSample() {
      return SubmissionType.isSampleType(this.type);
    }
  }
}
</script>