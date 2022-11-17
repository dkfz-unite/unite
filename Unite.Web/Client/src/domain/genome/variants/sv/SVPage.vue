<template>
  <div class="col q-gutter-y-sm">
    <div class="row" v-if="variant">
      <q-breadcrumbs gutter="xs" class="text-subtitle1">
        <q-breadcrumbs-el icon="home" :to="{ name: 'home' }" />
        <q-breadcrumbs-el label="SVs" :to="{ name: 'svs' }" />
        <q-breadcrumbs-el :label="$route.params.id" />
        <q-breadcrumbs-el :label="tabName" />
      </q-breadcrumbs>
    </div>

    <div class="row" v-if="variant">
      <div class="col">
        <div class="row">
          <div class="col">
            <q-separator />
            <q-tabs v-model="tab" dense align="left">
              <q-tab name="summary" label="Summary" icon="las la-info-circle" />
              <q-tab name="consequences" label="Consequences" icon="las la-exclamation-triangle" :disable="!variant.affectedFeatures?.length" />
            </q-tabs>
            <q-separator />
          </div>
        </div>

        <div class="row">
          <div class="col">
            <q-tab-panels v-model="tab">
              <q-tab-panel name="summary" class="q-py-sm q-px-none">
                <u-summary-tab :variant="variant" />
              </q-tab-panel>
              <q-tab-panel name="consequences" class="q-py-sm q-px-none">
                <u-consequences-tab :variant="variant" />
              </q-tab-panel>
            </q-tab-panels>
          </div>
        </div>
      </div>
    </div>

    <q-inner-loading :showing="loading">
      <q-spinner-gears size="50px" color="grey" />
    </q-inner-loading>
  </div>
</template>
  
<script>
import USummaryTab from "./components/SummaryTab.vue";
import UConsequencesTab from "../_shared/components/ConsequencesTab.vue";
import tabPageMixin from "../../../_shared/tab-page-mixin";

import api from "../_shared/api/variant";

export default {
  components:{
    USummaryTab,
    UConsequencesTab
  },

  mixins: [tabPageMixin],

  data() {
    return {
      loading: false,
      variant: null
    };
  },

  computed: {
    tabName() {
      return this.tab === "summary" ? "Summary"
            : this.tab == "consequences" ? "Consequences"
            : this.tab;
    }
  },

  async mounted() {
    try {
      this.loading = true;
      this.variant = await api.get(this.$route.params.id);
    } catch (error) {
      this.variant = null;
    } finally {
      this.loading = false;
    }
  },

  async unmounted() {
    this.$store.dispatch("sv/clearState");
  }
}
</script>