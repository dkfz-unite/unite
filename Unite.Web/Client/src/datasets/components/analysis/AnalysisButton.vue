<template>
  <u-surv-dialog v-if="showSurvAnalysis" ref="SurvDialog" :datasets="datasets" />
  <u-dm-dialog v-if="showDmAnalysis" ref="DmDialog" :datasets="datasets" />
  <u-pcam-dialog v-if="showPcamAnalysis" ref="PcamDialog" :datasets="datasets" />
  <u-de-dialog v-if="showDeAnalysis" ref="DeDialog" :datasets="datasets" />
  <u-scell-dialog v-if="showScellAnalysis" ref="ScellDialog" :datasets="datasets" />

  <q-btn label="Analysis" icon="las la-chart-pie" :disable="!enableAnalysis" flat dense no-caps>
    <q-menu>
      <q-list>
        <q-item v-if="showSurvAnalysis" @click="$refs.SurvDialog.show()" clickable v-close-popup dense>
          <q-item-section>
            <q-item-label>Survival Curve Estimation</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="showDmAnalysis" @click="$refs.DmDialog.show()" clickable v-close-popup dense>
          <q-item-section>
            <q-item-label>Differential Methylation Analysis</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="showPcamAnalysis" @click="$refs.PcamDialog.show()" clickable v-close-popup dense>
          <q-item-section>
            <q-item-label>PCA of Methylation Profiles</q-item-label>
        </q-item-section>
        </q-item>
        <q-item v-if="showDeAnalysis" @click="$refs.DeDialog.show()" clickable v-close-popup dense>
          <q-item-section>
            <q-item-label>Differential Expression</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="showScellAnalysis" @click="$refs.ScellDialog.show()" clickable v-close-popup dense>
          <q-item-section>
            <q-item-label>scRNA Dataset Creation</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script>
import USurvDialog from "@/analysis/components/surv/Dialog.vue";
import UDmDialog from "@/analysis/components/dm/Dialog.vue";
import UPcamDialog from "@/analysis/components/pcam/Dialog.vue";
import UDeDialog from "@/analysis/components/de/Dialog.vue";
import UScellDialog from "@/analysis/components/scell/Dialog.vue";


export default {
  components: {
    USurvDialog,
    UDmDialog,
    UPcamDialog,
    UDeDialog,
    UScellDialog
  },

  props: {
    datasets: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    enableAnalysis() {
      return this.showSurvAnalysis
          || this.showDmAnalysis
          || this.showPcamAnalysis
          || this.showDeAnalysis
          || this.showScellAnalysis;
    },

    showSurvAnalysis() {
      return this.datasets?.length >= 1 &&
             this.datasets?.every(dataset => dataset.domain == "donors") &&
             this.datasets?.every(dataset => dataset.data?.clinical == true);
    },

    showDmAnalysis() {
      return this.datasets?.length > 1 &&
             this.datasets?.every(dataset => dataset.data?.meth === true);
    },
    
    showPcamAnalysis() {
      return this.datasets?.length >= 1 &&
             this.datasets?.every(dataset => dataset.data?.meth === true);
    },

    showDeAnalysis() {
      return this.datasets?.length == 2 &&
             this.datasets?.every(dataset => dataset.data?.exp == true);
    },

    showScellAnalysis() {
      return this.datasets?.length == 1 &&
             this.datasets?.every(dataset => dataset.data?.expSc == true);
    }
  }
}
</script>