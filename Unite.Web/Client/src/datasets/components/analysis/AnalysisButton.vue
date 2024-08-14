<template>
  <d-exp-analysis-dialog v-if="showDExpAnalysis" ref="dExpAnalysisDialog" :datasets="datasets" />
  <!-- <sc-analysis-dialog v-if="showScAnalysis" ref="scAnalysisDialog" :datasets="datasets" /> -->

  <q-btn label="Analysis" icon="las la-chart-pie" :disable="!enableAnalysis" flat dense no-caps>
    <q-menu>
      <q-list>
        <q-item v-if="showDExpAnalysis" @click="$refs.dExpAnalysisDialog.show()" clickable v-close-popup dense>
          <q-item-section>
            <q-item-label>Differential Expression</q-item-label>
          </q-item-section>
        </q-item>
        <!-- <q-item v-if="showScAnalysis" @click="$refs.scAnalysisDialog.show()" clickable v-close-popup dense>
          <q-item-section>
            <q-item-label>Single Cell</q-item-label>
          </q-item-section>
        </q-item> -->
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script>
import DExpAnalysisDialog from "@/analysis/components/deseq2/Dialog.vue";
// import ScAnalysisDialog from "@/analysis/components/sc/Dialog.vue";

export default {
  components: {
    DExpAnalysisDialog,
    // ScAnalysisDialog
  },

  props: {
    datasets: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    enableAnalysis() {
      return this.showDExpAnalysis
          || this.showScAnalysis;
    },

    showDExpAnalysis() {
      return this.datasets?.length == 2 && this.datasets?.every(dataset => dataset.data?.geneExp == true);
    },

    // showScAnalysis() {
    //   return this.datasets?.length == 1 && this.datasets?.every(dataset => dataset.data?.geneExpSc == true);
    // }
  },
}
</script>