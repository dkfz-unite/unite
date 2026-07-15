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

  <q-btn label="Analysis" icon="las la-chart-pie" :disable="!enableAnalysis()" flat dense no-caps>
    <q-menu>
      <q-list>
        <q-item v-if="$refs.SurvDialog.canShow(datasets)" @click="$refs.SurvDialog.show(datasets)" clickable v-close-popup dense>
          <q-item-section>
            <q-item-label>Survival Curve Estimation</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="$refs.DmDialog.canShow(datasets)" @click="$refs.DmDialog.show(datasets)" clickable v-close-popup dense>
          <q-item-section>
            <q-item-label>Differential Methylation</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="$refs.PcamDialog.canShow(datasets)" @click="$refs.PcamDialog.show(datasets)" clickable v-close-popup dense>
          <q-item-section>
            <q-item-label>PCA of Methylation Profiles</q-item-label>
        </q-item-section>
        </q-item>
        <q-item v-if="$refs.DegDialog.canShow(datasets)" @click="$refs.DegDialog.show(datasets)" clickable v-close-popup dense>
          <q-item-section>
            <q-item-label>Differential <strong>Gene</strong> Expression</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="$refs.DepDialog.canShow(datasets)" @click="$refs.DepDialog.show(datasets)" clickable v-close-popup dense>
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
        <q-item v-if="$refs.UmappDialog.canShow(datasets)" @click="$refs.UmappDialog.show(datasets)" clickable v-close-popup dense>
          <q-item-section>
            <q-item-label>UMAP of <strong>Protein</strong> Expression Profiles</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="$refs.cedpDialog.canShow(datasets)" @click="$refs.cedpDialog.show(datasets)" clickable v-close-popup dense>
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
    showGafAnalysis() {
      return this.datasets?.length == 1 &&
             this.datasets?.every(dataset => dataset.data?.sms === true);
    },

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
          || this.showGafAnalysis
          || this.$refs.DepDialog?.canShow(this.datasets)
          || this.showScellAnalysis
          || this.$refs.UmappDialog?.canShow(this.datasets)
          || this.$refs.cedpDialog?.canShow(this.datasets);
    }
  }
}
</script>