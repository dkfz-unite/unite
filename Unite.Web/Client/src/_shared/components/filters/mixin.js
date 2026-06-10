import UCriteriaFilters from "./CriteriaFilters.vue";
import UFiltersButton from "./FiltersButton.vue";
import UFiltersButtonHide from "./FiltersButtonHide.vue";
import UFiltersButtonClear from "./FiltersButtonClear.vue";
import FiltersCriteria from "./filters-criteria";
import FiltersContext from "./filters-context";
import FilterModels from "./filter-models";
import dataFilters from "@/domain/_shared/entries/models/filters/data-filters";
import donorFilters from "@/domain/donors/models/filters/donor-filters";
import mrFilters from "@/domain/images/mrs/models/filters/mr-filters";
import materialFilters from "@/domain/specimens/materials/models/filters/material-filters";
import lineFilters from "@/domain/specimens/lines/models/filters/line-filters";
import organoidFilters from "@/domain/specimens/organoids/models/filters/organoid-filters";
import xenograftFilters from "@/domain/specimens/xenografts/models/filters/xenograft-filters";
import geneFilters from "@/domain/omics/genes/models/filters/gene-filters";
import proteinFilters from "@/domain/omics/proteins/models/filters/protein-filters";
import smFilters from "@/domain/omics/variants/sms/models/filters/sm-filters";
import cnvFilters from "@/domain/omics/variants/cnvs/models/filters/cnv-filters";
import svFilters from "@/domain/omics/variants/svs/models/filters/sv-filters";
import cnvProfileFilters from "@/domain/omics/variants/cnvProfiles/models/filters/cnv-profile-filters";

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

  emits: ["update:model", "update", "filter", "open", "hide"],

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

    onFilter(value) {
      this.$emit("filter", { ...value, model: this.filtersModel });
      // console.log({ ...value, model: this.filtersModel });
      value.event.abort();
    },

    // TODO: Reuse dedicated domain title settings.
    getTitle(model) {
      switch (model) {
        case FilterModels.Donor: return "Donor Filters";
        case FilterModels.Mr: return "MR Filters";
        case FilterModels.Material: return "Material Filters";
        case FilterModels.Line: return "Cell Line Filters";
        case FilterModels.Organoid: return "Organoid Filters";
        case FilterModels.Xenograft: return "Xenograft Filters";
        case FilterModels.Gene: return "Gene Filters";
        case FilterModels.Protein: return "Protein Filters";
        case FilterModels.Sm: return "SM Filters";
        case FilterModels.Cnv: return "CNV Filters";
        case FilterModels.Sv: return "SV Filters";
        case FilterModels.Organoid: return "Oncogrid Filters";
        case FilterModels.CnvProfile: return "CNV Profile Filters";
        default: return "Filters";
      }
    },

    // TODO: Reuse dedicated domain icon settings.
    getIcon(model) {
      switch (model) {
        case FilterModels.Donor: return "las la-user-circle";
        case FilterModels.Mr: return "las la-x-ray";
        case FilterModels.Material: return "svguse:/icons.svg#u-material";
        case FilterModels.Line: return "las la-microscope";
        case FilterModels.Organoid: return "svguse:/icons.svg#u-organoid";
        case FilterModels.Xenograft: return "svguse:/icons.svg#u-xenograft";
        case FilterModels.Gene: return "svguse:/icons.svg#u-gene";
        case FilterModels.Protein: return "svguse:/icons.svg#u-protein";
        case FilterModels.Sm: return "svguse:/icons.svg#u-sm";
        case FilterModels.Cnv: return "svguse:/icons.svg#u-cnv";
        case FilterModels.Sv: return "svguse:/icons.svg#u-sv";
        case FilterModels.Oncogrid: return "las la-th";
        case FilterModels.CnvProfile: return "svguse:/icons.svg#u-cnvp";
        default: return null;
      }
    },

    // TODO: Define filters in settings so this mixin is not needed.
    getFilters(model) {
      switch (model) {
        case FilterModels.Donor: return this.route == "donors" ? [...donorFilters, ...dataFilters] : donorFilters;
        case FilterModels.Mr: return this.route == "mrs" ? [...mrFilters, ...dataFilters] : mrFilters;
        case FilterModels.Material: return this.route == "materials" ? [...materialFilters, ...dataFilters] : materialFilters;
        case FilterModels.Line: return this.route == "lines" ? [...lineFilters, ...dataFilters] : lineFilters;
        case FilterModels.Organoid: return this.route == "organoids" ? [...organoidFilters, ...dataFilters] : organoidFilters;
        case FilterModels.Xenograft: return this.route == "xenografts" ? [...xenograftFilters, ...dataFilters] : xenograftFilters;
        case FilterModels.Gene: return geneFilters;
        case FilterModels.Protein: return proteinFilters;
        case FilterModels.Sm: return smFilters;
        case FilterModels.Cnv: return cnvFilters;
        case FilterModels.Sv: return svFilters;
        case FilterModels.CnvProfile: return cnvProfileFilters;
        default: return null;
      }
    },

    getBadgeColor(model) {
      return this.filtersModel == model ? "primary" : "grey-5";
    }
  }
};

export default mixin;