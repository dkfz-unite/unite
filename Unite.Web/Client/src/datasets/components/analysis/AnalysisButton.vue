<template>
  <u-surv-dialog v-if="showSurvAnalysis" ref="SurvDialog" :datasets="datasets" />
  <u-dm-dialog v-if="showDmAnalysis" ref="DmDialog" :datasets="datasets" />
  <u-pcam-dialog v-if="showPcamAnalysis" ref="PcamDialog" :datasets="datasets" />
  <u-deg-dialog v-if="showDegAnalysis" ref="DegDialog" :datasets="datasets" />
  <u-gaf-dialog v-if="showGafAnalysis" ref="GafDialog" :datasets="datasets" />
  <u-dep-dialog v-if="showDepAnalysis" ref="DepDialog" :datasets="datasets" />
  <u-scell-dialog v-if="showScellAnalysis" ref="ScellDialog" :datasets="datasets" />
  <u-umapp-dialog v-if="showUmappAnalysis" ref="UmappDialog" :datasets="datasets" />
  <u-cnv-profiles-dialog v-if="showCnvProfileAnalysis" ref="CnvProfilesDialog" :datasets="datasets" />

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
            <q-item-label>Differential Methylation</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="showPcamAnalysis" @click="$refs.PcamDialog.show()" clickable v-close-popup dense>
          <q-item-section>
            <q-item-label>PCA of Methylation Profiles</q-item-label>
        </q-item-section>
        </q-item>
        <q-item v-if="showDegAnalysis" @click="$refs.DegDialog.show()" clickable v-close-popup dense>
          <q-item-section>
            <q-item-label>Differential <strong>Gene</strong> Expression</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="showDepAnalysis" @click="$refs.DepDialog.show()" clickable v-close-popup dense>
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
        <q-item v-if="showUmappAnalysis" @click="$refs.UmappDialog.show()" clickable v-close-popup dense>
          <q-item-section>
            <q-item-label>UMAP of <strong>Protein</strong> Expression Profiles</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="showCnvProfileAnalysis" @click="$refs.CnvProfilesDialog.show()" clickable v-close-popup dense>
          <q-item-section>
            <q-item-label>CNV Profiles</q-item-label>
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
import UDegDialog from "@/analysis/components/deg/Dialog.vue";
import UGafDialog from "@/analysis/components/gaf/Dialog.vue";
import UDepDialog from "@/analysis/components/dep/Dialog.vue";
import UScellDialog from "@/analysis/components/scell/Dialog.vue";
import UUmappDialog from "@/analysis/components/umapp/Dialog.vue";
import UCnvProfilesDialog from "@/analysis/components/cnv-profiles/Dialog.vue";

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
    UCnvProfilesDialog
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
          || this.showDegAnalysis
          || this.showGafAnalysis
          || this.showDepAnalysis
          || this.showScellAnalysis
          || this.showUmappAnalysis
          || this.showCnvProfileAnalysis;
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
      return this.datasets?.length == 1 &&
             this.datasets?.every(dataset => dataset.data?.meth === true);
    },

    showDegAnalysis() {
      return this.datasets?.length == 2 &&
             this.datasets?.every(dataset => dataset.data?.exp == true);
    },

    showGafAnalysis() {
      return this.datasets?.length == 1 &&
             this.datasets?.every(dataset => dataset.data?.sms === true);
    },

    showDepAnalysis() {
      return this.datasets?.length == 2 &&
             this.datasets?.every(dataset => dataset.data?.prot === true);
    },

    showScellAnalysis() {
      return this.datasets?.length == 1 &&
             this.datasets?.every(dataset => dataset.data?.expSc == true);
    },

    showUmappAnalysis() {
      return this.datasets?.length == 1 &&
             this.datasets?.every(dataset => dataset.data?.prot == true);
    },

    showCnvProfileAnalysis() {
      return this.datasets?.length == 1 /*&&
          this.datasets?.every(dataset => dataset.data?.prot == true)*/;
    }
  }
}
</script>