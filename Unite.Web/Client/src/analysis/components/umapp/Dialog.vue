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

      <!-- <q-card-section>
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
      </q-card-section> -->

      <q-card-section class="row q-col-gutter-lg q-pr-none">
        <div class="col col-6 q-gutter-sm">
          <div class="row text-subtitle1">Preprocessing  Options</div>

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
          <div class="row">
            <div class="col">
              <q-select
                v-model="options.batchCorrectionMethod.value"
                :options="options.batchCorrectionMethod.options"
                label="Batch correction method" map-options
                dense options-dense square outlined
              />
            </div>
          </div>

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
                @vue:updated="onFractionClassChange"
                dense square outlined
              />
            </div>
          </div>

          <!-- Class property -->
          <div class="row">
            <div class="col">
              <q-select
                v-model="options.classProperty.value"
                :options="options.classProperty.options"
                :disable="options.requireMinFractionOneClass.value === false"
                label="Class property"
                dense options-dense square outlined
              />
            </div>
          </div>
        </div>

        <div class="col col-6 q-gutter-sm">
          <div class="row text-subtitle1">UMAP Options</div>

          <!-- Neighbors number -->
          <div class="row">
            <div class="col">
              <q-input
                v-model="options.umapNeighborsNumber.value"
                label="Neighbors number"
                type="number" :min="options.umapNeighborsNumber.min" step="1"
                dense square outlined
              />
            </div>
          </div>

          <!-- Metric -->
          <div class="row">
            <div class="col">
              <q-select
                v-model="options.umapMetric.value"
                :options="options.umapMetric.options"
                label="Metric" map-options
                dense options-dense square outlined
              />
            </div>
          </div>

          <!-- Random state -->
          <div class="row">
            <div class="col">
              <q-input
                v-model="options.umapRandomState.value"
                label="Random state (Optional)"
                type="number" :min="options.umapRandomState.min" step="1"
                dense square outlined
              />
            </div>
          </div>

          <!-- Minimal distance -->
          <div class="row">
            <div class="col">
              <q-input
                v-model="options.umapMinimalDistance.value"
                label="Minimal distance"
                type="number" :min="options.umapMinimalDistance.min" step="0.1"
                dense square outlined
              />
            </div>
          </div>

          <!-- Principal components number -->
          <div class="row">
            <div class="col">
              <q-input
                v-model="options.umapPrincipalComponentsNumber.value"
                label="Principal components number"
                type="number" :min="options.umapPrincipalComponentsNumber.min" step="1"
                dense square outlined
              />
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <div class="col q-gutter-sm">
          <div class="row text-subtitle1">Feature Selection Options</div>

          <!-- Method -->
          <div class="row">
            <div class="col">
              <q-select
                v-model="options.featureSelectionMethod.value"
                :options="options.featureSelectionMethod.options"
                label="Method" map-options
                dense options-dense square outlined
              />
            </div>
          </div>

          <!-- Features number -->
          <div class="row">
            <div class="col">
              <q-input
                v-model="options.featureSelectionFeaturesNumber.value"
                label="Features number"
                type="number" :min="options.featureSelectionFeaturesNumber.min" step="1"
                dense square outlined
              />
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        
      </q-card-section>

      <q-separator />

      <q-card-actions align="right" class="text-primary">
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
          value: 0.5,
          default: 0.5,
          min: 0,
          max: 1
        },
        requireMinFractionOneClass: {
          value: false,
          default: false
        },
        classProperty: {
          value: null,
          default: null,
          options: []
        },

        featureSelectionMethod: {
          value: "variance",
          default: "variance",
          options: [
            { label: "Variance", value: "variance" },
            { label: "None", value: null }
          ]
        },
        featureSelectionFeaturesNumber: {
          value: 1000,
          default: 1000,
          min: 1
        },

        umapNeighborsNumber: {
          value: 15,
          default: 15,
          min: 2
        },
        umapMetric: {
          value: "euclidean",
          default: "euclidean",
          options: [
            { label: "Euclidean", value: "euclidean" },
            { label: "Manhattan", value: "manhattan" }
          ]
        },
        umapRandomState: {
          value: null,
          default: null,
          min: 0
        },
        umapMinimalDistance: {
          value: 0.1,
          default: 0.1,
          min: 0.1
        },
        umapPrincipalComponentsNumber: {
          value: 50,
          default: 50,
          min: 1
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

  async mounted() {
    this.options.classProperty.options = await this.$store.dispatch("analysis/getMetadataOptions");
  },

  methods: {
    show() {
      this.dialog = true;
    },

    onFractionClassChange() {
      if (!this.options.requireMinFractionOneClass.value) {
        this.options.classProperty.value = this.options.classProperty.default;
      } else {
        this.options.classProperty.value = this.options.classProperty.options[0] || null;
      }
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
        "require_min_fraction_one_class": this.options.requireMinFractionOneClass.value,
        "class_property": this.options.classProperty.value,
        "feature_selection_method": this.options.featureSelectionMethod.value,
        "feature_selection_n_features": this.options.featureSelectionFeaturesNumber.value,
        "umap_n_neighbors": this.options.umapNeighborsNumber.value,
        "umap_metric": this.options.umapMetric.value,
        "umap_random_state": this.options.umapRandomState.value,
        "umap_min_dist": this.options.umapMinimalDistance.value,
        "umap_n_principal_components": this.options.umapPrincipalComponentsNumber.value
      };

      const data = {
        type: "umapp",
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

      const id = await this.$store.dispatch("analysis/runAnalysis", data);
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
      this.options.classProperty.value = this.options.classProperty.default;
      this.options.featureSelectionMethod.value = this.options.featureSelectionMethod.default;
      this.options.featureSelectionFeaturesNumber.value = this.options.featureSelectionFeaturesNumber.default;
      this.options.umapNeighborsNumber.value = this.options.umapNeighborsNumber.default;
      this.options.umapMetric.value = this.options.umapMetric.default;
      this.options.umapRandomState.value = this.options.umapRandomState.default;
      this.options.umapMinimalDistance.value = this.options.umapMinimalDistance.default;
      this.options.umapPrincipalComponentsNumber.value = this.options.umapPrincipalComponentsNumber.default;
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