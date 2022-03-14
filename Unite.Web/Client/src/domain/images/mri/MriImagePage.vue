<template>
  <div class="col q-gutter-y-sm">
    <div class="row" v-if="image">
      <q-breadcrumbs gutter="xs" class="text-subtitle1">
        <q-breadcrumbs-el icon="home" :to="{ name: 'home'}" />
        <q-breadcrumbs-el label="MRI Images" :to="{ name: 'mris' }" />
        <q-breadcrumbs-el :label="$route.params.id" />
      </q-breadcrumbs>
    </div>

    <div class="row" v-if="image">
      <div class="col">
        <div class="row">
          <div class="col">
            <q-separator />
            <q-tabs v-model="tab" dense align="left">
              <q-tab name="summary" label="Summary" icon="las la-info-circle" />
              <q-tab name="genes" label="Genes" icon="svguse:/icons.svg#u-gene-alt" :disable="!showGenes" />
              <q-tab name="mutations" label="Mutations" icon="svguse:/icons.svg#u-mutation-alt" :disable="!showMutations" />
            </q-tabs>
            <q-separator />
          </div>
        </div>

        <div class="row">
          <div class="col">
            <q-tab-panels v-model="tab" class="fit">
              <q-tab-panel name="summary" class="q-py-sm q-px-none">
                <u-summary-tab :image="image" />
              </q-tab-panel>

              <q-tab-panel name="genes" class="q-py-sm q-px-none">
                <u-genes-tab :image="image" />
              </q-tab-panel>

              <q-tab-panel name="mutations" class="q-py-sm q-px-none">
                <u-mutations-tab :image="image" />
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
import UGenesTab from "../_shared/components/image/GenesTab.vue";
import UMutationsTab from "../_shared/components/image/MutationsTab.vue";
import tabPageMixin from "../../_shared/tab-page-mixin";

import imageApi from "../_shared/api/image";
import donorApi from "../../donor/api";

export default {
  components: {
    USummaryTab,
    UGenesTab,
    UMutationsTab
  },

  mixins: [tabPageMixin],

  data() {
    return {
      loading: false,
      donor: null,
      image: null
    };
  },

  computed: {
    showGenes() {
      return !!this.image?.numberOfGenes;
    },

    showMutations() {
      return !!this.image?.numberOfMutations;
    }
  },

  async mounted() {
    try {
      this.loading = true;
      this.image = await imageApi.get(this.$route.params.id);
      this.donor = await donorApi.get(this.image.donorId);
    } catch (error) {
      this.image = null;
    } finally {
      this.loading = false;
    }
  }
}
</script>