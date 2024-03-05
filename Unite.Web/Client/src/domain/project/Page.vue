<template>
  <div class="col">
    <div class="row" v-if="project">
      <q-breadcrumbs gutter="xs" class="text-subtitle1">
        <q-breadcrumbs-el :icon="Settings.home.icon" :to="{ name: Settings.home.domain }" />
        <q-breadcrumbs-el :label="Settings.projects.title" :to="{ name: Settings.projects.domain }" />
        <q-breadcrumbs-el :label="$route.params.id" />
      </q-breadcrumbs>
    </div>

    <div class="row q-col-gutter-sm" :class="{ 'q-col-gutter-md': $q.screen.gt.sm }">
      <div class="col-12 col-md-7 q-gutter-y-sm">
        <div class="row">
          <u-summary :project="project" />
        </div>
        <div class="row">
          <u-description v-if="project" :project="project" />
        </div>
      </div>

      <div class="col-12 col-md-5 q-gutter-y-sm">
        <div class="row">
          <u-available-data :project="project" />
        </div>
      </div>
    </div>

    <q-inner-loading :showing="loading">
      <q-spinner-gears size="50px" color="grey" />
    </q-inner-loading>
  </div>
</template>

<script>
import USummary from "./components/Summary.vue";
import UAvailableData from "./components/AvailableData.vue";
import UDescription from "./components/Description.vue";

import Settings from "@/_settings/settings";
import api from "./api";

export default {
  components: {
    USummary,
    UAvailableData,
    UDescription
  },

  setup() {
    return {
      Settings
    }
  },

  data() {
    return {
      loading: false,
      project: null
    }
  },

  async mounted() {
    try {
      this.loading = true;
      this.project = await api.get(this.$route.params.id);
    } finally {
      this.loading = false;
    }
  }
}
</script>