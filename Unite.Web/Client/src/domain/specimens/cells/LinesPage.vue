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
        :criteria="filtersCriteria"
        :context="filtersContext"
        :models="models"
        v-model:model="model"
        @update="updateFilters"
        @hide="$refs.drawer.minimize()"
      />
    </template>

    <template #mini>
      <u-filters-mini
        :criteria="filtersCriteria"
        :context="filtersContext"
        :models="models"
        v-model:model="model"
      />
    </template>
  </u-drawer>

  <!-- Page content -->
  <div class="col q-gutter-y-sm">
    <div class="row">
      <q-breadcrumbs gutter="xs" class="text-subtitle1">
        <q-breadcrumbs-el :icon="Settings.home.icon" :to="{ name: Settings.home.domain }" />
        <q-breadcrumbs-el :label="Settings.lines.crumb" />
      </q-breadcrumbs>
    </div>

    <div class="row">
      <div class="col">
        <u-data-table
          class="sticky-header"
          :title="Settings.lines.title"
          :loading="loading"
          :rows="rows"
          :rows-total="rowsTotal"
          v-model:rows-selected="rowsSelected"
          v-model:from="filtersCriteria.from"
          v-model:size="filtersCriteria.size"
          @update:from="updateFrom"
          @update:size="updateSize">
          <template #header-right>
            <div class="row q-gutter-x-xs">
              <u-filters-toolbar :domain="domain" />
              <u-cohorts-toolbar :domain="domain" />
              <u-upload-button v-if="canUpload" />
              <u-search-bar v-model="filtersCriteria.query" @update:modelValue="updateFilters" />
            </div>
          </template>
        </u-data-table>
      </div>
    </div>
  </div>
</template>

<script>
import UDrawer from "@/_shared/components/base/Drawer.vue";
import UFiltersButton from "@/_shared/components/filters/FiltersButton.vue";
import UFilters from "@/_shared/components/filters/Filters.vue";
import UFiltersMini from "@/_shared/components/filters/FiltersMini.vue";
import UDataTable from "./components/CellsTable.vue";
import UFiltersToolbar from "@/domain/_shared/components/toolbars/filters/FiltersToolbar.vue";
import UCohortsToolbar from "@/domain/_shared/components/toolbars/cohorts/CohortsToolbar.vue";
import USearchBar from "@/_shared/components/table/header/SearchBar.vue";
import UUploadButton from "./components/UploadButton.vue";
import FilterModels from "@/_shared/components/filters/filter-models";
import SpecimenTypes from "@/_models/domain/specimens/specimen-types";
import SpecimensApi from "../_shared/api/specimens";
import tablePageMixin from "@/domain/_shared/table-page-mixin";
import Permissions from "@/_models/admin/enums/permissions";
import Settings from "@/_settings/settings";

const api = new SpecimensApi(SpecimenTypes.CellLine);

export default {
  components: {
    UDrawer,
    UFiltersButton,
    UFilters,
    UFiltersMini,
    UDataTable,
    UFiltersToolbar,
    UCohortsToolbar,
    USearchBar,
    UUploadButton
  },

  mixins: [tablePageMixin],

  setup() {
    return {
      Settings
    }
  },

  data() {
    return {
      drawer: this.$store.state.leftDrawer,
      domain: Settings.lines.domain,
      model: FilterModels.Cell,
      models: [FilterModels.Donor, FilterModels.Cell, ...FilterModels.Genome]
    };
  },

  computed: {
    canUpload() {
      const account = this.$store.state.identity.account;
      return account.hasPermission(Permissions.Data.Write);
    },
  },

  methods: {
    async fetchData(searchCriteria) {
      return await api.search(searchCriteria);
    }
  }
}
</script>