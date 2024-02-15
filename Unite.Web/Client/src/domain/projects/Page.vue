<template>
  <div class="col q-gutter-sm">
    <div class="row">
      <q-breadcrumbs gutter="xs" class="text-subtitle1">
        <q-breadcrumbs-el :icon="Settings.home.icon" :to="{ name: Settings.home.domain }" />
        <q-breadcrumbs-el :label="Settings.projects.title" />
      </q-breadcrumbs>
    </div>

    <div class="row">
      <div class="col">
        <u-data-table 
          :rows="rows" 
          :loading="loading"
        />
      </div>
    </div>
  </div>
</template>

<script>
import UDataTable from "./components/Table.vue";

import Settings from "@/_settings/settings";
import api from "./api";

export default {
  components: {
    UDataTable
  },

  setup() {
    return {
      Settings
    }
  },

  data() {
    return {
      loading: false,
      rows: []
    }
  },

  async mounted() {
    try {
      this.loading = true;
      this.rows = await api.search();
    } finally {
      this.loading = false;
    }
  }
}
</script>