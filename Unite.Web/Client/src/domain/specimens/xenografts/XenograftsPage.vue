<template>
  <!-- Filters button -->
  <teleport v-if="$q.screen.lt.md" to="#top-left-placeholder">
    <u-filters-button @click="$refs.drawer.open()" />
  </teleport>

  <!-- Filters drawer -->
  <u-drawer
    ref="drawer"
    side="left"
    v-model:shown="drawer.show"
    v-model:minimized="drawer.mini">
    <template #default>
      <u-filters
        :mode="filtersMode"
        :context="filtersContext"
        v-model="filtersCriteria"
        v-model:category="filtersCategory"
        @update:modelValue="filterData"
        @close="$refs.drawer.minimize()"
      />
    </template>

    <template #mini>
      <u-filters-mini
        :mode="filtersMode"
        :context="filtersContext"
        v-model="filtersCriteria"
        v-model:category="filtersCategory"
      />
    </template>
  </u-drawer>

  <!-- Page content -->
  <div class="col q-gutter-y-sm">
    <div class="row">
      <q-breadcrumbs gutter="xs" class="text-subtitle1">
        <q-breadcrumbs-el icon="home" :to="{ name: 'home' }" />
        <q-breadcrumbs-el label="Xenografts" />
      </q-breadcrumbs>
    </div>

    <div class="row">
      <div class="col">
        <u-data-table
          title="Xenografts"
          :loading="loading"
          :rows="rows"
          :rows-total="rowsTotal"
          v-model:rows-selected="rowsSelected"
          v-model:filters="filtersCriteria.filters"
          @update:filters="loadData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import UFiltersButton from "../../../_shared/components/filters/FiltersButton.vue";
import UFilters from "../../../_shared/components/filters/Filters.vue";
import UFiltersMini from "../../../_shared/components/filters/FiltersMini.vue";
import UDrawer from "../../../_shared/components/drawers/Drawer.vue";
import UDataTable from "./components/XenograftsTable.vue";
import tablePageMixin from "../../_shared/table-page-mixin";

import api from "../_shared/api/specimens";

export default {
  components: {
    UFiltersButton,
    UFilters,
    UFiltersMini,
    UDrawer,
    UDataTable
  },

  mixins: [tablePageMixin],

  data() {
    return {
      drawer: this.$store.state.leftDrawer,
      filtersCategory: "xenograft",
      filtersMode: "xenograft"
    };
  },

  computed: {
    domain() {
      return this.$store.state.xenografts;
    }
  },

  methods: {
    async fetchData(searchCriteria) {
      return await api.search("Xenograft", searchCriteria);
    }
  }
}
</script>