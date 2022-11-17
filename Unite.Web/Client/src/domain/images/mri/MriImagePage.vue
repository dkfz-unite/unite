<template>
  <div class="col q-gutter-y-sm">
    <div class="row" v-if="image">
      <q-breadcrumbs gutter="xs" class="text-subtitle1">
        <q-breadcrumbs-el icon="home" :to="{ name: 'home'}" />
        <q-breadcrumbs-el label="MRI Images" :to="{ name: 'mris' }" />
        <q-breadcrumbs-el :label="$route.params.id" />
        <q-breadcrumbs-el :label="tabName" />
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
              <q-tab :name="variantTab" label="Variants" icon="svguse:/icons.svg#u-mutation-alt" :disable="!showVariants" @click.prevent="null">
                <q-menu fit>
                  <q-list dense>
                    <q-item clickable @click="tab = 'ssms'" :active="tab == 'ssms'" :disable="!showMutations">
                      <q-item-section>
                        <span class="q-py-sm">Mutations (SSM)</span>
                      </q-item-section>
                    </q-item>
                    <q-item clickable @click="tab = 'cnvs'" :active="tab == 'cnvs'" :disable="!showCopyNumberVariants">
                      <q-item-section>
                        <span class="q-py-sm">Copy Number Variants (CNV)</span>
                      </q-item-section>
                    </q-item>
                    <q-item clickable @click="tab = 'svs'" :active="tab == 'svs'" :disable="!showStructuralVariants">
                      <q-item-section>
                        <span class="q-py-sm">Structural Variants (SV)</span>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-tab>
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

              <q-tab-panel name="ssms" class="q-py-sm q-px-none">
                <u-ssms-tab :image="image" />
              </q-tab-panel>

              <q-tab-panel name="cnvs" class="q-py-sm q-px-none">
                <u-cnvs-tab :image="image" />
              </q-tab-panel>

              <q-tab-panel name="svs" class="q-py-sm q-px-none">
                <u-svs-tab :image="image" />
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
import USsmsTab from "../_shared/components/image/SSMsTab.vue";
import UCnvsTab from "../_shared/components/image/CNVsTab.vue";
import USvsTab from "../_shared/components/image/SVsTab.vue";
import tabPageMixin from "../../_shared/tab-page-mixin";

import imageApi from "../_shared/api/image";
import donorApi from "../../donor/api";

export default {
  components: {
    USummaryTab,
    UGenesTab,
    USsmsTab,
    UCnvsTab,
    USvsTab
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
    tabName() {
      return this.tab === "summary" ? "Summary"
           : this.tab === "genes" ? "Genes"
           : this.tab === "ssms" ? "SSMs"
           : this.tab === "cnvs" ? "CNVs"
           : this.tab === "svs" ? "SVs"
           : this.tab;
    },

    variantTab() {
      return this.tab === "ssms" ? "ssms"
           : this.tab === "cnvs" ? "cnvs"
           : this.tab === "svs" ? "svs"
           : null;
    },

    showGenes() {
      return !!this.image?.numberOfGenes;
    },

    showVariants() {
      return !!this.donor?.numberOfMutations
          || !!this.donor?.numberOfCopyNumberVariants
          || !!this.donor?.numberOfStructuralVariants;
    },

    showMutations() {
      return !!this.donor?.numberOfMutations;
    },

    showCopyNumberVariants() {
      return !!this.donor?.numberOfCopyNumberVariants;
    },

    showStructuralVariants() {
      return !!this.donor?.numberOfStructuralVariants;
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
  },

  async unmounted() {
    this.$store.dispatch("mri/clearState");
  }
}
</script>