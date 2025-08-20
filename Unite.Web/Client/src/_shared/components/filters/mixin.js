import UCriteriaFilters from "./CriteriaFilters.vue";
import UFiltersButton from "./FiltersButton.vue";
import UFiltersButtonHide from "./FiltersButtonHide.vue";
import UFiltersButtonClear from "./FiltersButtonClear.vue";
import FiltersCriteria from "./filters-criteria";
import FiltersContext from "./filters-context";
import FilterModels from "./filter-models";
import donorFilters from "@/domain/donors/models/filters/donor-filters";
import donorDataFilters from "@/domain/donors/models/filters/donor-data-filters";
import mrFilters from "@/domain/images/mrs/models/filters/mr-filters";
import imageDataFilters from "@/domain/images/_shared/images/models/filters/image-data-filters";
import materialFilters from "@/domain/specimens/materials/models/filters/material-filters";
import lineFilters from "@/domain/specimens/lines/models/filters/line-filters";
import organoidFilters from "@/domain/specimens/organoids/models/filters/organoid-filters";
import xenograftFilters from "@/domain/specimens/xenografts/models/filters/xenograft-filters";
import specimenDataFilters from "@/domain/specimens/_shared/specimens/models/filters/specimen-data-filters";
import geneFilters from "@/domain/omics/genes/models/filters/gene-filters";
import smFilters from "@/domain/omics/variants/sms/models/filters/sm-filters";
import cnvFilters from "@/domain/omics/variants/cnvs/models/filters/cnv-filters";
import svFilters from "@/domain/omics/variants/svs/models/filters/sv-filters";

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
        case FilterModels.Mr: return "MR Filters";
        case FilterModels.Material: return "Material Filters";
        case FilterModels.Line: return "Cell Line Filters";
        case FilterModels.Organoid: return "Organoid Filters";
        case FilterModels.Xenograft: return "Xenograft Filters";
        case FilterModels.Gene: return "Gene Filters";
        case FilterModels.Sm: return "SM Filters";
        case FilterModels.Cnv: return "CNV Filters";
        case FilterModels.Sv: return "SV Filters";
        case FilterModels.Organoid: return "Oncogrid Filters";
        default: return "Filters";
      }
    },

    getIcon(model) {
      switch (model) {
        case FilterModels.Donor: return "las la-user-circle";
        case FilterModels.Mr: return "las la-x-ray";
        case FilterModels.Material: return "svguse:/icons.svg#u-material";
        case FilterModels.Line: return "las la-microscope";
        case FilterModels.Organoid: return "svguse:/icons.svg#u-organoid";
        case FilterModels.Xenograft: return "svguse:/icons.svg#u-xenograft";
        case FilterModels.Gene: return "svguse:/icons.svg#u-gene";
        case FilterModels.Sm: return "svguse:/icons.svg#u-sm";
        case FilterModels.Cnv: return "svguse:/icons.svg#u-cnv";
        case FilterModels.Sv: return "svguse:/icons.svg#u-sv";
        case FilterModels.Oncogrid: return "las la-th";
        default: return null;
      }
    },

    getFilters(model) {
      switch (model) {
        case FilterModels.Donor: return this.route == "donors" ? [...donorFilters, ...donorDataFilters] : donorFilters;
        case FilterModels.Mr: return this.route == "mrs" ? [...mrFilters, ...imageDataFilters] : mrFilters;
        case FilterModels.Material: return this.route == "materials" ? [...materialFilters, ...specimenDataFilters] : materialFilters;
        case FilterModels.Line: return this.route == "lines" ? [...lineFilters, ...specimenDataFilters] : lineFilters;
        case FilterModels.Organoid: return this.route == "organoids" ? [...organoidFilters, ...specimenDataFilters] : organoidFilters;
        case FilterModels.Xenograft: return this.route == "xenografts" ? [...xenograftFilters, ...specimenDataFilters] : xenograftFilters;
        case FilterModels.Gene: return geneFilters;
        case FilterModels.Sm: return smFilters;
        case FilterModels.Cnv: return cnvFilters;
        case FilterModels.Sv: return svFilters;
        default: return null;
      }
    },

    getBadgeColor(model) {
      return this.filtersModel == model ? "primary" : "grey-5";
    }
  }
};

export default mixin;