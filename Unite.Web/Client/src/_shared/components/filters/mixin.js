import UCriteriaFilters from "./CriteriaFilters.vue";
import UFiltersButton from "./FiltersButton.vue";
import UFiltersButtonHide from "./FiltersButtonHide.vue";
import UFiltersButtonClear from "./FiltersButtonClear.vue";
import FiltersCriteria from "./filters-criteria";
import FiltersContext from "./filters-context";
import FilterModels from "./filter-models";
import donorFilters from "@/domain/donors/filters/donor-filters";
import donorDataFilters from "@/domain/donors/filters/donor-data-filters";
import mriFilters from "@/domain/images/mris/filters/mri-filters";
import imageDataFilters from "@/domain/images/_shared/filters/image-data-filters";
import materialFilters from "@/domain/specimens/materials/filters/material-filters";
import lineFilters from "@/domain/specimens/lines/filters/line-filters";
import organoidFilters from "@/domain/specimens/organoids/filters/organoid-filters";
import xenograftFilters from "@/domain/specimens/xenografts/filters/xenograft-filters";
import specimenDataFilters from "@/domain/specimens/_shared/filters/specimen-data-filters";
import geneFilters from "@/domain/genome/genes/filters/gene-filters";
import ssmFilters from "@/domain/genome/variants/ssms/filters/ssm-filters";
import cnvFilters from "@/domain/genome/variants/cnvs/filters/cnv-filters";
import svFilters from "@/domain/genome/variants/svs/filters/sv-filters";
import oncogridFilters from "@/visualization/oncogrid/filters/oncogrid-filters";

const models = FilterModels.All;

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
      validator: value =>  value.every(v => models.includes(v))
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
        case FilterModels.Donor: return "Donor Filters";
        case FilterModels.Mri: return "MRI Filters";
        case FilterModels.Tissue: return "Material Filters";
        case FilterModels.Cell: return "Cell Line Filters";
        case FilterModels.Organoid: return "Organoid Filters";
        case FilterModels.Xenograft: return "Xenograft Filters";
        case FilterModels.Gene: return "Gene Filters";
        case FilterModels.Ssm: return "SSM Filters";
        case FilterModels.Cnv: return "CNV Filters";
        case FilterModels.Sv: return "SV Filters";
        case FilterModels.Organoid: return "Oncogrid Filters";
        default: return "Filters";
      }
    },

    getIcon(model) {
      switch (model) {
        case FilterModels.Donor: return "las la-user-circle";
        case FilterModels.Mri: return "las la-x-ray";
        case FilterModels.Tissue: return "svguse:/icons.svg#u-tissue";
        case FilterModels.Cell: return "las la-microscope";
        case FilterModels.Organoid: return "svguse:/icons.svg#u-organoid";
        case FilterModels.Xenograft: return "svguse:/icons.svg#u-xenograft";
        case FilterModels.Gene: return "svguse:/icons.svg#u-gene";
        case FilterModels.Ssm: return "svguse:/icons.svg#u-ssm";
        case FilterModels.Cnv: return "svguse:/icons.svg#u-cnv";
        case FilterModels.Sv: return "svguse:/icons.svg#u-sv";
        case FilterModels.Oncogrid: return "las la-th";
        default: return null;
      }
    },

    getFilters(model) {
      switch (model) {
        case FilterModels.Donor: return this.route == "donors" ? [...donorFilters, ...donorDataFilters] : donorFilters;
        case FilterModels.Mri: return this.route == "mris" ? [...mriFilters, ...imageDataFilters] : mriFilters;
        case FilterModels.Tissue: return this.route == "tissues" ? [...materialFilters, ...specimenDataFilters] : materialFilters;
        case FilterModels.Cell: return this.route == "cells" ? [...lineFilters, ...specimenDataFilters] : lineFilters;
        case FilterModels.Organoid: return this.route == "organoids" ? [...organoidFilters, ...specimenDataFilters] : organoidFilters;
        case FilterModels.Xenograft: return this.route == "xenografts" ? [...xenograftFilters, ...specimenDataFilters] : xenograftFilters;
        case FilterModels.Gene: return geneFilters;
        case FilterModels.Ssm: return ssmFilters;
        case FilterModels.Cnv: return cnvFilters;
        case FilterModels.Sv: return svFilters;
        case FilterModels.Oncogrid: return oncogridFilters;
        default: return null;
      }
    },

    getBadgeColor(model) {
      return this.filtersModel == model ? "primary" : "grey-5";
    }
  }
};

export default mixin;