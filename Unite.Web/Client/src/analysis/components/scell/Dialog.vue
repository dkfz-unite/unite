<template>
  <q-dialog
    v-model="dialog" 
    @keyup.esc="onClose"
    @keyup.enter="onSubmit"
    persistent>

    <q-card style="min-width: 420px;">
      <q-card-section>
        <div class="text-h6">Single Cell RNA Analysis</div>
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
        <div class="col q-gutter-sm">
          <div class="row text-subtitle1">Options</div>

          <!-- QC -->
          <!-- <div class="row">
            <div class="col q-pa-sm u-check-box">
              <q-checkbox v-model="options.qc.value" class="row" dense>Calculate quality control metrix</q-checkbox>
            </div>
          </div> -->

          <!-- Sparse -->
          <div class="row">
            <div class="col q-pa-sm u-check-box">
              <q-checkbox v-model="options.sparse.value" class="row" dense>Make the data sparse</q-checkbox>
              <div v-if="!options.sparse.value" class="row text-hint text-grey-7">
                <span>
                  <span>It's <span class="text-orange-7">highly recommended</span> to make the data sparse.</span><br/>
                  <span>It almost doesn't affect the result,</span><br/>
                  <span>but makes the data significantly smaller.</span>
                </span>
              </div>
            </div>
          </div>

          <!-- PP -->
          <div class="row">
            <div class="col">
              <q-select
                v-model="options.pp.value"
                label="Preprocessing method"
                class="row"
                dense options-dense square outlined
                map-options emit-value
                :options="options.pp.options"
              />
            </div>
          </div>

          <!-- PCA -->
          <div class="row">
            <div class="col q-pa-sm u-check-box">
              <q-checkbox v-model="options.pca.value" class="row" dense>Perform principal component analysis (PCA)</q-checkbox>
              <div v-if="!options.pca.value" class="row text-hint text-grey-7">
                <span>
                  <span>It's <span class="text-orange-7">highly recommended</span> to perform PCA before clustering.</span><br/>
                </span>
              </div>
            </div>
          </div>

          <!-- Neighbors -->
          <div class="row">
            <div class="col q-pa-sm u-check-box">
              <q-checkbox v-model="options.neighbors.value" class="row" dense>Calculate neighbors</q-checkbox>
              <div v-if="!options.neighbors.value" class="row text-hint text-grey-7">
                <span>
                  <span>It's <span class="text-orange-7">highly recommended</span> to calculate neighbors</span><br/>
                  <span>before calculating different embeddings.</span>
                </span>
              </div>
            </div>
          </div>

          <!-- Clustering -->
          <div class="row">
            <div class="col">
              <q-select
                v-model="options.clustering.value"
                label="Clustering method"
                class="row"
                dense options-dense square outlined
                map-options emit-value
                :options="options.clustering.options"
              />
            </div>
          </div>
        
          <!-- Embedding -->
          <div class="row">
            <div class="col">
              <q-select
                v-model="options.embedding.value"
                label="Embeddings (multiple allowed)"
                class="row"
                dense options-dense square outlined
                map-options emit-value multiple
                :options="options.embedding.options"
                @update:modelValue="onUpdateEmbeddings"
              />
            </div>
          </div>
      </div>
      </q-card-section>

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
        qc: {
          value: false
        },
        sparse: {
          value: true
        },
        pp: {
          value: "default",
          options: [
            { label: "Default", value: "default" },
            { label: "Seurat", value: "seurat" },
            { label: "Zheng17", value: "zheng17" }
          ]
        },
        pca: {
          value: true
        },
        neighbors: {
          value: true
        },
        clustering: {
          value: "louvain",
          options: [
            { label: "Louvain", value: "louvain" },
            { label: "Leiden", value: "leiden" }
          ]
        },
        embedding: {
          value: ["umap"],
          options: [
            { label: "UMAP", value: "umap" },
            { label: "t-SNE", value: "tsne" }
          ]
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
        key: dataset.key,
        name: dataset.name,
        order: dataset.order, 
        domain: dataset.domain,
        criteria: new FiltersCriteria(dataset.criteria).toSearchCriteria() 
      }));

      const options = {
        qc: this.options.qc.value,
        sparse: this.options.sparse.value,
        pp: this.options.pp.value,
        pca: this.options.pca.value,
        neighbors: this.options.neighbors.value,
        clustering: this.options.clustering.value,
        embedding: this.options.embedding.value
      };

      const data = {
        type: "scell",
        name: this.name.value,
        description: this.description.value,
        status: null,
        date: new Date(),
        data: 
        {
          datasets: datasets,
          options: { progression: this.progression.value }
        }
      };

      await this.$store.dispatch("analysis/runSCellAnalysis", data);
      await this.$router.push({ name: "analysis" });
    },

    async onReset() {
      this.options.qc.value = false;
      this.options.sparse.value = true;
      this.options.pp.value = "default";
      this.options.pca.value = true;
      this.options.neighbors.value = true;
      this.options.clustering.value = "louvain";
      this.options.embedding.value = ["umap"];
    },

    async onClose() {
      this.name.value = null;
      this.description.value = null;
      this.options.qc.value = false;
      this.options.sparse.value = true;
      this.options.pp.value = "default";
      this.options.pca.value = true;
      this.options.neighbors.value = true;
      this.options.clustering.value = "louvain";
      this.options.embedding.value = ["umap"];
      this.dialog = false;
    },

    async onUpdateEmbeddings(value) {
      if (!value?.length) {
        this.options.embedding.value = ["umap"];
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/quasar.variables.scss';

.u-check-box {
  border: 1px solid $grey-5;
}
</style>
