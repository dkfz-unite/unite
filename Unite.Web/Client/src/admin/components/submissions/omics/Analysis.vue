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

    <u-row-viewer v-if="data.entries_scope?.length" class="q-mx-sm" label="entries_scope:" :value="data.entries_scope.join(', ')" />

    <q-tabs class="q-ml-xs" dense align="left" v-model="tab">
      <q-tab v-if="data.entries?.length" :name="tabs.entries" no-caps>Entries ({{ data.entries.length }})</q-tab>
      <q-tab v-if="liftoverFailures.length" :name="tabs.failures" no-caps>Failures ({{ liftoverFailures.length }})</q-tab>
      <q-tab v-if="data.resources?.length" :name="tabs.resources" no-caps>Resources ({{ data.resources.length }})</q-tab>
    </q-tabs>

    <q-tab-panels v-model="tab">
      <q-tab-panel v-if="data.entries?.length" :name="tabs.entries" class="q-pa-xs">
        <u-table-viewer
          :entries="data.entries"
          :subtitle="liftover ? getLiftoverEntriesMessage(liftover) : null"
          :subtitle-class="getLiftoverStatusClass(liftover)" />
      </q-tab-panel>

      <q-tab-panel v-if="liftoverFailures.length" :name="tabs.failures" class="q-pa-xs">
        <u-table-viewer
          :entries="liftoverFailures"
          :subtitle="getLiftoverFailuresMessage(liftover)"
          subtitle-class="text-negative" />
      </q-tab-panel>

      <q-tab-panel v-if="data.resources?.length" :name="tabs.resources" class="q-pa-xs">
        <u-table-viewer :entries="data.resources" />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import URowViewer from '../RowViewer.vue';
import UTableViewer from '../TableViewer.vue';
import USample from './Sample.vue';
import mixin from '../viewer-mixin.js';

import SubmissionType from '@/domain/submissions/models/enums/submission-type-omics';
import liftover from './liftover';

export default {
  components: {
    URowViewer,
    USample,
    UTableViewer
  },

  mixins: [mixin],

  setup() {
    return {
      tabs: {
        entries: "entries",
        failures: "failures",
        resources: "resources"
      }
    };
  },

  data() {
    return {
      tab: this.getInitialTab()
    };
  },

  computed: {
    isSample() {
      return SubmissionType.isSampleType(this.type);
    },

    liftover() {
      return liftover.getLiftoverStats(this.data, this.type);
    },

    liftoverFailures() {
      return this.data.liftover_failures?.map(result => ({
        ...result.variant,
        reason: liftover.getLiftoverReasonLabel(result.failure)
      })) ?? [];
    }
  },

  watch: {
    data() {
      this.tab = this.getInitialTab();
    }
  },

  methods: {
    getLiftoverEntriesMessage: liftover.getLiftoverEntriesMessage,

    getLiftoverFailuresMessage: liftover.getLiftoverFailuresMessage,

    getLiftoverStatusClass: liftover.getLiftoverStatusClass,

    getInitialTab() {
      if (this.data.entries?.length)
        return this.tabs.entries;
      if (this.data.liftover_failures?.length)
        return this.tabs.failures;
      if (this.data.resources?.length)
        return this.tabs.resources;

      return null;
    }
  }
}
</script>
