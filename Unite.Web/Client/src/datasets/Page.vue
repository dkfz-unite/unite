<template>
  <!-- Teleport button -->
  <teleport v-if="domains?.length && $q.screen.lt.md" to="#top-left-placeholder">
    <u-datasets-button-show @click="$refs.drawer.open()" />
  </teleport>

  <!-- Drawer -->
  <u-drawer
    ref="drawer"
    side="left"
    v-if="domain && dataset"
    v-model:shown="drawer.show"
    v-model:minimized="drawer.mini">
    <!-- Opened -->
    <template #default>
      <u-datasets
        :domains="domains" 
        v-model:domain="domain"
        v-model:dataset="dataset"
        @hide="$refs.drawer.minimize()"
      />
    </template>
    <!-- Minimized -->
    <template #mini>
      <u-datasets-mini
        :domains="domains"
        v-model:domain="domain"
        v-model:dataset="dataset"
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

    <div v-if="domains?.length" class="row">
      <u-analysis-button :datasets="selectedDatasets" />
    </div>

    <div v-if="domains?.length" class="row">
      <div v-if="dataset" class="col">
        <!-- Cohort control buttons -->
        <div class="row">
          <div class="col">
            <q-separator />

            <u-controls-toolbar
              :domain="domain"
              :dataset="dataset"
              @deleted="onDeleted">
            </u-controls-toolbar>

            <q-separator />
          </div>
        </div>

        <!-- Cohort content -->
        <div class="row">
          <u-dataset v-if="dataset" :dataset="dataset" />
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

import Settings from "@/_settings/settings";
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
      domains: null,
      domain: null,
      dataset: null
    };
  },

  computed: {
    owner() {
      return this.$store.state.identity?.account?.email;
    },

    availableDomains() {
      const domainNames = Settings.searchable.map(domain => domain.domain);
      domainNames.forEach(domain => this.$store.dispatch(`${domain}/loadDatasets`, { owner: this.owner, domain: domain }));
      return domainNames.filter(domain => this.$store.state[domain].datasets?.length);
    },

    selectedDatasets() {
      return this.domains?.flatMap(domain => domain.datasets.filter(dataset => dataset.selected));
    }
  },

  mounted() {
    this.domains = this.getDomainOptions(this.availableDomains);
    this.domain = this.domains.find(domain => domain.name == this.$route.params.domain) || this.domains[0] || null;
    this.dataset = this.domain?.datasets[0] || null;
    // this.loadDomainData(this.domain);
  },

  watch: {
    domain(value) {
      this.dataset = value?.datasets[0] || null;
      this.$router.replace({ params: { domain: value?.name || "" }});
      this.loadDomainData(value);
    },

    cohort(value) {
      this.loadDatasetData(this.domain, value);
    },
  },

  methods: {
    onDeleted() {
      this.domains = this.getDomainOptions(this.availableDomains);
      this.domain = this.domains.find(domain => domain.name == this.domain.name) || this.domains[0] || null;
      this.dataset = this.domain?.datasets[0];
    },

    getDomainOptions(domains) {
      return domains.map(domain => ({ 
        name: domain, 
        datasets: this.getDatasetOptions(domain)
      }));
    },

    getDatasetOptions(domain) {
      return this.$store.state[domain]?.datasets?.map(dataset => ({
        domain: domain,
        key: dataset.key,
        name: dataset.name,
        date: dataset.date,
        description: dataset.description,
        criteria: dataset.criteria, 
        data: null, 
        selected: false 
      }));
    },

    async loadDomainData(domain) {
      if (!domain) return;

      for (const dataset of domain.datasets) {
        await this.loadDatasetData(domain, dataset);
      }
    },

    async loadDatasetData(domain, dataset) {
      if (!domain) return;
      if (!dataset) return;
      if (!!dataset.data || !!dataset.loading) return;

      try {
        const criteria = new FiltersCriteria(dataset.criteria).toSearchCriteria();
        dataset.loading = true;
        dataset.data = await api[domain.name].loadStats(criteria);
      } finally {
        dataset.loading = false;
      }
    }
  }
}
</script>