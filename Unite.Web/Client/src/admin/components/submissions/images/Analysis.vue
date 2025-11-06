<template>
  <div class="col">
    <u-sample :sample="sample" />

    <q-tabs class="q-ml-xs" dense align="left" v-model="tab">
      <q-tab v-if="entries?.length" name="entries" no-caps>Entries ({{ entries.length }})</q-tab>
    </q-tabs>

    <q-tab-panels v-model="tab">
      <q-tab-panel v-if="entries?.length" name="entries" class="q-pa-xs">
        <u-table-viewer :entries="entries" />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import UTableViewer from "../TableViewer.vue";
import USample from "./Sample.vue";
import mixin from "../viewer-mixin";

import SubmissionType from "@/domain/submissions/models/enums/submission-type-image";

export default {
  components: {
    UTableViewer,
    USample
  },

  mixins: [mixin],

  data() {
    return {
      tab: "entries",
      sample: this.data.sample,
      entries: []
    };
  },

  mounted() {
    if (this.type == SubmissionType.IMG_RAD) {
      this.entries = this.data.entries;
      return;
    }
  }
}
</script>