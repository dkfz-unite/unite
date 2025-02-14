<template>
  <q-card style="min-width: 400px">
    <q-card-section>
      <div class="text-h6">{{ title }}</div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <div class="col q-gutter-y-sm">
        <div class="row">
          <div class="text-subtitle1">{{ message }}</div>
        </div>
        <div class="row">
          <div class="col q-gutter-y-sm">
            <div class="row">
              <q-checkbox v-model="selectAll" label="All" :disable="loading" dense />
            </div>
            <q-separator />
            <div class="row" v-if="hasDonorsData">
              <q-checkbox v-model="model.donors" label="Donors" :disable="loading" dense />
            </div>
            <div class="row q-pl-md" v-if="hasClinicalData">
              <q-checkbox v-model="model.clinical" label="Clinical" :disable="loading" dense />
            </div>
            <div class="row q-pl-md" v-if="hasTreatmentsData">
              <q-checkbox v-model="model.treatments" label="Treatments" :disable="loading" dense />
            </div>
            <div class="row" v-if="hasMrisData">
              <q-checkbox v-model="model.mris" label="MRI images" :disable="loading" dense />
            </div>
            <div class="row" v-if="hasCtsData">
              <q-checkbox v-model="model.cts" label="CT images" :disable="loading" dense />
            </div>
            <div class="row" v-if="hasSpecimensData">
              <q-checkbox v-model="model.specimens" label="Specimens" :disable="loading" dense />
            </div>
            <div class="row q-pl-md" v-if="hasInterventionsData">
              <q-checkbox v-model="model.interventions" label="Interventions" :disable="loading" dense />
            </div>
            <div class="row q-pl-md" v-if="hasDrugScreeningsData">
              <q-checkbox v-model="model.drugs" label="Drug screenings" :disable="loading" dense />
            </div>
            <div class="row" v-if="hasSsmsData">
              <q-checkbox v-model="model.ssms" label="Simple somatic mutations (SSM)" :disable="loading" dense />
            </div>
            <div class="row q-pl-md q-gutter-x-sm" v-if="hasSsmsData">
              <div>Affected genes:</div>
              <q-checkbox v-model="model.ssmsTranscriptsSlim" label="Slim" :disable="loading" dense />
              <q-checkbox v-model="model.ssmsTranscriptsFull" label="Full" :disable="loading" dense />
            </div>
            <div class="row" v-if="hasCnvsData">
              <q-checkbox v-model="model.cnvs" label="Copy number variants (CNV)" :disable="loading" dense />
            </div>
            <div class="row q-pl-md q-gutter-x-sm" v-if="hasCnvsData">
              <div>Affected genes:</div>
              <q-checkbox v-model="model.cnvsTranscriptsSlim" label="Slim" :disable="loading" dense />
              <q-checkbox v-model="model.cnvsTranscriptsFull" label="Full" :disable="loading" dense />
            </div>
            <div class="row" v-if="hasSvsData">
              <q-checkbox v-model="model.svs" label="Structural variants (SV)" :disable="loading" dense />
            </div>
            <div class="row q-pl-md q-gutter-x-sm" v-if="hasSvsData">
              <div>Affected genes:</div>
              <q-checkbox v-model="model.svsTranscriptsSlim" label="Slim" :disable="loading" dense />
              <q-checkbox v-model="model.svsTranscriptsFull" label="Full" :disable="loading" dense />
            </div>
            <div class="row" v-if="hasGeneExpData">
              <q-checkbox v-model="model.geneExp" label="Bulk gene expressions" :disable="loading" dense />
            </div>
            <!-- <div class="row" v-if="hasGeneExpScData">
              <q-checkbox v-model="model.geneExpSc" label="Single cell gene expressions" :disable="loading" dense />
            </div> -->

            <!-- Caution message -->
            <div class="row q-pl-md" v-if="showCaution">
              <div class="col text-warning">
                <div class="row" style="width: 350px;">Note, including variant Effects may significantly increase file size and make it hard to read.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-actions align="right" class="text-primary">
      <q-btn label="Cancel" dense flat no-caps @click="onCancel" />
      <q-btn label="Download" :disable="!canSubmit" @click="onSubmit" :loading="loading" dense flat no-caps />
    </q-card-actions>
  </q-card>
</template>

<script>
import Settings from "@/_settings/settings";

const specimenDomains = [Settings.materials.domain, Settings.lines.domain, Settings.organoids.domain, Settings.xenografts.domain];

export default {
  props: {
    title: {
      type: String,
      default: "Download Data"
    },
    message: {
      type: String,
      default: "Choose which data to download:"
    },
    domain: {
      type: String,
      required: true
    },
    data: {
      type: Object,
      required: true
    },
    loading: {
      type: Boolean,
      required: true,
      default: false
    }
  },

  emits: ['submit', 'cancel'],

  data() {
    return {
      model: {
        donors: false,
        clinical: false,
        treatments: false,
        mris: false,
        cts: false,
        specimens: false,
        interventions: false,
        drugs: false,
        ssms: false,
        ssmsTranscriptsSlim: false,
        ssmsTranscriptsFull: false,
        cnvs: false,
        cnvsTranscriptsSlim: false,
        cnvsTranscriptsFull: false,
        svs: false,
        svsTranscriptsSlim: false,
        svsTranscriptsFull: false,
        geneExp: false,
        geneExpSc: false
      }
    };
  },

  computed: {
    hasDonorsData() {
      return true;
    },

    hasClinicalData() {
      return this.data?.clinical === true;
    },

    hasTreatmentsData() {
      return this.data?.treatments === true;
    },

    hasMrisData() {
      return this.data?.mris === true;
    },

    hasCtsData() {
      return this.data?.cts === true
    },

    hasSpecimensData() {
      const specimensDomain = specimenDomains.includes(this.domain);

      if (specimensDomain) {
        return true;
      } else {
        return this.data?.materials === true
            || this.data?.lines === true
            || this.data?.organoids === true
            || this.data?.xenografts === true;
      }
    },

    hasInterventionsData() {
      const specimensDomain = specimenDomains.includes(this.domain);

      if (specimensDomain) {
        return this.data?.interventions === true;
      } else {
        return this.data?.linesInterventions === true
            || this.data?.organoidsInterventions === true
            || this.data?.xenograftsInterventions === true;
      }
    },

    hasDrugScreeningsData() {
      const specimensDomain = specimenDomains.includes(this.domain);

      if (specimensDomain) {
        return this.data?.drugs === true;
      } else {
        return this.data?.linesDrugs === true
            || this.data?.organoidsDrugs === true
            || this.data?.xenograftsDrugs === true;
      }
    },

    hasSsmsData() {
      return this.data?.ssms === true;
    },

    hasCnvsData() {
      return this.data?.cnvs === true;
    },

    hasSvsData() {
      return this.data?.svs === true;
    },

    hasGeneExpData() {
      return this.data?.exp === true;
    },

    hasGeneExpScData() {
      return this.data?.expSc === true;
    },

    canSubmit() {
      for (const key in this.model) {
        if (this.model[key] === true) return true;
      }
    },

    showCaution() {
      return this.model.ssmsTranscriptsSlim
          || this.model.ssmsTranscriptsFull
          || this.model.cnvsTranscriptsSlim
          || this.model.cnvsTranscriptsFull
          || this.model.svsTranscriptsSlim
          || this.model.svsTranscriptsFull;
    },

    selectAll: {
      get() {
        return this.checkSelection();
      },
      set() {
        let all = this.checkSelection();

        if (all) {
          this.changeSelection(false);
        } else {
          this.changeSelection(true);
        }
      }
    }
  },

  watch: {
    "model.ssms"(value) {
      if (!value) {
        this.model.ssmsTranscriptsSlim = false;
        this.model.ssmsTranscriptsFull = false;
      }
    },

    "model.cnvs"(value) {
      if (!value) {
        this.model.cnvsTranscriptsSlim = false;
        this.model.cnvsTranscriptsFull = false;
      }
    },

    "model.svs"(value) {
      if (!value) {
        this.model.svsTranscriptsSlim = false;
        this.model.svsTranscriptsFull = false;
      }
    },

    "model.ssmsTranscriptsSlim"(value) {
      if (value) {
        this.model.ssms = true;
        this.model.ssmsTranscriptsFull = false;
      }
    },

    "model.ssmsTranscriptsFull"(value) {
      if (value) {
        this.model.ssms = true;
        this.model.ssmsTranscriptsSlim = false;
      }
    },

    "model.cnvsTranscriptsSlim"(value) {
      if (value) {
        this.model.cnvs = true;
        this.model.cnvsTranscriptsFull = false;
      }
    },

    "model.cnvsTranscriptsFull"(value) {
      if (value) {
        this.model.cnvs = true;
        this.model.cnvsTranscriptsSlim = false;
      }
    },

    "model.svsTranscriptsSlim"(value) {
      if (value) {
        this.model.svs = true;
        this.model.svsTranscriptsFull = false;
      }
    },

    "model.svsTranscriptsFull"(value) {
      if (value) {
        this.model.svs = true;
        this.model.svsTranscriptsSlim = false;
      }
    }
  },

  unmounted() {
    this.changeSelection(false);
  },

  methods: {
    checkSelection() {
      if (this.hasDonorsData && !this.model.donors) { return false; }
      if (this.hasClinicalData && !this.model.clinical) { return false; }
      if (this.hasTreatmentsData && !this.model.treatments) { return false; }
      if (this.hasMrisData && !this.model.mris) { return false; }
      if (this.hasCtsData && !this.model.cts) { return false; }
      if (this.hasSpecimensData && !this.model.specimens) { return false; }
      if (this.hasInterventionsData && !this.model.interventions) { return false; }
      if (this.hasDrugScreeningsData && !this.model.drugs) { return false; }
      if (this.hasSsmsData && !this.model.ssms) { return false; }
      if (this.hasSsmsData && !(this.model.ssmsTranscriptsSlim || this.model.ssmsTranscriptsFull)) { return false; }
      if (this.hasCnvsData && !this.model.cnvs) { return false; }
      if (this.hasCnvsData && !(this.model.cnvsTranscriptsSlim || this.model.cnvsTranscriptsFull)) { return false; }
      if (this.hasSvsData && !this.model.svs) { return false; }
      if (this.hasSvsData && !(this.model.svsTranscriptsSlim || this.model.svsTranscriptsFull)) { return false; }
      if (this.hasGeneExpData && !this.model.geneExp) { return false; }
      if (this.hasGeneExpScData && !this.model.geneExpSc) { return false; }
      return true;
    },

    changeSelection(value) {
      if (this.hasDonorsData) { this.model.donors = value; }
      if (this.hasClinicalData) { this.model.clinical = value; }
      if (this.hasTreatmentsData) { this.model.treatments = value; }
      if (this.hasMrisData) { this.model.mris = value; }
      if (this.hasCtsData) { this.model.cts = value; }
      if (this.hasSpecimensData) { this.model.specimens = value; }
      if (this.hasInterventionsData) { this.model.interventions = value; }
      if (this.hasDrugScreeningsData) { this.model.drugs = value; }
      if (this.hasSsmsData) { this.model.ssms = value; this.model.ssmsTranscriptsSlim = value; }
      if (this.hasCnvsData) { this.model.cnvs = value; this.model.cnvsTranscriptsSlim = value; }
      if (this.hasSvsData) { this.model.svs = value; this.model.svsTranscriptsSlim = value; }
      if (this.hasGeneExpData) { this.model.geneExp = value; }
      if (this.hasGeneExpScData) { this.model.geneExpSc = value; }
    },

    onSubmit() {
      this.$emit('submit', this.model);
    },

    onCancel() {
      this.$emit('cancel');
    }
  }
};
</script>