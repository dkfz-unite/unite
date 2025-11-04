<template>
  <div class="col">
    <!-- Sample mode -->
    <template v-if="isSample">
      <div class="row">
        <u-sample-view :sample="data" />
      </div>
    </template>

    <!-- Analysis mode -->
    <template v-else>
      <template v-if="data.tsample">
        <div class="row">
          <u-sample-view :sample="data.tsample" />
        </div>
      </template>

      <template v-if="data.msample">
        <div class="row justify-center">vs</div>
        <div class="row">
          <u-sample-view :sample="data.msample" />
        </div>
      </template>
    </template>

    <q-tabs class="q-ml-xs" dense align="left" v-model="tab">
      <q-tab v-if="data.entries?.length" name="entries" no-caps>Entries ({{ data.entries.length }})</q-tab>
      <q-tab v-if="data.resources?.length" name="resources" no-caps>Resources ({{ data.resources.length }})</q-tab>
    </q-tabs>

    <q-tab-panels v-model="tab">
      <q-tab-panel v-if="data.entries?.length" name="entries" class="q-pa-xs">
        <u-table-viewer :entries="data.entries" />
      </q-tab-panel>

      <q-tab-panel v-if="data.resources?.length" name="resources" class="q-pa-xs">
        <u-table-viewer :entries="data.resources" />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import USampleView from "./OmicsSampleViewer.vue";
import UTableViewer from "./TableViewer.vue";
import mixin from "./viewer-mixin.js";

import SubmissionType from "@/domain/submissions/models/enums/submission-type-omics";

export default {
  components: {
    USampleView,
    UTableViewer
  },

  mixins: [mixin],

  data() {
    return {
      tab: this.data.entries?.length ? "entries"
         : this.data.resources?.length ? "resources"
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