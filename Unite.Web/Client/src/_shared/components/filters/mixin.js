import UCriteriaFilters from "./CriteriaFilters.vue";
import UFiltersButton from "./FiltersButton.vue";
import UFiltersButtonHide from "./FiltersButtonHide.vue";
import UFiltersButtonClear from "./FiltersButtonClear.vue";

import FiltersCriteria from "./filters-criteria";
import FiltersContext from "./filters-context";
import donorFilters from "./domain/donors/donor-filters";
import donorDataFilters from "./domain/donors/donor-data-filters";
import mriFilters from "./domain/images/mris/mri-filters";
import imageDataFilters from "./domain/images/image-data-filters";
import tissueFilters from "./domain/specimens/tissues/tissue-filters";
import cellFilters from "./domain/specimens/cells/cell-filters";
import organoidFilters from "./domain/specimens/organoids/organoid-filters";
import xenograftFilters from "./domain/specimens/xenografts/xenograft-filters";
import specimenDataFilters from "./domain/specimens/specimen-data-filters";
import geneFilters from "./domain/genome/genes/gene-filters";
import ssmFilters from "./domain/genome/variants/ssm/ssm-filters";
import cnvFilters from "./domain/genome/variants/cnv/cnv-filters";
import svFilters from "./domain/genome/variants/sv/sv-filters";
import oncogridFilters from "./analysis/oncogrid/oncogrid-filters";

const models = ["donor", "mri", "tissue", "cell", "organoid", "xenograft", "gene", "ssm", "cnv", "sv", "oncogrid"];

const mixin = {
  components: {
    UCriteriaFilters,
    UFiltersButton,
    UFiltersButtonHide,
    UFiltersButtonClear
  },

  props: {
    criteria: {
      type: Object,
      required: false
    },

    context: {
      type: Object,
      required: false
    },

    model: {
      type: String,
      required: true,
      validator: value => models.includes(value)
    },

    models: {
      type: Array,
      required: true,
      validator: value => value.every(v => models.includes(v))
    },
  },

  emits: ["update:model", "update", "open", "hide"],

  data() {
    return {
      filtersCriteria: this.criteria || new FiltersCriteria(),
      filtersContext: this.context || new FiltersContext(),
      filtersModel: this.model,
      route: this.$route.name
    };
  },

  updated() {
    this.filtersCriteria = this.criteria || new FiltersCriteria();
    this.filtersContext = this.context || new FiltersContext();
    this.filtersModel = this.model;
  },

  watch: {
    filtersModel(value) {
      this.$emit('update:model', value);
    }
  },

  methods: {
    onUpdate(value) {
      this.$emit("update");
    },

    getTitle(model) {
      switch (model) {
        case "donor": return "Donor Filters";
        case "mri": return "MRI Filters";
        case "tissue": return "Tissue Filters";
        case "cell": return "Cell Line Filters";
        case "organoid": return "Organoid Filters";
        case "xenograft": return "Xenograft Filters";
        case "gene": return "Gene Filters";
        case "ssm": return "SSM Filters";
        case "cnv": return "CNV Filters";
        case "sv": return "SV Filters";
        case "oncogrid": return "Oncogrid Filters";
        default: return "Filters";
      }
    },

    getIcon(model) {
      switch (model) {
        case "donor": return "las la-user-circle";
        case "mri": return "las la-x-ray";
        case "tissue": return "svguse:/icons.svg#u-tissue";
        case "cell": return "las la-microscope";
        case "organoid": return "svguse:/icons.svg#u-organoid";
        case "xenograft": return "svguse:/icons.svg#u-xenograft";
        case "gene": return "svguse:/icons.svg#u-gene";
        case "ssm": return "svguse:/icons.svg#u-ssm";
        case "cnv": return "svguse:/icons.svg#u-cnv";
        case "sv": return "svguse:/icons.svg#u-sv";
        case "oncogrid": return "las la-th";
        default: return null;
      }
    },

    getFilters(model) {
      switch (model) {
        case "donor": return this.route == "donors" ? [...donorFilters, ...donorDataFilters] : donorFilters;
        case "mri": return this.route == "mris" ? [...mriFilters, ...imageDataFilters] : mriFilters;
        case "tissue": return this.route == "tissues" ? [...tissueFilters, ...specimenDataFilters] : tissueFilters;
        case "cell": return this.route == "cells" ? [...cellFilters, ...specimenDataFilters] : cellFilters;
        case "organoid": return this.route == "organoids" ? [...organoidFilters, ...specimenDataFilters] : organoidFilters;
        case "xenograft": return this.route == "xenografts" ? [...xenograftFilters, ...specimenDataFilters] : xenograftFilters;
        case "gene": return geneFilters;
        case "ssm": return ssmFilters;
        case "cnv": return cnvFilters;
        case "sv": return svFilters;
        case "oncogrid": return oncogridFilters;
        default: return null;
      }
    },

    getBadgeColor(model) {
      return this.filtersModel == model ? "primary" : "grey-5";
    }
  }
};

export default mixin;