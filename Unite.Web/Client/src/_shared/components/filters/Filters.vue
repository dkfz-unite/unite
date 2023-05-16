<template>
  <div class="q-gutter-sm" v-if="filtersCriteria">
    <!-- Header -->
    <div class="row justify-between q-pl-xs">
      <div>
        <q-btn
          icon="las la-filter"
          dense rounded unelevated
          @click="false"
        />
      </div>

      <div>
        <span class="text-subtitle1">
          {{title}}
        </span>
      </div>

      <div>
        <q-btn
          icon="las la-chevron-circle-left"
          dense rounded unelevated
          @click="$emit('close')"
        />
      </div>
    </div>

    <!-- Filters -->
    <div class="row">
      <div class="col-auto">
        <q-tabs 
          v-model="filtersCategory"
          indicator-color="parimary" 
          active-color="primary" 
          align="left" 
          dense vertical>

          <!-- Visualisation -->
          <q-tab v-if="showFilters('oncogrid')" name="oncogrid" icon="las la-chart-area">
            <q-badge v-if="filtersCriteria.oncogridFiltersCriteria.numberOfFilters" :color="getBadgeColor('oncogrid')" rounded>
              {{filtersCriteria.oncogridFiltersCriteria.numberOfFilters}}
            </q-badge>
          </q-tab>

          <!-- Data types -->
          <q-tab v-if="showFilters('donor')" name="donor" icon="las la-user-circle">
            <q-badge v-if="filtersCriteria.donorFiltersCriteria.numberOfFilters" :color="getBadgeColor('donor')" rounded>
              {{filtersCriteria.donorFiltersCriteria.numberOfFilters}}
            </q-badge>
          </q-tab>

          <q-tab v-if="showFilters('mri')" name="mri" icon="las la-x-ray">
            <q-badge v-if="filtersCriteria.mriFiltersCriteria.numberOfFilters" :color="getBadgeColor('mri')" rounded>
              {{filtersCriteria.mriFiltersCriteria.numberOfFilters}}
            </q-badge>
          </q-tab>

          <q-tab v-if="showFilters('tissue')" name="tissue" icon="svguse:/icons.svg#u-tissue">
            <q-badge v-if="filtersCriteria.tissueFiltersCriteria.numberOfFilters" :color="getBadgeColor('tissue')" rounded>
              {{filtersCriteria.tissueFiltersCriteria.numberOfFilters}}
            </q-badge>
          </q-tab>

          <q-tab v-if="showFilters('cell')" name="cell" icon="las la-microscope">
            <q-badge v-if="filtersCriteria.cellFiltersCriteria.numberOfFilters" :color="getBadgeColor('cell')" rounded>
              {{filtersCriteria.cellFiltersCriteria.numberOfFilters}}
            </q-badge>
          </q-tab>

          <q-tab v-if="showFilters('organoid')" name="organoid" icon="svguse:/icons.svg#u-organoid">
            <q-badge v-if="filtersCriteria.organoidFiltersCriteria.numberOfFilters" :color="getBadgeColor('organoid')" rounded>
              {{filtersCriteria.organoidFiltersCriteria.numberOfFilters}}
            </q-badge>
          </q-tab>

          <q-tab v-if="showFilters('xenograft')" name="xenograft" icon="svguse:/icons.svg#u-mouse">
            <q-badge v-if="filtersCriteria.xenograftFiltersCriteria.numberOfFilters" :color="getBadgeColor('xenograft')" rounded>
              {{filtersCriteria.xenograftFiltersCriteria.numberOfFilters}}
            </q-badge>
          </q-tab>

          <q-tab v-if="showFilters('gene')" name="gene" icon="svguse:/icons.svg#u-gene">
            <q-badge v-if="filtersCriteria.geneFiltersCriteria.numberOfFilters" :color="getBadgeColor('gene')" rounded>
              {{filtersCriteria.geneFiltersCriteria.numberOfFilters}}
            </q-badge>
          </q-tab>

          <q-tab v-if="showFilters('ssm')" name="ssm" icon="svguse:/icons.svg#u-ssm">
            <q-badge v-if="filtersCriteria.mutationFiltersCriteria.numberOfFilters" :color="getBadgeColor('ssm')" rounded>
              {{filtersCriteria.mutationFiltersCriteria.numberOfFilters}}
            </q-badge>
          </q-tab>

          <q-tab v-if="showFilters('cnv')" name="cnv" icon="svguse:/icons.svg#u-cnv">
            <q-badge v-if="filtersCriteria.copyNumberVariantFiltersCriteria.numberOfFilters" :color="getBadgeColor('cnv')" rounded>
              {{filtersCriteria.copyNumberVariantFiltersCriteria.numberOfFilters}}
            </q-badge>
          </q-tab>

          <q-tab v-if="showFilters('sv')" name="sv" icon="svguse:/icons.svg#u-sv">
            <q-badge v-if="filtersCriteria.structuralVariantFiltersCriteria.numberOfFilters" :color="getBadgeColor('cnv')" rounded>
              {{filtersCriteria.structuralVariantFiltersCriteria.numberOfFilters}}
            </q-badge>
          </q-tab>
        </q-tabs>
      </div>

      <q-separator vertical />

      <div class="col">
        <q-tab-panels v-model="filtersCategory" class="q-pl-sm">
          <!-- Visualisation -->
          <q-tab-panel v-if="showFilters('oncogrid')" name="oncogrid" class="q-pa-none">
            <div class="col q-gutter-y-sm">
              <div class="row">
                <u-oncogrid-filters
                  v-model="filtersCriteria.oncogridFiltersCriteria"
                  @update:modelValue="onUpdate"
                />
              </div>
            </div>
          </q-tab-panel>

          <!-- Data types -->
          <q-tab-panel v-if="showFilters('donor')" name="donor" class="q-pa-none">
            <div class="col q-gutter-y-sm">
              <div class="row">
                <u-criteria-filters
                  v-if="filtersCriteria?.donorFiltersCriteria"
                  v-model="filtersCriteria.donorFiltersCriteria"
                  :context="filtersContext.donorFiltersContext"
                  :filters="donorFilters"
                  @update:modelValue="onUpdate"
                />
              </div>
              <div class="row" v-if="filtersCriteria.donorFiltersCriteria.numberOfFilters">
                <u-filters-button-clear @click="filtersCriteria.donorFiltersCriteria.clear(); onUpdate();" />
              </div>
            </div>
          </q-tab-panel>

          <q-tab-panel v-if="showFilters('mri')" name="mri" class="q-pa-none">
            <div class="col q-gutter-y-sm">
              <div>
                <u-criteria-filters
                  v-if="filtersCriteria?.mriFiltersCriteria"
                  v-model="filtersCriteria.mriFiltersCriteria"
                  :context="filtersContext.mriFiltersContext"
                  :filters="mriFilters"
                  @update:modelValue="onUpdate"
                />
              </div>
              <div class="row" v-if="filtersCriteria.mriFiltersCriteria.numberOfFilters">
                <u-filters-button-clear @click="filtersCriteria.mriFiltersCriteria.clear(); onUpdate();" />
              </div>
            </div>
          </q-tab-panel>

          <q-tab-panel v-if="showFilters('tissue')" name="tissue" class="q-pa-none">
            <div class="col q-gutter-y-sm">
              <div class="row">
                <u-criteria-filters
                  v-if="filtersCriteria?.tissueFiltersCriteria"
                  v-model="filtersCriteria.tissueFiltersCriteria"
                  :context="filtersContext.tissueFiltersContext"
                  :filters="tissueFilters"
                  @update:modelValue="onUpdate"
                />
              </div>
              <div class="row" v-if="filtersCriteria.tissueFiltersCriteria.numberOfFilters">
                <u-filters-button-clear @click="filtersCriteria.tissueFiltersCriteria.clear(); onUpdate();" />
              </div>
            </div>
          </q-tab-panel>

          <q-tab-panel v-if="showFilters('cell')" name="cell" class="q-pa-none">
            <div class="col q-gutter-y-sm">
              <div class="row">
                <u-criteria-filters
                  v-if="filtersCriteria?.cellFiltersCriteria"
                  v-model="filtersCriteria.cellFiltersCriteria"
                  :context="filtersContext.cellFiltersContext"
                  :filters="cellFilters"
                  @update:modelValue="onUpdate"
                />
              </div>
              <div class="row" v-if="filtersCriteria.cellFiltersCriteria.numberOfFilters">
                <u-filters-button-clear @click="filtersCriteria.cellFiltersCriteria.clear(); onUpdate();" />
              </div>
            </div>
          </q-tab-panel>

          <q-tab-panel v-if="showFilters('organoid')" name="organoid" class="q-pa-none">
            <div class="col q-gutter-y-sm">
              <div class="row">
                <u-criteria-filters
                  v-if="filtersCriteria?.organoidFiltersCriteria"
                  v-model="filtersCriteria.organoidFiltersCriteria"
                  :context="filtersContext.organoidFiltersContext"
                  :filters="organoidFilters"
                  @update:modelValue="onUpdate"
                />
              </div>
              <div class="row" v-if="filtersCriteria.organoidFiltersCriteria.numberOfFilters">
                <u-filters-button-clear @click="filtersCriteria.organoidFiltersCriteria.clear(); onUpdate();" />
              </div>
            </div>
          </q-tab-panel>

          <q-tab-panel v-if="showFilters('xenograft')" name="xenograft" class="q-pa-none">
            <div class="col q-gutter-y-sm">
              <div class="row">
                <u-criteria-filters
                  v-if="filtersCriteria?.xenograftFiltersCriteria"
                  v-model="filtersCriteria.xenograftFiltersCriteria"
                  :context="filtersContext.xenograftFiltersContext"
                  :filters="xenograftFilters"
                  @update:modelValue="onUpdate"
                />
              </div>
              <div class="row" v-if="filtersCriteria.xenograftFiltersCriteria.numberOfFilters">
                <u-filters-button-clear @click="filtersCriteria.xenograftFiltersCriteria.clear(); onUpdate();" />
              </div>
            </div>
          </q-tab-panel>

          <q-tab-panel v-if="showFilters('gene')" name="gene" class="q-pa-none">
            <div class="col q-gutter-y-sm">
              <div class="row">
                <u-criteria-filters
                  v-if="filtersCriteria?.geneFiltersCriteria"
                  v-model="filtersCriteria.geneFiltersCriteria"
                  :context="filtersContext.geneFiltersContext"
                  :filters="geneFilters"
                  @update:modelValue="onUpdate"
                />
              </div>
              <div class="row" v-if="filtersCriteria.geneFiltersCriteria.numberOfFilters">
                <u-filters-button-clear @click="filtersCriteria.geneFiltersCriteria.clear(); onUpdate();" />
              </div>
            </div>
          </q-tab-panel>

          <q-tab-panel v-if="showFilters('ssm')" name="ssm" class="q-pa-none">
            <div class="col q-gutter-y-sm">
              <div>
                <u-criteria-filters
                  v-if="filtersCriteria?.mutationFiltersCriteria"
                  v-model="filtersCriteria.mutationFiltersCriteria"
                  :context="filtersContext.mutationFiltersContext"
                  :filters="mutationFilters"
                  @update:modelValue="onUpdate"
                />
              </div>
              <div class="row" v-if="filtersCriteria.mutationFiltersCriteria.numberOfFilters">
                <u-filters-button-clear @click="filtersCriteria.mutationFiltersCriteria.clear(); onUpdate();" />
              </div>
            </div>
          </q-tab-panel>

          <q-tab-panel v-if="showFilters('cnv')" name="cnv" class="q-pa-none">
            <div class="col q-gutter-y-sm">
              <div>
                <u-criteria-filters
                  v-if="filtersCriteria?.copyNumberVariantFiltersCriteria"
                  v-model="filtersCriteria.copyNumberVariantFiltersCriteria"
                  :context="filtersContext.copyNumberVariantFiltersContext"
                  :filters="copyNumberVariantFilters"
                  @update:modelValue="onUpdate"
                />
              </div>
              <div class="row" v-if="filtersCriteria.copyNumberVariantFiltersCriteria.numberOfFilters">
                <u-filters-button-clear @click="filtersCriteria.copyNumberVariantFiltersCriteria.clear(); onUpdate();" />
              </div>
            </div>
          </q-tab-panel>

          <q-tab-panel v-if="showFilters('sv')" name="sv" class="q-pa-none">
            <div class="col q-gutter-y-sm">
              <div>
                <u-criteria-filters
                  v-if="filtersCriteria?.structuralVariantFiltersCriteria"
                  v-model="filtersCriteria.structuralVariantFiltersCriteria"
                  :context="filtersContext.structuralVariantFiltersContext"
                  :filters="structuralVariantFilters"
                  @update:modelValue="onUpdate"
                />
              </div>
              <div class="row" v-if="filtersCriteria.structuralVariantFiltersCriteria.numberOfFilters">
                <u-filters-button-clear @click="filtersCriteria.structuralVariantFiltersCriteria.clear(); onUpdate();" />
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </div>
</template>

<script>
import UFiltersButtonClear from "./FiltersButtonClear.vue";
import UOncogridFilters from "./analysis/oncogrid/OncoGridFilters.vue";
import filtersMixin from "./filters-mixin";

import FiltersCriteria from "./filters-criteria";
import FiltersContext from "./filters-context";

import UCriteriaFilters from "./CriteriaFilters.vue";
import donorFilters from "./domain/donors/donor-filters";
import tissueFilters from "./domain/specimens/tissues/tissue-filters";
import cellFilters from "./domain/specimens/cells/cell-filters";
import organoidFilters from "./domain/specimens/organoids/organoid-filters";
import xenograftFilters from "./domain/specimens/xenografts/xenograft-filters";
import geneFilters from "./domain/genome/genes/gene-filters";
import ssmFilters from "./domain/genome/variants/ssm/ssm-filters";
import cnvFilters from "./domain/genome/variants/cnv/cnv-filters";
import svFilters from "./domain/genome/variants/sv/sv-filters";
import mriFilters from "./domain/images/mris/mri-filters";

export default {
  components: {
    UCriteriaFilters,
    UFiltersButtonClear,
    UOncogridFilters
  },

  mixins: [filtersMixin],

  props: {
    category: {
      type: String,
      required: false,
      default: "donor"
    },

    mode: {
      type: String,
      required: false,
      default: "donor"
    }
  },

  emits: ["update:category", "close"],

  setup() {
    return {
      donorFilters: donorFilters,
      tissueFilters: tissueFilters,
      cellFilters: cellFilters,
      organoidFilters: organoidFilters,
      xenograftFilters: xenograftFilters,
      geneFilters: geneFilters,
      mutationFilters: ssmFilters,
      copyNumberVariantFilters: cnvFilters,
      structuralVariantFilters: svFilters,
      mriFilters: mriFilters
    }
  },

  data() {
    return {
      filtersCriteria: this.modelValue || new FiltersCriteria(),
      filtersContext: this.context || new FiltersContext(),
      filtersCategory: this.category
    };
  },

  computed: {
    title() {
      switch (this.filtersCategory) {
        case "donor": return "Donor Filters";
        case "tissue": return "Tissue Filters";
        case "cell": return "Cell Line Filters";
        case "organoid": return "Organoid Filters";
        case "xenograft": return "Xenograft Filters";
        case "gene": return "Gene Filters";
        case "ssm": return "SSM Filters";
        case "cnv": return "CNV Filters";
        case "sv": return "SV Filters";
        case "mri": return "MRI Filters";
        case "oncogrid": return "Oncogrid Filters";
        default: return "Filters";
      }
    }
  },

  watch: {
    modelValue(value) {
      this.filtersCriteria = value || new FiltersCriteria();
    },

    filtersCategory(value) {
      this.$emit('update:category', value);
    }
  },

  methods: {
    showFilters(category) {
      let general = ["donor", "gene"];
      let images = ["mri"];
      let specimens = ["tissue", "cell", "organoid", "xenograft"];
      let variants = ["ssm", "cnv", "sv"];
      switch (category) {
        case "donor": return true;
        case "mri": return [...general, "mri", ...variants, "tissue"].includes(this.mode);
        case "tissue": return [...general, "mri", "tissue", ...variants].includes(this.mode);
        case "cell": return [...general, "cell", ...variants].includes(this.mode);
        case "organoid": return [...general, "organoid", ...variants].includes(this.mode);
        case "xenograft": return [...general, "xenograft", ...variants].includes(this.mode);
        case "gene": return true;
        case "ssm": return [...general, ...specimens, ...images, "oncogrid", "ssm"].includes(this.mode);
        case "cnv": return [...general, ...specimens, ...images, "cnv"].includes(this.mode);
        case "sv": return [...general, ...specimens, ...images, "sv"].includes(this.mode);
        case "oncogrid": return ["oncogrid"].includes(this.mode);
        default: return false;
      }
    },

    getBadgeColor(filtersCategory) {
      return this.filtersCategory == filtersCategory
        ? "primary"
        : "grey-5";
    }
  }
}
</script>