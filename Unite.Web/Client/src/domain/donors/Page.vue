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
        <q-breadcrumbs-el :icon="Settings.home.icon" :to="{ name: 'home' }" />
        <q-breadcrumbs-el :label="Settings.donors.crumb" />
      </q-breadcrumbs>
    </div>

    <div class="row">
      <div class="col">
        <u-data-table
          class="sticky-header"
          :title="Settings.donors.title"
          :loading="loading"
          :rows="rows"
          :rows-total="rowsTotal"
          v-model:rows-selected="rowsSelected"
          v-model:from="filtersCriteria.from"
          v-model:size="filtersCriteria.size"
          @update:from="updateFrom"
          @update:size="updateSize">
          <template #header-left>
            <div class="row q-gutter-x-xs">
              <u-status :action="updateStatus" />
            </div>
          </template>
          <template #header-right>
            <div class="row q-gutter-x-xs">
              <u-filters-toolbar :domain="domain" />
              <u-datasets-toolbar :domain="domain" />
              <u-upload-button v-if="canWriteData" />
              <!-- <u-oncogrid-link :mode="domain" :disable="!rowsTotal" /> -->
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
import UDataTable from "./components/Table.vue";
import UStatus from "@/domain/_shared/entries/components/status/Status.vue";
import UFiltersToolbar from "@/domain/_shared/entries/components/toolbars/filters/FiltersToolbar.vue";
import UDatasetsToolbar from "@/domain/_shared/entries/components/toolbars/datasets/DatasetsToolbar.vue";
import USearchBar from "@/_shared/components/table/header/SearchBar.vue";
import UOncogridLink from "@/visualization/oncogrid/OncogridLink.vue";
import UUploadButton from "./components/UploadButton.vue";
import pageTableMixin from "@/domain/_shared/entries/components/page-table-mixin";

import Settings from "@/_settings/settings";
import FilterModels from "@/_shared/components/filters/filter-models";
import DonorsApi from "./api";
import { mapGetters } from "vuex";

const api = new DonorsApi();

export default {
  components: {
    UDrawer,
    UFiltersButton,
    UFilters,
    UFiltersMini,
    UDataTable,
    UStatus,
    UFiltersToolbar,
    UDatasetsToolbar,
    UOncogridLink,
    USearchBar,
    UUploadButton
  },

  mixins: [pageTableMixin],

  setup() {
    return {
      Settings
    };
  },

  data() {
    return {
      drawer: this.$store.state.leftDrawer,
      domain: Settings.donors.domain,
      model: FilterModels.Donor,
      models: FilterModels.All
    };
  },

  computed: {
    ...mapGetters("identity", ["canWriteData"])
  },

  methods: {
    async fetchData(searchCriteria) {
      return await api.search(searchCriteria);
    },

    async updateStatus() {
      return await api.status();
    }
  }
}
</script>
