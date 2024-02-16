<template>
  <!-- Teleport button -->
  <teleport v-if="domains?.length && $q.screen.lt.md" to="#top-left-placeholder">
    <u-datasets-button-show @click="$refs.drawer.open()" />
  </teleport>

  <!-- Drawer -->
  <u-drawer
    ref="drawer"
    side="left"
    v-if="domain && cohort"
    v-model:shown="drawer.show"
    v-model:minimized="drawer.mini">
    <!-- Opened -->
    <template #default>
      <u-datasets
        :domains="domains" 
        v-model:domain="domain"
        v-model:cohort="cohort"
        @hide="$refs.drawer.minimize()"
      />
    </template>
    <!-- Minimized -->
    <template #mini>
      <u-datasets-mini
        :domains="domains"
        v-model:domain="domain"
        v-model:cohort="cohort"
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
      <u-analysis-button :cohorts="selectedCohorts" />
    </div>

    <div v-if="domains?.length" class="row">
      <div v-if="cohort" class="col">
        <!-- Cohort control buttons -->
        <div class="row">
          <div class="col">
            <q-separator />

            <u-controls-toolbar
              :domain="domain"
              :dataset="cohort"
              @deleted="onDeleted">
            </u-controls-toolbar>

            <q-separator />
          </div>
        </div>

        <!-- Cohort content -->
        <div class="row">
          <u-dataset v-if="cohort" :dataset="cohort" />
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

import FiltersCriteria from "@/_shared/components/filters/filters-criteria";
import DomainNames from "@/_settings/domain-names";
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
      cohort: null
    };
  },

  computed: {
    availableDomains() {
      DomainNames.WithCohorts.forEach(domain => this.$store.dispatch(`${domain}/loadCohorts`));
      return DomainNames.WithCohorts.filter(domain => this.$store.state[domain].cohorts?.length);
    },

    selectedCohorts() {
      return this.domains?.flatMap(domain => domain.cohorts.filter(cohort => cohort.selected));
    }
  },

  mounted() {
    this.domains = this.getDomainOptions(this.availableDomains);
    this.domain = this.domains.find(domain => domain.name == this.$route.params.domain) || this.domains[0] || null;
    this.cohort = this.domain?.cohorts[0] || null;
    // this.loadDomainData(this.domain);
  },

  watch: {
    domain(value) {
      this.cohort = value?.cohorts[0] || null;
      this.$router.replace({ params: { domain: value?.name || "" }});
      this.loadDomainData(value);
    },

    cohort(value) {
      this.loadCohortData(this.domain, value);
    },
  },

  methods: {
    onDeleted() {
      this.domains = this.getDomainOptions(this.availableDomains);
      this.domain = this.domains.find(domain => domain.name == this.domain.name) || this.domains[0] || null;
      this.cohort = this.domain?.cohorts[0];
    },

    getDomainOptions(domains) {
      return domains.map(domain => ({ 
        name: domain, 
        cohorts: this.getCohortOptions(domain)
      }));
    },

    getCohortOptions(domain) {
      return this.$store.state[domain]?.cohorts?.map(cohort => ({
        domain: domain,
        key: cohort.key,
        name: cohort.name,
        date: cohort.date,
        description: cohort.description,
        criteria: cohort.criteria, 
        data: null, 
        selected: false 
      }));
    },

    async loadDomainData(domain) {
      if (!domain) return;

      for (const cohort of domain.cohorts) {
        await this.loadCohortData(domain, cohort);
      }
    },

    async loadCohortData(domain, cohort) {
      if (!domain) return;
      if (!cohort) return;
      if (!!cohort.data || !!cohort.loading) return;

      try {
        const criteria = new FiltersCriteria(cohort.criteria).toSearchCriteria();
        cohort.loading = true;
        cohort.data = await api[domain.name].loadStats(criteria);
      } finally {
        cohort.loading = false;
      }
    }
  }
}
</script>