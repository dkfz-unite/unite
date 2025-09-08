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
            <div class="row" v-if="hasDonorData">
              <q-checkbox v-model="model.donor" label="Donors" :disable="loading" dense />
            </div>
            <div class="row q-pl-md" v-if="hasTreatmentData">
              <q-checkbox v-model="model.treatment" label="Treatments" :disable="loading" dense />
            </div>
            <div class="row" v-if="hasImageData">
              <q-checkbox v-model="model.image" label="Images" :disable="loading" dense />
            </div>
            <div class="row" v-if="hasSpecimenData">
              <q-checkbox v-model="model.specimen" label="Specimens" :disable="loading" dense />
            </div>
            <div class="row q-pl-md" v-if="hasInterventionData">
              <q-checkbox v-model="model.intervention" label="Interventions" :disable="loading" dense />
            </div>
            <div class="row q-pl-md" v-if="hasDrugScreeningData">
              <q-checkbox v-model="model.drug" label="Drug screenings" :disable="loading" dense />
            </div>
            <div class="row" v-if="hasSmData">
              <q-checkbox v-model="model.sm" label="Simple mutations (SM)" :disable="loading" dense />
            </div>
            <div class="row q-pl-md q-gutter-x-sm" v-if="hasSmData">
              <div>Consequences:</div>
              <q-checkbox v-model="model.smTranscript" label="Transcript" :disable="loading" dense />
            </div>
            <div class="row" v-if="hasCnvData">
              <q-checkbox v-model="model.cnv" label="Copy number variants (CNV)" :disable="loading" dense />
            </div>
            <div class="row q-pl-md q-gutter-x-sm" v-if="hasCnvData">
              <div>Consequences:</div>
              <q-checkbox v-model="model.cnvTranscript" label="Transcript" :disable="loading" dense />
            </div>
            <div class="row" v-if="hasSvData">
              <q-checkbox v-model="model.sv" label="Structural variants (SV)" :disable="loading" dense />
            </div>
            <div class="row q-pl-md q-gutter-x-sm" v-if="hasSvData">
              <div>Consequences:</div>
              <q-checkbox v-model="model.svTranscript" label="Transcript" :disable="loading" dense />
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
                <div class="row" style="width: 350px;">Note, including variant consequences may significantly increase file size and make it hard to read.</div>
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
        donor: false,
        treatment: false,
        image: false,
        specimen: false,
        intervention: false,
        drug: false,
        sm: false,
        smTranscript: false,
        cnv: false,
        cnvTranscript: false,
        sv: false,
        svTranscript: false,
        geneExp: false
      }
    };
  },

  computed: {
    hasDonorData() {
      return true;
    },

    hasTreatmentData() {
      return this.data?.treatments === true;
    },

    hasImageData() {
      return this.data?.mrs === true
          || this.data?.cts === true;
    },

    hasSpecimenData() {
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

    hasInterventionData() {
      const specimensDomain = specimenDomains.includes(this.domain);

      if (specimensDomain) {
        return this.data?.interventions === true;
      } else {
        return this.data?.linesInterventions === true
            || this.data?.organoidsInterventions === true
            || this.data?.xenograftsInterventions === true;
      }
    },

    hasDrugScreeningData() {
      const specimensDomain = specimenDomains.includes(this.domain);

      if (specimensDomain) {
        return this.data?.drugs === true;
      } else {
        return this.data?.linesDrugs === true
            || this.data?.organoidsDrugs === true
            || this.data?.xenograftsDrugs === true;
      }
    },

    hasSmData() {
      return this.data?.sms === true;
    },

    hasCnvData() {
      return this.data?.cnvs === true;
    },

    hasSvData() {
      return this.data?.svs === true;
    },

    // hasMethData() {
    //   return this.data?.meth === true;
    // },

    hasGeneExpData() {
      return this.data?.exp === true;
    },

    // hasGeneExpScData() {
    //   return this.data?.expSc === true;
    // },

    canSubmit() {
      for (const key in this.model) {
        if (this.model[key] === true) return true;
      }
    },

    showCaution() {
      return this.model.smTranscript
          || this.model.cnvTranscript
          || this.model.svTranscript;
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
    "model.sm"(value) {
      if (!value) {
        this.model.smTranscript = false;
      }
    },

    "model.cnv"(value) {
      if (!value) {
        this.model.cnvTranscript = false;
      }
    },

    "model.sv"(value) {
      if (!value) {
        this.model.svTranscript = false;
      }
    },

    "model.smTranscript"(value) {
      if (value) {
        this.model.sm = true;
      }
    },

    "model.cnvTranscript"(value) {
      if (value) {
        this.model.cnv = true;
      }
    },

    "model.svTranscript"(value) {
      if (value) {
        this.model.sv = true;
      }
    }
  },

  unmounted() {
    this.changeSelection(false);
  },

  methods: {
    checkSelection() {
      if (this.hasDonorData && !this.model.donor) { return false; }
      if (this.hasTreatmentData && !this.model.treatment) { return false; }
      if (this.hasImageData && !this.model.image) { return false; }
      if (this.hasSpecimenData && !this.model.specimen) { return false; }
      if (this.hasInterventionData && !this.model.intervention) { return false; }
      if (this.hasDrugScreeningData && !this.model.drug) { return false; }
      if (this.hasSmData && !this.model.sm) { return false; }
      if (this.hasSmData && !this.model.smTranscript) { return false; }
      if (this.hasCnvData && !this.model.cnv) { return false; }
      if (this.hasCnvData && !this.model.cnvTranscript) { return false; }
      if (this.hasSvData && !this.model.sv) { return false; }
      if (this.hasSvData && !this.model.svTranscript) { return false; }
      // if (this.hasMethData && !this.model.meth) { return false; }
      if (this.hasGeneExpData && !this.model.geneExp) { return false; }
      // if (this.hasGeneExpScData && !this.model.geneExpSc) { return false; }
      return true;
    },

    changeSelection(value) {
      if (this.hasDonorData) { this.model.donor = value; }
      if (this.hasTreatmentData) { this.model.treatment = value; }
      if (this.hasImageData) { this.model.image = value; }
      if (this.hasSpecimenData) { this.model.specimen = value; }
      if (this.hasInterventionData) { this.model.intervention = value; }
      if (this.hasDrugScreeningData) { this.model.drug = value; }
      if (this.hasSmData) { this.model.sm = value; this.model.smTranscript = value; }
      if (this.hasCnvData) { this.model.cnv = value; this.model.cnvTranscript = value; }
      if (this.hasSvData) { this.model.sv = value; this.model.svTranscript = value; }
      // if (this.hasMethData) { this.model.meth = value; }
      if (this.hasGeneExpData) { this.model.geneExp = value; }
      // if (this.hasGeneExpScData) { this.model.geneExpSc = value; }
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