<template>
  <u-don-sce-dialog v-if="showDonSceAnalysis" ref="DonSceDialog" :datasets="datasets" />
  <u-meth-dm-dialog v-if="showMethDmAnalysis" ref="MethDmDialog" :datasets="datasets" />
  <u-rna-de-dialog v-if="showRnaDeAnalysis" ref="RnaDeDialog" :datasets="datasets" />
  <u-rnasc-dc-dialog v-if="showRnascDcAnalysis" ref="RnascDcDialog" :datasets="datasets" />

  <q-btn label="Analysis" icon="las la-chart-pie" :disable="!enableAnalysis" flat dense no-caps>
    <q-menu>
      <q-list>
        <q-item v-if="showDonSceAnalysis" @click="$refs.DonSceDialog.show()" clickable v-close-popup dense>
          <q-item-section>
            <q-item-label>Survival Curve Estimation</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="showMethDmAnalysis" @click="$refs.MethDmDialog.show()" clickable v-close-popup dense>
          <q-item-section>
            <q-item-label>Differential Methylation</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="showRnaDeAnalysis" @click="$refs.RnaDeDialog.show()" clickable v-close-popup dense>
          <q-item-section>
            <q-item-label>RNA Differential Expression</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="showRnascDcAnalysis" @click="$refs.RnascDcDialog.show()" clickable v-close-popup dense>
          <q-item-section>
            <q-item-label>scRNA Dataset Creation</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script>
import UDonSceDialog from "@/analysis/components/don-sce/Dialog.vue";
import UMethDmDialog from "@/analysis/components/meth-dm/Dialog.vue";
import URnaDeDialog from "@/analysis/components/rna-de/Dialog.vue";
import URnascDcDialog from "@/analysis/components/rnasc-dc/Dialog.vue";


export default {
  components: {
    UDonSceDialog,
    UMethDmDialog,
    URnaDeDialog,
    URnascDcDialog
  },

  props: {
    datasets: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    enableAnalysis() {
      return this.showDonSceAnalysis
          || this.showMethDmAnalysis
          || this.showRnaDeAnalysis
          || this.showRnascDcAnalysis;
    },

    showDonSceAnalysis() {
      return this.datasets?.length >= 1 &&
             this.datasets?.every(dataset => dataset.domain == "donors") &&
             this.datasets?.every(dataset => dataset.data?.clinical == true);
    },

    showMethDmAnalysis() {
      return this.datasets?.length > 1 &&
             this.datasets?.every(dataset => dataset.data?.meth === true);
    },

    showRnaDeAnalysis() {
      return this.datasets?.length == 2 &&
             this.datasets?.every(dataset => dataset.data?.exp == true);
    },

    showRnascDcAnalysis() {
      return this.datasets?.length == 1 &&
             this.datasets?.every(dataset => dataset.data?.geneExpSc == true);
    }
  }
}
</script>