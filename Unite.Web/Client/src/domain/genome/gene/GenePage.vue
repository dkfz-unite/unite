<template>
  <div class="col q-gutter-y-sm">
    <div class="row" v-if="gene">
      <q-breadcrumbs gutter="xs" class="text-subtitle1">
        <q-breadcrumbs-el icon="home" :to="{ name: 'home' }" />
        <q-breadcrumbs-el label="Genes" :to="{ name: 'genes' }" />
        <q-breadcrumbs-el :label="$route.params.id" />
        <q-breadcrumbs-el :label="tabName" />
      </q-breadcrumbs>
    </div>

    <div class="row" v-if="gene">
      <div class="col">
        <div class="row">
          <div class="col">
            <q-separator />
            <q-tabs v-model="tab" dense align="left">
              <q-tab name="summary" label="Summary" icon="las la-info-circle" />
              <q-tab name="protein" label="Protein" icon="svguse:/icons.svg#u-lolliplot" />
              <q-tab name="donors" label="Donors" icon="las la-user-circle" />
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
            <q-tab-panels v-model="tab">
              <q-tab-panel name="summary" class="q-py-sm q-px-none">
                <u-summary-tab :gene="gene" />
              </q-tab-panel>

              <q-tab-panel name="protein" class="q-py-sm q-px-none">
                <u-protein-tab :gene="gene" />
              </q-tab-panel>

              <q-tab-panel name="donors" class="q-py-sm q-px-none">
                <u-donors-tab :gene="gene" />
              </q-tab-panel>

              <q-tab-panel name="ssms" class="q-py-sm q-px-none">
                <u-ssms-tab :gene="gene" />
              </q-tab-panel>

              <q-tab-panel name="cnvs" class="q-py-sm q-px-none">
                <u-cnvs-tab :gene="gene" />
              </q-tab-panel>

              <q-tab-panel name="svs" class="q-py-sm q-px-none">
                <u-svs-tab :gene="gene" />
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
import UProteinTab from "./components/ProteinTab.vue";
import UDonorsTab from "./components/DonorsTab.vue";
import USsmsTab from "./components/SSMsTab.vue";
import UCnvsTab from "./components/CNVsTab.vue";
import USvsTab from "./components/SVsTab.vue";
import tabPageMixin from "../../_shared/tab-page-mixin";

import api from "./api";

export default {
  components:{
    USummaryTab,
    UProteinTab,
    UDonorsTab,
    USsmsTab,
    UCnvsTab,
    USvsTab
  },

  mixins: [tabPageMixin],

  data() {
    return {
      loading: false,
      gene: null
    };
  },

  computed: {
    tabName() {
      return this.tab === "summary" ? "Summary"
           : this.tab === "protein" ? "Protein"
           : this.tab === "donors" ? "Donors"
           : this.tab === "ssms" ? "SSMs"
           : this.tab === "cnvs" ? "CNVs"
           : this.tab === "svs" ? "SVs"
           : this.tab;
    },

    showVariants() {
      return !!this.gene?.numberOfMutations
          || !!this.gene?.numberOfCopyNumberVariants
          || !!this.gene?.numberOfStructuralVariants;
    },

    variantTab() {
      return this.tab === "ssms" ? "ssms"
           : this.tab === "cnvs" ? "cnvs"
           : this.tab === "svs" ? "svs"
           : null;
    },

    showMutations() {
      return !!this.gene?.numberOfMutations;
    },

    showCopyNumberVariants() {
      return !!this.gene?.numberOfCopyNumberVariants;
    },

    showStructuralVariants() {
      return !!this.gene?.numberOfStructuralVariants;
    }
  },

  mounted() {
    this.loadData();
  },

  methods: {
    async loadData() {
      try {
        this.loading = true;
        this.gene = await api.get(this.$route.params.id);
      } catch (error) {
        this.gene = null;
      } finally {
        this.loading = false;
      }
    }
  },

  async unmounted() {
    this.$store.dispatch("gene/clearState");
  }
}
</script>