<template>
  <d-exp-analysis-dialog v-if="showDExpAnalysis" ref="dExpAnalysisDialog" :cohorts="cohorts" />

  <q-btn label="Analysis" icon="las la-chart-pie" :disable="!enableAnalysis" flat dense no-caps>
    <q-menu>
      <q-list>
        <q-item v-if="showDExpAnalysis" @click="$refs.dExpAnalysisDialog.show()" clickable v-close-popup dense>
          <q-item-section>
            <q-item-label>Differential Expression (DE)</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script>
import DExpAnalysisDialog from "@/analysis/components/deseq2/Dialog.vue";

export default {
  components: {
    DExpAnalysisDialog,
  },

  props: {
    cohorts: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    enableAnalysis() {
      return this.showDExpAnalysis;
    },

    showDExpAnalysis() {
      return this.cohorts?.length == 2 && this.cohorts?.every(cohort => cohort.data?.geneExp == true);
    }
  },
}
</script>