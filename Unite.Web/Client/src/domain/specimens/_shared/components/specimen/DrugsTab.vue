<template>
  <div class="col q-gutter-y-sm">
    <div class="row">
      <span class="text-h5 u-text-title">Drug Screening Data</span>
    </div>

    <div class="row q-gutter-x-sm">
      <span class="text-h6 u-text-title">Mode:</span>
      <q-radio v-model="mode" val="dss" label="DSS" dense />
      <q-radio v-model="mode" val="sdss" label="sDSS" dense />
    </div>

    <div class="row" v-if="mode == 'dss'">
      <div class="col-12 col-lg-8">
        <div class="row justify-center">
          <span class="text-subtitle1 q-mb-sm">Drug Sensitivity Scores</span>
        </div>
        <div class="row">
          <div class="col">
            <q-card class="q-mx-xs q-pa-xs">
              <u-dss-bar-plot id="dss-bar-plot" :screenings="screenings" />
            </q-card>
          </div>
        </div>
      </div>
    </div>

    <div class="row" v-if="mode == 'sdss'">
      <div class="col-12 col-lg-8">
        <div class="row justify-center">
          <span class="text-subtitle1 q-mb-sm">Selective Drug Sensitivity Scores</span>
        </div>
        <div class="row">
          <div class="col">
            <q-card class="q-mx-xs q-pa-xs">
              <u-dss-sel-bar-plot id="sdss-bar-plot" :screenings="screenings" />
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import UDssHeatmapPlot from "./drugs/DssHeatmapPlot.vue";
import UDssBarPlot from "./drugs/DssBarPlot.vue";
import UDssSelBarPlot from "./drugs/DssSelBarPlot.vue";

export default {
  props: {
    specimen: Object
  },

  components: {
    // UDssHeatmapPlot,
    UDssBarPlot,
    UDssSelBarPlot
  },

  data() {
    return {
      screening: null,
      mode: "dss"
    }
  },

  computed:{
    screenings() {
      if (this.specimen.tissue) {
        return this.specimen.tissue.drugScreenings;
      } else if (this.specimen.cellLine) {
        return this.specimen.cellLine.drugScreenings;
      } else if (this.specimen.organoid) {
        return this.specimen.organoid.drugScreenings;
      } else if (this.specimen.xenograft) {
        return this.specimen.xenograft.drugScreenings;
      } else {
        return null;
      }
    }
  }
}
</script>