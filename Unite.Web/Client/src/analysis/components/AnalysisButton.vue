<template>
  <u-surv-dialog ref="SurvDialog" />
  <u-dm-dialog ref="DmDialog" />
  <u-pcam-dialog ref="PcamDialog" />
  <u-deg-dialog ref="DegDialog" />
  <u-gaf-dialog ref="GafDialog" />
  <u-dep-dialog ref="DepDialog" />
  <u-scell-dialog v-if="showScellAnalysis" ref="ScellDialog" :datasets="datasets" />
  <u-umapp-dialog ref="UmappDialog" />
  <u-cedp-dialog ref="cedpDialog" />

  <q-btn label="Analysis" icon="las la-chart-pie" :disable="!enableAnalysis()" flat dense no-caps>
    <q-menu>
      <q-list>
        <q-item v-if="$refs.SurvDialog.canShow(datasets)" @click="$refs.SurvDialog.showNew(datasets)" clickable v-close-popup dense>
          <q-item-section>
            <q-item-label>Survival Curve Estimation</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="$refs.DmDialog.canShow(datasets)" @click="$refs.DmDialog.showNew(datasets)" clickable v-close-popup dense>
          <q-item-section>
            <q-item-label>Differential Methylation</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="$refs.PcamDialog.canShow(datasets)" @click="$refs.PcamDialog.showNew(datasets)" clickable v-close-popup dense>
          <q-item-section>
            <q-item-label>PCA of Methylation Profiles</q-item-label>
        </q-item-section>
        </q-item>
        <q-item v-if="$refs.DegDialog.canShow(datasets)" @click="$refs.DegDialog.showNew(datasets)" clickable v-close-popup dense>
          <q-item-section>
            <q-item-label>Differential <strong>Gene</strong> Expression</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="$refs.DepDialog.canShow(datasets)" @click="$refs.DepDialog.showNew(datasets)" clickable v-close-popup dense>
          <q-item-section>
            <q-item-label>Differential <strong>Protein</strong> Expression</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="$refs.GafDialog.canShow(datasets)" @click="$refs.GafDialog.showNew(datasets)" clickable v-close-popup dense>
          <q-item-section>
            <q-item-label>Gene Alteration Frequency</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="showScellAnalysis" @click="$refs.ScellDialog.show()" clickable v-close-popup dense>
          <q-item-section>
            <q-item-label>scRNA Dataset Creation</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="$refs.UmappDialog.canShow(datasets)" @click="$refs.UmappDialog.showNew(datasets)" clickable v-close-popup dense>
          <q-item-section>
            <q-item-label>UMAP of <strong>Protein</strong> Expression Profiles</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="$refs.cedpDialog.canShow(datasets)" @click="$refs.cedpDialog.showNew(datasets)" clickable v-close-popup dense>
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
    showScellAnalysis() {
      return this.datasets?.length == 1 &&
             this.datasets?.every(dataset => dataset.data?.expSc == true);
    }
  },

  methods: {
    enableAnalysis() {
      return this.$refs.SurvDialog?.canShow(this.datasets)
          || this.$refs.DmDialog?.canShow(this.datasets)
          || this.$refs.PcamDialog?.canShow(this.datasets)
          || this.$refs.DegDialog?.canShow(this.datasets)
          || this.$refs.GafDialog?.canShow(this.datasets)
          || this.$refs.DepDialog?.canShow(this.datasets)
          || this.showScellAnalysis
          || this.$refs.UmappDialog?.canShow(this.datasets)
          || this.$refs.cedpDialog?.canShow(this.datasets);
    }
  }
}
</script>