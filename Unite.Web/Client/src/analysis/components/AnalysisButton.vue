<template>
  <u-surv-dialog ref="SurvDialog" :datasets="datasets" />
  <u-dm-dialog ref="DmDialog" :datasets="datasets" />
  <u-pcam-dialog ref="PcamDialog" :datasets="datasets" />
  <u-deg-dialog ref="DegDialog" :datasets="datasets" />
  <u-gaf-dialog v-if="showGafAnalysis" ref="GafDialog" :datasets="datasets" />
  <u-dep-dialog ref="DepDialog" :datasets="datasets" />
  <u-scell-dialog v-if="showScellAnalysis" ref="ScellDialog" :datasets="datasets" />
  <u-umapp-dialog ref="UmappDialog" :datasets="datasets" />
  <u-cedp-dialog ref="cedpDialog" :datasets="datasets" />

  <q-btn label="Analysis" icon="las la-chart-pie" :disable="!enableAnalysis" flat dense no-caps>
    <q-menu>
      <q-list>
        <q-item v-if="$refs.SurvDialog.canShow()" @click="$refs.SurvDialog.show()" clickable v-close-popup dense>
          <q-item-section>
            <q-item-label>Survival Curve Estimation</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="$refs.DmDialog.canShow()" @click="$refs.DmDialog.show()" clickable v-close-popup dense>
          <q-item-section>
            <q-item-label>Differential Methylation</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="$refs.PcamDialog.canShow()" @click="$refs.PcamDialog.show()" clickable v-close-popup dense>
          <q-item-section>
            <q-item-label>PCA of Methylation Profiles</q-item-label>
        </q-item-section>
        </q-item>
        <q-item v-if="$refs.DegDialog.canShow()" @click="$refs.DegDialog.show()" clickable v-close-popup dense>
          <q-item-section>
            <q-item-label>Differential <strong>Gene</strong> Expression</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="$refs.DepDialog.canShow()" @click="$refs.DepDialog.show()" clickable v-close-popup dense>
          <q-item-section>
            <q-item-label>Differential <strong>Protein</strong> Expression</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="showGafAnalysis" @click="$refs.GafDialog.show()" clickable v-close-popup dense>
          <q-item-section>
            <q-item-label>Gene Alteration Frequency</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="showScellAnalysis" @click="$refs.ScellDialog.show()" clickable v-close-popup dense>
          <q-item-section>
            <q-item-label>scRNA Dataset Creation</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="$refs.UmappDialog.canShow()" @click="$refs.UmappDialog.show()" clickable v-close-popup dense>
          <q-item-section>
            <q-item-label>UMAP of <strong>Protein</strong> Expression Profiles</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="$refs.cedpDialog.canShow()" @click="$refs.cedpDialog.show()" clickable v-close-popup dense>
          <q-item-section>
            <q-item-label><strong>Protein</strong> expression distribution per condition</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script>
import USurvDialog from "./surv/Dialog.vue";
import UDmDialog from "./dm/Dialog.vue";
import UPcamDialog from "./pcam/Dialog.vue";
import UDegDialog from "./deg/Dialog.vue";
import UGafDialog from "./gaf/Dialog.vue";
import UDepDialog from "./dep/Dialog.vue";
import UScellDialog from "./scell/Dialog.vue";
import UUmappDialog from "./umapp/Dialog.vue";
import UCedpDialog from "./cedp/Dialog.vue";
import CedpAnalysis from "./cedp/analysis";

export default {
  components: {
    USurvDialog,
    UDmDialog,
    UPcamDialog,
    UDegDialog,
    UGafDialog,
    UDepDialog,
    UScellDialog,
    UUmappDialog,
    UCedpDialog
  },

  props: {
    datasets: {
      type: Array,
      default: () => [],
    },
  },

  setup() {
    return {
      CedpAnalysis
    }
  },

  computed: {
    enableAnalysis() {
      const canRun = this.$refs.SurvDialog?.canShow()
          || this.$refs.DmDialog?.canShow()
          || this.$refs.PcamDialog?.canShow()
          || this.$refs.DegDialog?.canShow()
          || this.showGafAnalysis
          || this.$refs.DepDialog?.canShow()
          || this.showScellAnalysis
          || this.$refs.UmappDialog?.canShow()
          || this.$refs.cedpDialog?.canShow();

      copnsole.log("enableAnalysis", canRun);
      return canRun;
    },

    showGafAnalysis() {
      return this.datasets?.length == 1 &&
             this.datasets?.every(dataset => dataset.data?.sms === true);
    },

    showScellAnalysis() {
      return this.datasets?.length == 1 &&
             this.datasets?.every(dataset => dataset.data?.expSc == true);
    }
  }
}
</script>