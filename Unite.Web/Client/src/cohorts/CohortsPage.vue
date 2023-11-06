<template>
  <!-- Cohorts button -->
  <teleport v-if="domains?.length && $q.screen.lt.md" to="#top-left-placeholder">
    <u-cohorts-button-show @click="$refs.drawer.open()" />
  </teleport>

  <!-- Cohorts drawer -->
  <u-drawer
    ref="drawer"
    side="left"
    v-if="domain && cohort"
    v-model:shown="drawer.show"
    v-model:minimized="drawer.mini">
    <template #default>
      <u-cohorts
        :domains="domains" 
        v-model:domain="domain"
        v-model:cohort="cohort"
        @hide="$refs.drawer.minimize()"
      />
    </template>

    <template #mini>
      <u-cohorts-mini
        :domains="domains"
        v-model:domain="domain"
        v-model:cohort="cohort"
      />
    </template>
  </u-drawer>

  <!-- Page content -->
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
              :cohort="cohort"
              @deleted="onDeleted">
            </u-controls-toolbar>

            <q-separator />
          </div>
        </div>

        <!-- Cohort content -->
        <div class="row">
          <u-cohort v-if="cohort" :cohort="cohort" />
        </div>
      </div>
    </div>

    <!-- No data section -->
    <div v-else class="row">
      <div class="col">
        <div class="absolute-center">
          No cohorts have been saved
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UDrawer from "../_shared/components/base/Drawer.vue";
import UCohortsButtonShow from "./components/CohortsButtonShow.vue";
import UAnalysisButton from "./components/analysis/AnalysisButton.vue";
import UControlsToolbar from "./components/controls/ControlsToolbar.vue";
import UCohorts from "./components/Cohorts.vue";
import UCohortsMini from "./components/CohortsMini.vue";
import UCohort from "./components/Cohort.vue";
import FiltersCriteria from "../_shared/components/filters/filters-criteria";
import DomainNames from "@/_settings/domain-names";
import api from "./api";

export default {
  components: {
    UDrawer,
    UCohortsButtonShow,
    UAnalysisButton,
    UControlsToolbar,
    UCohorts,
    UCohortsMini,
    UCohort
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