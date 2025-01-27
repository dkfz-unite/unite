<template>
  <!-- Teleport button -->
  <teleport v-if="dataset && $q.screen.lt.md" to="#top-left-placeholder">
    <u-datasets-button-show @click="$refs.drawer.open()" />
  </teleport>

  <!-- Drawer -->
   <!-- v-show="dataset" -->
  <u-drawer
    v-if="datasets?.length"
    ref="drawer"
    side="left"
    v-model:shown="drawer.show"
    v-model:minimized="drawer.mini">
    <!-- Opened -->
    <template #default>
      <u-datasets
        ref="datasets"
        v-model:domain="tab"
        v-model:dataset="item"
        :datasets="datasets"
        @hide="$refs.drawer.minimize()"
      />
    </template>
    <!-- Minimized -->
    <template #mini>
      <u-datasets-mini
        v-model:domain="tab"
        v-model:dataset="item"
        :datasets="datasets"
      />
    </template>
  </u-drawer>

  <!-- Content -->
  <div class="col q-gutter-y-sm">
    <!-- <div class="row">
      <q-breadcrumbs gutter="xs" class="text-subtitle1">
        <q-breadcrumbs-el icon="home" :to="{ name: 'home'}" />
        <q-breadcrumbs-el label="Cohorts" />
      </q-breadcrumbs>
    </div> -->

    <div class="row">
      <u-analysis-button v-if="dataset" :datasets="selectedDatasets" />
    </div>

    <div v-if="dataset" class="row">
      <div class="col">
        <!-- Cohort control buttons -->
        <div class="row">
          <div class="col">
            <q-separator />

            <u-controls-toolbar
              :dataset="dataset"
              @deleted="onDeleted">
            </u-controls-toolbar>

            <q-separator />
          </div>
        </div>

        <!-- Cohort content -->
        <div class="row">
          <u-dataset :dataset="dataset" />
        </div>
      </div>
    </div>

    <!-- No data section -->
    <div v-else class="row">
      <div class="col">
        <div class="absolute-center">
          No datasets have been saved
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UDrawer from "@/_shared/components/base/Drawer.vue";
import UDatasetsButtonShow from "./components/datasets/buttons/ButtonShow.vue";
import UDatasets from "./components/datasets/Datasets.vue";
import UDatasetsMini from "./components/datasets/DatasetsMini.vue";
import UAnalysisButton from "./components/analysis/AnalysisButton.vue";
import UDataset from "./components/dataset/Dataset.vue";
import UControlsToolbar from "./components/dataset/controls/Toolbar.vue";
import { mapGetters } from "vuex";

import Settings from "./settings";
import FiltersCriteria from "@/_shared/components/filters/filters-criteria";
import api from "./api";

export default {
  components: {
    UDrawer,
    UDatasetsButtonShow,
    UAnalysisButton,
    UControlsToolbar,
    UDatasets,
    UDatasetsMini,
    UDataset
  },

  data() {
    return {
      drawer: this.$store.state.leftDrawer,
      tab: this.$route.params.domain || null,
      item: this.$route.params.id || null,
      dataset: null,
    };
  },

  computed: {
    ...mapGetters("datasets", ["datasets"]),

    selectedDatasets() {
      return this.datasets.filter(dataset => dataset.selected);
    }
  },

  watch: {
    tab(value) {
    },

    item(value) {
      this.updateDataset();
    },
  },

  mounted() {
    this.updateDataset();
  },

  unmounted() {
    this.datasets.forEach(dataset => {
      dataset.selected = false;
      dataset.order = null;
    });
  },

  methods: {
    onDeleted() {
      this.$refs.datasets?.update();
      this.updateDataset();
    },

    async updateDataset() {
      this.dataset = this.datasets.find(dataset => dataset.id == this.item);

      if (this.dataset) {
        this.$router.replace({ params: { domain: this.tab, id: this.item }});
        if (!this.dataset.data) {
          
          const criteria = new FiltersCriteria(this.dataset.criteria).toSearchCriteria();
          this.dataset.data = await api[this.dataset.domain].loadStats(criteria);
        }
      } else {
        this.$router.push({ name: Settings.domain });
      }
    }
  }
}
</script>