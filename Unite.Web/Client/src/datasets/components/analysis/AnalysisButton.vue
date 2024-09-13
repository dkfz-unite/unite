<template>
  <rna-de-dialog v-if="showRnaDeAnalysis" ref="RnaDeDialog" :datasets="datasets" />
  <rnasc-dialog v-if="showRnascAnalysis" ref="RnascDialog" :datasets="datasets" />

  <q-btn label="Analysis" icon="las la-chart-pie" :disable="!enableAnalysis" flat dense no-caps>
    <q-menu>
      <q-list>
        <q-item v-if="showRnaDeAnalysis" @click="$refs.RnaDeDialog.show()" clickable v-close-popup dense>
          <q-item-section>
            <q-item-label>RNA - Differential Expression Analysis</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="showRnascAnalysis" @click="$refs.RnascDialog.show()" clickable v-close-popup dense>
          <q-item-section>
            <q-item-label>scRNA - Dataset Creation</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script>
import RnaDeDialog from "@/analysis/components/rna-de/Dialog.vue";
import RnascDialog from "@/analysis/components/rnasc/Dialog.vue";

export default {
  components: {
    RnaDeDialog,
    RnascDialog
  },

  props: {
    datasets: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    enableAnalysis() {
      return this.showRnaDeAnalysis
          || this.showRnascAnalysis;
    },

    showRnaDeAnalysis() {
      return this.datasets?.length == 2 && this.datasets?.every(dataset => dataset.data?.geneExp == true);
    },

    showRnascAnalysis() {
      return this.datasets?.length == 1 && this.datasets?.every(dataset => dataset.data?.geneExpSc == true);
    }
  },
}
</script>