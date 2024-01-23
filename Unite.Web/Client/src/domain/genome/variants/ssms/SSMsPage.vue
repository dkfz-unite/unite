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
        <q-breadcrumbs-el icon="home" :to="{ name: 'home' }" />
        <q-breadcrumbs-el label="SSMs" />
      </q-breadcrumbs>
    </div>

    <div class="row">
      <div class="col">
        <u-data-table
          title="Simple Somatic Mutations (SSM)"
          class="sticky-header"
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
import UDataTable from "@/domain/_shared/components/genome/variants/SSMsTable.vue";
import UFiltersToolbar from "@/domain/_shared/components/toolbars/filters/FiltersToolbar.vue";
import UCohortsToolbar from "@/domain/_shared/components/toolbars/cohorts/CohortsToolbar.vue";
import USearchBar from "@/_shared/components/table/header/SearchBar.vue";
import DomainNames from "@/_settings/domain-names";
import FilterModels from "@/_shared/components/filters/filter-models";
import VariantTypes from "@/_models/domain/genome/variants/variant-types";
import VariantsApi from "../_shared/api/variants";
import tablePageMixin from "@/domain/_shared/table-page-mixin";

const api = new VariantsApi(VariantTypes.SSM);

export default {
  components: {
    UDrawer,
    UFiltersButton,
    UFilters,
    UFiltersMini,
    UDataTable,
    UFiltersToolbar,
    UCohortsToolbar,
    USearchBar
  },

  mixins: [tablePageMixin],

  data() {
    return {
      drawer: this.$store.state.leftDrawer,
      domain: DomainNames.Ssms,
      model: FilterModels.Ssm,
      models: [FilterModels.Donor, FilterModels.Mri, ...FilterModels.Specimens, FilterModels.Gene, FilterModels.Ssm]
    };
  },

  methods: {
    async fetchData(searchCriteria) {
      return await api.search(searchCriteria);
    }
  }
}
</script>