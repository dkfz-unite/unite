<template>
  <q-dialog
    v-model="dialog" 
    @keyup.esc="onClose"
    @keyup.enter="onSubmit"
    persistent>

    <q-card style="min-width: 350px;">
      <q-card-section>
        <div class="text-h6">Differential Protein Expression</div>
      </q-card-section>

      <q-card-section>
        <div class="col q-gutter-sm">
          <div class="row">
            <div class="col">
              <q-input
                label="Name (Optional)"
                placeholder="Enter name"
                type="text"
                v-model="name.value"
                autofocus
                clearable outlined square dense
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <q-input
                label="Description (Optional)"
                placeholder="Enter description"
                type="text"
                lines="3"
                v-model="description.value"
                clearable outlined square dense
              />
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <div class="col">
          <div class="row items-center q-gutter-xs">
            <q-icon :name="Settings[datasetsOrdered[0].domain].icon" size="sm"/>
            <div>{{ datasetsOrdered[0].name }}</div>
          </div>
          <div class="row text-hint text-grey-7">vs</div>
          <div class="row items-center q-gutter-xs">
            <q-icon :name="Settings[datasetsOrdered[1].domain].icon" size="sm"/>
            <div>{{ datasetsOrdered[1].name }}</div>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <div class="col q-gutter-sm">
          <div class="row text-subtitle1">Options</div>

          <!-- Normalization method -->
          <div class="row">
            <div class="col">
              <q-select
                v-model="options.normalizationMethod.value"
                :options="options.normalizationMethod.options"
                label="Normalization method" map-options
                dense options-dense square outlined
              />
            </div>
          </div>

          <!-- Normalization log offset -->
          <div class="row">
            <div class="col">
              <q-input
                v-model="options.normalizationLogOffset.value"
                label="Normalization log offset"
                type="number" :min="options.normalizationLogOffset.min" :max="options.normalizationLogOffset.max" step="0.1"
                dense square outlined
              />
            </div>
          </div>

          <!-- Imputation method -->
          <div class="row">
            <div class="col">
              <q-select
                v-model="options.imputationMethod.value"
                :options="options.imputationMethod.options"
                label="Imputation method" map-options
                dense options-dense square outlined
              />
            </div>
          </div>

          <!-- Stratify imputation by batch -->
          <div class="row">
            <div class="col">
              <q-checkbox
                v-model="options.stratifyImputationByBatch.value"
                label="Stratify imputation by batch"
                dense square outlined
              />
            </div>
          </div>

          <!-- Batch correction method -->
          <!-- Always None(null) for differential expression -->
          <!-- <div class="row">
            <div class="col">
              <q-select
                v-model="options.batchCorrectionMethod.value"
                :options="options.batchCorrectionMethod.options"
                label="Batch correction method" map-options
                dense options-dense square outlined
              />
            </div>
          </div> -->

          <!-- Minimum non-missing fraction -->
          <div class="row">
            <div class="col">
              <q-input
                v-model="options.minNonMissingFraction.value"
                label="Minimum non-missing values fraction"
                type="number" :min="options.minNonMissingFraction.min" :max="options.minNonMissingFraction.max" step="0.1"
                dense square outlined
              />
            </div>
          </div>

          <!-- Require non-missing fraction in one class -->
          <div class="row">
            <div class="col">
              <q-checkbox
                v-model="options.requireMinFractionOneClass.value"
                label="Require non-missing fraction in one class"
                dense square outlined
              />
            </div>
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions  align="right" class="text-primary">
        <q-btn
          label="Reset"
          @click="onReset"
          dense flat no-caps
        />
        <q-btn
          label="Cancel"
          @click="onClose"
          dense flat no-caps 
          v-close-popup 
        />
        <q-btn 
          label="Start"
          :disable="!canSubmit"
          @click="onSubmit" 
          dense flat no-caps 
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import Settings from "@/_settings/settings";
import FiltersCriteria from "@/_shared/components/filters/filters-criteria";

export default {
  props: {
    datasets: {
      type: [Array, null],
      default: () => [],
    },
  },

  setup() {
    return {
      Settings
    }
  },

  data() {
    return {
      dialog: false,
      name: {
        value: null
      },
      description: {
        value: null
      },
      options: {
        normalizationMethod: {
          value: "median",
          default: "median",
          options: [
            { label: "Median", value: "median" },
            { label: "Quantile", value: "quantile" }
          ]
        },
        normalizationLogOffset: {
          value: 0.1,
          default: 0.1,
          min: 0,
          max: 1
        },
        imputationMethod: {
          value: "mindet",
          default: "mindet",
          options: [
            { label: "MinDet", value: "mindet" },
            { label: "MinProb", value: "minprob" }
          ]
        },
        stratifyImputationByBatch: {
          value: false,
          default: false
        },
        batchCorrectionMethod: {
          value: null,
          default: null,
          options: [
            { label: "ComBat", value: "combat" },
            { label: "Limma", value: "limma" },
            { label: "None", value: null }
          ]
        },
        minNonMissingFraction: {
          value: 0.7,
          default: 0.7,
          min: 0,
          max: 1
        },
        requireMinFractionOneClass: {
          value: true,
          default: true
        }
      }
    };
  },

  computed: {
    canSubmit() {
      return true;
    },

    datasetsOrdered() {
      return this.datasets.sort((a, b) => a.order - b.order);
    }
  },

  methods: {
    show() {
      this.dialog = true;
    },

    async onSubmit() {
      const datasets = this.datasetsOrdered.map(dataset => ({
        id: dataset.id,
        name: dataset.name,
        order: dataset.order, 
        domain: dataset.domain,
        criteria: new FiltersCriteria(dataset.criteria).toSearchCriteria() 
      }));

      const options = {
        "normalization_method": this.options.normalizationMethod.value,
        "normalization_log_offset": this.options.normalizationLogOffset.value,
        "imputation_method": this.options.imputationMethod.value,
        "stratify_imputation_by_batch": this.options.stratifyImputationByBatch.value,
        "batch_correction_method": this.options.batchCorrectionMethod.value,
        "min_non_missing_fraction": this.options.minNonMissingFraction.value,
        "require_min_fraction_one_class": this.options.requireMinFractionOneClass.value
      };

      const data = {
        type: "dep",
        name: this.name.value,
        description: this.description.value,
        status: null,
        date: new Date(),
        data: 
        {
          datasets: datasets,
          options: options
        }
      };

      const id = await this.$store.dispatch("analysis/runDepAnalysis", data);
      await this.$router.push({ name: "analysis", params: { id: id } });
    },

    async onReset() {
      this.options.normalizationMethod.value = this.options.normalizationMethod.default;
      this.options.normalizationLogOffset.value = this.options.normalizationLogOffset.default;
      this.options.imputationMethod.value = this.options.imputationMethod.default;
      this.options.stratifyImputationByBatch.value = this.options.stratifyImputationByBatch.default;
      this.options.batchCorrectionMethod.value = this.options.batchCorrectionMethod.default;
      this.options.minNonMissingFraction.value = this.options.minNonMissingFraction.default;
      this.options.requireMinFractionOneClass.value = this.options.requireMinFractionOneClass.default;
    },

    async onClose() {
      await this.onReset();

      this.name.value = null;
      this.description.value = null;
      this.dialog = false;
    }
  }
}
</script>