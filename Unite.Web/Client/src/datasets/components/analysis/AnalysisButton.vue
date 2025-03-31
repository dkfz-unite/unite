<template>
  <u-kmeier-dialog v-if="showKmeierAnalysis" ref="KmeierDialog" :datasets="datasets" />
  <u-deseq2-dialog v-if="showDeseq2Analysis" ref="Deseq2Dialog" :datasets="datasets" />
  <u-scell-dialog v-if="showScellAnalysis" ref="ScellDialog" :datasets="datasets" />
  <u-meth-dialog v-if="showDnaMethAnalysis" ref="MethDialog" :datasets="datasets" />

  <q-btn label="Analysis" icon="las la-chart-pie" :disable="!enableAnalysis" flat dense no-caps>
    <q-menu>
      <q-list>
        <q-item v-if="showKmeierAnalysis" @click="$refs.KmeierDialog.show()" clickable v-close-popup dense>
          <q-item-section>
            <q-item-label>Donors - Survival Estimation Analysis</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="showDeseq2Analysis" @click="$refs.Deseq2Dialog.show()" clickable v-close-popup dense>
          <q-item-section>
            <q-item-label>RNA - Differential Expression Analysis</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="showScellAnalysis" @click="$refs.ScellDialog.show()" clickable v-close-popup dense>
          <q-item-section>
            <q-item-label>scRNA - Dataset Creation</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="showDnaMethAnalysis" @click="$refs.MethDialog.show()" clickable v-close-popup dense>
          <q-item-section>
            <q-item-label>Differential Methylation Analysis</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script>
import UKmeierDialog from "@/analysis/components/kmeier/Dialog.vue";
import UDeseq2Dialog from "@/analysis/components/deseq2/Dialog.vue";
import UScellDialog from "@/analysis/components/scell/Dialog.vue";
import UMethDialog from "@/analysis/components/meth/Dialog.vue";

export default {
  components: {
    UKmeierDialog,
    UDeseq2Dialog,
    UScellDialog,
    UMethDialog
  },

  props: {
    datasets: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    enableAnalysis() {
      return this.showKmeierAnalysis
          || this.showDeseq2Analysis
          || this.showScellAnalysis
          || this.showDnaMethAnalysis;
    },

    showKmeierAnalysis() {
      return this.datasets?.length >= 1 &&
             this.datasets?.every(dataset => dataset.domain == "donors") &&
             this.datasets?.every(dataset => dataset.data?.clinical == true);
    },

    showDeseq2Analysis() {
      return this.datasets?.length == 2 &&
             this.datasets?.every(dataset => dataset.data?.geneExp == true);
    },

    showScellAnalysis() {
      return this.datasets?.length == 1 &&
             this.datasets?.every(dataset => dataset.data?.geneExpSc == true);
    },
    showDnaMethAnalysis() {
      return this.datasets?.length > 1 &&
             this.datasets?.every(dataset => dataset.data?.meth === true);
    }
  }
}
</script>