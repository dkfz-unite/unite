<template>
  <div class="col q-gutter-y-sm">
    <div class="row" v-if="specimen && donor">
      <q-breadcrumbs gutter="xs" class="text-subtitle1">
        <q-breadcrumbs-el icon="home" :to="{ name: 'home'}" />
        <q-breadcrumbs-el label="Cell Lines" :to="{ name: 'cells' }" />
        <q-breadcrumbs-el :label="$route.params.id" />
        <q-breadcrumbs-el :label="tabName" />
      </q-breadcrumbs>
      
      <q-space />

      <u-upload-button
        v-if="specimen && donor && canUpload"
        :donorId="donor.referenceId"
        :specimenId="specimen.cellLine.referenceId"
        specimenType="CellLine">
      </u-upload-button>
    </div>

    <div class="row" v-if="specimen && donor">
      <div class="col">
        <div class="row">
          <div class="col">
            <q-separator />
            <q-tabs v-model="tab" dense align="left">
              <q-tab name="summary" label="Summary" icon="las la-info-circle" />
              <q-tab name="ancestry" label="Ancestry" icon="las la-sitemap" />
              <q-tab name="drugs" label="Drugs" icon="las la-capsules" :disable="!showDrugs" />
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
                <u-summary-tab :specimen="specimen" />
              </q-tab-panel>

              <q-tab-panel name="ancestry" class="q-py-sm q-px-none">
                <u-ancestry-tab :specimen="specimen" />
              </q-tab-panel>

              <q-tab-panel name="drugs" class="q-py-sm q-px-none">
                <u-drugs-tab :specimen="specimen" />
              </q-tab-panel>

              <q-tab-panel name="genes" class="q-py-sm q-px-none">
                <u-genes-tab :specimen="specimen" />
              </q-tab-panel>

              <q-tab-panel name="ssms" class="q-py-sm q-px-none">
                <u-ssms-tab :specimen="specimen" />
              </q-tab-panel>

              <q-tab-panel name="cnvs" class="q-py-sm q-px-none">
                <u-cnvs-tab :specimen="specimen" />
              </q-tab-panel>

              <q-tab-panel name="svs" class="q-py-sm q-px-none">
                <u-svs-tab :specimen="specimen" />
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
import UAncestryTab from "../_shared/components/specimen/AncestryTab.vue";
import UDrugsTab from "../_shared/components/specimen/DrugsTab.vue";
import UGenesTab from "../_shared/components/specimen/GenesTab.vue";
import USsmsTab from "../_shared/components/specimen/SSMsTab.vue";
import UCnvsTab from "../_shared/components/specimen/CNVsTab.vue";
import USvsTab from "../_shared/components/specimen/SVsTab.vue";
import UUploadButton from "../_shared/components/specimen/upload/UploadButton.vue";

import tabPageMixin from "../../_shared/tab-page-mixin";
import specimenPageMixin from "../_shared/specimen-page-mixin";

export default {
  components: {
    USummaryTab,
    UAncestryTab,
    UDrugsTab,
    UGenesTab,
    USsmsTab,
    UCnvsTab,
    USvsTab,
    UUploadButton
},

  mixins: [tabPageMixin, specimenPageMixin],

  async unmounted() {
    this.$store.dispatch("cell/clearState");
  }
}
</script>