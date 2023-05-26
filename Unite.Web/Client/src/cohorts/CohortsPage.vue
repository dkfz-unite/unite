<template>
  <!-- Cohorts button -->
  <teleport v-if="domains?.length && $q.screen.lt.md" to="#top-left-placeholder">
    <u-cohorts-button-show @click="$refs.drawer.open()" />
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
    <div class="row">
      <q-breadcrumbs gutter="xs" class="text-subtitle1">
        <q-breadcrumbs-el icon="home" :to="{ name: 'home'}" />
        <q-breadcrumbs-el label="Cohorts" />
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
          <u-cohort :cohort="cohort" :domain="domain?.name" />
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
import UControlsToolbar from "./components/controls/ControlsToolbar.vue";
import UCohorts from "./components/Cohorts.vue";
import UCohortsMini from "./components/CohortsMini.vue";
import UCohort from "./components/Cohort.vue";
import FiltersCriteria from "../_shared/components/filters/filters-criteria";

import donorsApi from "../domain/donors/api";
import imagesApi from "../domain/images/_shared/api/images";
import specimensApi from "../domain/specimens/_shared/api/specimens";
import genesApi from "../domain/genome/genes/api";
import variantsApi from "../domain/genome/variants/_shared/api/variants";

export default {
  components: {
    UDrawer,
    UCohortsButtonShow,
    UControlsToolbar,
    UCohorts,
    UCohortsMini,
    UCohort
  },

  data() {
    return {
      drawer: this.$store.state.leftDrawer,
      // domains: [],
      domain: null,
      cohort: null
    };
  },

  computed: {
    identity() {
      return this.$store.state.identity.account?.email;
    },

    domains() {
      return this.$store.getters["filters/domains"];
    },
  },

  mounted() {
    this.domain = this.domains?.length ? this.domains[0] : null;
    this.cohort = this.domain?.cohorts?.length ? this.domain.cohorts[0] : null;
  },

  watch: {
    cohort(cohort) {
      if (cohort && cohort.size == null) {
        this.loadCohortSize();
      }
    }
  },

  methods: {
    loadCohorts() {
      this.domain = this.domains?.length
        ? this.domains.find(domain => domain.name == this.domain?.name) || this.domains[0]
        : null;

      this.cohort = this.domain?.cohorts?.length
        ? this.domain.cohorts[0] 
        : null;
    },

    async loadCohortSize() {
      let searchCriteria = new FiltersCriteria(this.cohort.criteria).toSearchCriteria();
      searchCriteria.from = 0;
      searchCriteria.size = 0;

      let data = null;

      try {
        if (this.domain.name == "donors") {
          data = await donorsApi.search(searchCriteria);
        } else if (this.domain.name == "mris") {
          data = await imagesApi.search("MRI", searchCriteria);
        } else if (this.domain.name == "tissues") {
          data = await specimensApi.search("Tissue", searchCriteria);
        } else if (this.domain.name == "cells") {
          data = await specimensApi.search("CellLine", searchCriteria);
        } else if (this.domain.name == "organoids") {
          data = await specimensApi.search("Organoid", searchCriteria);
        } else if (this.domain.name == "xenografts") {
          data = await specimensApi.search("Xenograft", searchCriteria);
        } else if (this.domain.name == "genes") {
          data = await genesApi.search(searchCriteria);
        } else if (this.domain.name == "ssms") {
          data = await variantsApi.search("ssm", searchCriteria);
        } else if (this.domain.name == "cnvs") {
          data = await variantsApi.search("cnv", searchCriteria);
        } else if (this.domain.name == "svs") {
          data = await variantsApi.search("sv", searchCriteria);
        }

        this.cohort.size = data?.total;
      } catch {
        // Do nothing
      }
    }
  }
}
</script>