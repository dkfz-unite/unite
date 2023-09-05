import FilterType from "@/_shared/components/filters/filter-type";

const filters = [
  {
    group: "variants",
    label: "Variants",
    filters: [
      {
        field: "hasMutations",
        label: "Has SSMs",
        type: FilterType.Boolean,
        nullable: false,
      },
      {
        field: "hasCopyNumberVariants",
        label: "Has CNVs",
        type: FilterType.Boolean,
        nullable: false,
      },
      {
        field: "hasStructuralVariants",
        label: "Has SVs",
        type: FilterType.Boolean,
        nullable: false,
      }
    ]
  }
];

export default filters;