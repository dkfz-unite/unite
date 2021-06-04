<template>
  <div class="col q-gutter-y-sm">
    <div class="row">
      <q-breadcrumbs gutter="xs">
        <q-breadcrumbs-el icon="home" :to="{ name: 'home' }"/>
        <q-breadcrumbs-el label="OncoGrid"/>
      </q-breadcrumbs>
    </div>

    <div class="row">
      <div class="col">
        <div class="row q-col-gutter-sm">
          <div class="col-12 col-sm-3 col-md-2">
            <u-filters v-model="criteria" selected="donor" @input="fetchData"/>
          </div>
          <div class="col-12 col-sm-9 col-md-10">
            <!-- define oncoGridResource as key in order to force refresh on update (rebuild oncogrid)-->
            <oncogrid :key="oncoGridResource" :onco-grid-resource="oncoGridResource"/>
            <q-inner-loading :showing="loading">
              <q-spinner color="primary" size="3em" :thickness="2"/>
            </q-inner-loading>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Oncogrid from "@/components/oncogrid/OncoGrid";
import UFilters from "@/components/common/filters/OncoGridFilters";
import UNumberFilter from "@/components/common/filters/standard/NumberFilter.vue";
import apiClient from "@/services/api/api.client.oncogrid";

export default {
  props: ["selectedDonors", "donorFilters"],
  data() {
    return {
      criteria: this.$store.state.oncogrid.searchCriteria,
      loading: true,
      oncoGridResource: null
    };
  },

  created() {
    if (this.donorFilters != null) {
      this.criteria.donorFilters = this.donorFilters;
    }
    if (this.selectedDonors != null) {
      for (const selectedDonor of this.selectedDonors) {
        this.criteria.donorFilters.referenceId.push(selectedDonor.id)
      }
    }
    this.fetchData();
  },

  methods: {
    async fetchData() {
      try {
        this.loading = true;
        this.oncoGridResource = await apiClient.search(this.criteria);
      } catch (error) {
        this.oncoGridResource = null;
      }

      this.loading = false;
    },
  },

  components: {
    UFilters: UFilters,
    Oncogrid: Oncogrid,
    UNumberFilter: UNumberFilter
  },
}
</script>

<style scoped>

</style>