<template>
  <div class="col q-gutter-y-sm">
    <div class="row q-gutter-x-sm">
      <span class="text-h5 u-text-title">Drug Screening Data</span>
      <q-radio v-if="hasDssSelective" v-model="mode" val="dss" label="DSS" class="q-mt-xs" dense />
      <q-radio v-if="hasDssSelective" v-model="mode" val="sdss" label="sDSS" class="q-mt-xs" dense />
    </div>

    <div class="row" v-if="mode == 'dss' && screenings">
      <div class="col-12 col-lg-8">
        <div class="row justify-center">
          <span class="text-subtitle1 q-mb-sm">Drug Sensitivity Scores</span>
        </div>
        <div class="row">
          <div class="col">
            <q-card class="q-mx-xs q-pa-xs">
              <u-dss-bar-plot id="dss-bar-plot" :screenings="screenings" @click="onDssClick" />
            </q-card>
          </div>
        </div>
      </div>

      <div class="col-12 col-lg-4" v-if="screeningDss">
        <div class="row justify-center">
          <span class="text-subtitle1 q-mb-sm">'{{screeningDss.drug}}' Inhibition Level</span>
        </div>
        <div class="row">
          <div class="col">
            <q-card class="q-mx-xs q-pa-xs">
              <u-inhibition-line-plot id="dss-inhibition-line-plot" :screening="screeningDss" />
            </q-card>
          </div>
        </div>
      </div>
    </div>

    <div class="row" v-if="mode == 'sdss' && screenings">
      <div class="col-12 col-lg-8">
        <div class="row justify-center">
          <span class="text-subtitle1 q-mb-sm">Selective Drug Sensitivity Scores</span>
        </div>
        <div class="row">
          <div class="col">
            <q-card class="q-mx-xs q-pa-xs">
              <u-dss-sel-bar-plot id="sdss-bar-plot" :screenings="screenings" @click="onDssSelectiveClick"/>
            </q-card>
          </div>
        </div>
      </div>

      <div class="col-12 col-lg-4" v-if="screeningDssSelective">
        <div class="row justify-center">
          <span class="text-subtitle1 q-mb-sm">'{{screeningDssSelective.drug}}' Response Curve</span>
        </div>
        <div class="row">
          <div class="col">
            <q-card class="q-mx-xs q-pa-xs">
              <u-inhibition-line-plot id="sdss-inhibition-line-plot" :screening="screeningDssSelective" />
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UDssBarPlot from "./drugs/DssBarPlot.vue";
import UDssSelBarPlot from "./drugs/DssSelBarPlot.vue";
import UInhibitionLinePlot from "./drugs/InhibitionLinePlot.vue";
import api from "../../api";

export default {
  props: {
    specimen: Object
  },

  components: {
    UDssBarPlot,
    UDssSelBarPlot,
    UInhibitionLinePlot
  },

  data() {
    return {
      screenings: null,
      screeningDss: null,
      screeningDssSelective: null,
      mode: "dss"
    }
  },

  computed:{
    hasDssSelective() {
      return this.screenings?.some(screening => screening.dssSelective != null);
    }
  },

  watch: {
    mode() {
      this.screeningDss = null;
      this.screeningDssSelective = null;
    }
  },

  async mounted() {
    this.screenings = await this.fetchData();
  },

  methods: {
    onDssClick(event) {
      if (this.hasDrugResponseData(event.data)) {
        this.screeningDss = event.data;
      } else {
        this.screeningDss = null;
      }
    },

    onDssSelectiveClick(event) {
      if (this.hasDrugResponseData(event.data)) {
        this.screeningDssSelective = event.data;
      } else {
        this.screeningDssSelective = null;
      }
    },

    hasDrugResponseData(screening) {
      return (screening.concentration?.length && screening.inhibition?.length)
          || (screening.concentrationLine?.length && screening.inhibitionLine?.length);
    },

    async fetchData() {
      return await api.searchDrugs(this.specimen.id);
    }
  }
}
</script>