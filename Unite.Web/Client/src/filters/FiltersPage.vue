<template>
  <!-- Cohorts button -->
  <teleport v-if="domains?.length && $q.screen.lt.md" to="#top-left-placeholder">
    <u-cohorts-button @click="$refs.drawer.open()" />
  </teleport>

  <!-- Cohorts drawer -->
  <u-drawer
    ref="drawer"
    side="left"
    v-if="domains?.length && domain && cohort"
    v-model:shown="drawer.show"
    v-model:minimized="drawer.mini">
    <template #default>
      <u-cohorts
        :domains="domains" 
        v-model:domain="domain"
        v-model:cohort="cohort"
        @close="$refs.drawer.minimize()"
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
    <div class="row">
      <q-breadcrumbs gutter="xs" class="text-subtitle1">
        <q-breadcrumbs-el icon="home" :to="{ name: 'home'}" />
        <q-breadcrumbs-el label="Filters" />
      </q-breadcrumbs>
    </div>

    <div v-if="domains?.length" class="row">
      <div v-if="cohort" class="col">
        <!-- Cohort control buttons -->
        <div class="row">
          <div class="col">
            <q-separator />

            <u-controls-toolbar
              :identity="identity"
              :domain="domain"
              :cohort="cohort"
              @deleted="loadCohorts">
            </u-controls-toolbar>

            <q-separator />
          </div>
        </div>

        <!-- Cohort content -->
        <div class="row">
          <u-cohort :cohort="cohort" />
        </div>
      </div>
    </div>

    <!-- No data section -->
    <div v-else class="row">
      <div class="col">
        <div class="absolute-center">
          No filters have been saved
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UDrawer from "../_shared/components/drawers/Drawer.vue";
import UCohortsButton from "./components/CohortsButton.vue";
import UControlsToolbar from "./components/controls/ControlsToolbar.vue";
import UCohorts from "./components/Cohorts.vue";
import UCohortsMini from "./components/CohortsMini.vue";
import UCohort from "./components/Cohort.vue";

import cohortsStorage from "./services/cohorts-storage";

export default {
  components: {
    UDrawer,
    UCohortsButton,
    UControlsToolbar,
    UCohorts,
    UCohortsMini,
    UCohort
  },

  data() {
    return {
      drawer: this.$store.state.leftDrawer,
      domains: [],
      domain: null,
      cohort: null
    };
  },

  computed: {
    identity() {
      return this.$store.state.identity.account?.email;
    }
  },

  mounted() {
    this.loadCohorts();
  },

  methods: {
    loadCohorts() {
      this.domains = cohortsStorage.loadCohorts(this.identity);

      this.domain = this.domains?.length
        ? this.domains.find(domain => domain.name == this.domain?.name) || this.domains[0]
        : null;

      this.cohort = this.domain?.cohorts?.length
        ? this.domain.cohorts[0] 
        : null;
    }
  }
}
</script>