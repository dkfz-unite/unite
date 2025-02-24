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
          <div class="row text-subtitle1">Annotations</div>

          <!-- Custom cell annotations -->
          <!-- <div class="row">
            <div class="col">
              <q-file
                v-model="annotations.value"
                label="Cell level annotations (Optional; TSV; 25 MB max)"
                accept=".tsv"
                max-file-size="25000000"
                clearable
                dense square outlined>
                <template v-slot:prepend>
                  <q-icon name="attach_file" />
                </template>
              </q-file>
            </div>
          </div> -->

          <!-- Cell type predictions model -->
          <div class="row">
            <div class="col">
              <q-select
                v-model="options.model.value"
                label="Cell type predictions model (Optional)"
                class="row"
                dense options-dense square outlined clearable
                map-options emit-value
                :options="options.model.options"
                :loading="options.model.loading">
                <template v-slot:option="scope">
                  <q-item v-bind="scope.itemProps">
                    <q-item-section class="q-py-xs">
                      <q-item-label class="text-weight-medium">{{ scope.opt.label }}</q-item-label>
                      <q-item-label class="text-wrap" style="max-width: 300px;" caption>{{ scope.opt.details }}</q-item-label>
                      <q-item-label caption>
                        <span>
                          <span>
                            <span class="text-weight-bold">{{ scope.opt.types }} types</span>
                          </span>
                          <span class="text-weight-bold q-ml-lg">{{ scope.opt.date }}</span>
                        </span>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
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

          <!-- Filters -->
           <div v-if="options.pp.value == 'default'" class="row">
            <div class="col q-mr-xs">
              <q-input
                v-model="options.genes.value"
                label="Min. expressed genes"
                type="number" :min="options.genes.min"
                dense square outlined
              />
            </div>
            <div class="col q-ml-xs">
              <q-input
                v-model="options.cells.value"
                label="Min. expressed cells"
                type="number" :min="options.cells.min"
                dense square outlined
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
      annotations: {
        value: null
      },
      options: {
        qc: {
          value: false
        },
        annotate: {
          value: false
        },
        model: {
          value: null, //"Immune_All_Low.pkl",
          options: [],
          loading: false
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
        genes: {
          value: 5,
          min: 5
        },
        cells: {
          value: 25,
          min: 25
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

  mounted() {
    this.loadModels();
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

      const annotations = await this.annotations.value?.text();

      const options = {
        model: this.options.model.value,
        qc: this.options.qc.value,
        sparse: this.options.sparse.value,
        pp: this.options.pp.value,
        genes: this.options.genes.value,
        cells: this.options.cells.value,
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
          annotations: annotations,
          options: options
        }
      };

      const id = await this.$store.dispatch("analysis/runSCellAnalysis", data);
      await this.$router.push({ name: "analysis", params: { id: id } });
    },

    async onReset() {
      this.annotations.value = null;
      this.options.model.value = null;
      this.options.qc.value = false;
      this.options.sparse.value = true;
      this.options.pp.value = "default";
      this.options.genes.value = 5;
      this.options.cells.value = 25;
      this.options.pca.value = true;
      this.options.neighbors.value = true;
      this.options.clustering.value = "louvain";
      this.options.embedding.value = ["umap"];
    },

    async onClose() {
      this.name.value = null;
      this.description.value = null;
      this.annotations.value = null;
      this.options.model.value = null;
      this.options.qc.value = false;
      this.options.sparse.value = true;
      this.options.pp.value = "default";
      this.options.genes.value = 5;
      this.options.cells.value = 25;
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
    },

    async loadModels() {
      try {
        this.options.model.loading = true;
        const response = await this.$store.dispatch("analysis/getSCellAnalysisModels");
        this.options.model.options = response?.models.map(model => ({
          value: model.filename,
          label: this.getModelName(model.filename),
          details: this.getModelDetails(model.details),
          types: model.No_celltypes,
          date: (new Date(model.date)).toLocaleDateString()
        }));
      } finally {
        this.options.model.loading = false;
      }
    },

    getModelName(value) {
      return value.replaceAll("_", " ").replace(".pkl", "");
    },

    getModelDetails(value) {
      return value.charAt(0).toUpperCase() + value.slice(1);
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
