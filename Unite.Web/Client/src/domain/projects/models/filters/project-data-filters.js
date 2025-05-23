import FilterType from "@/_shared/components/filters/filter-type";

const filters = [
  {
    group: "data",
    label: "Available Data",
    expand: false,
    filters: [
      {
        field: "hasSms",
        label: "SM",
        type: FilterType.Boolean,
        nullable: true
      },
      {
        field: "hasCnvs",
        label: "CNV",
        type: FilterType.Boolean,
        nullable: true
      },
      {
        field: "hasSvs",
        label: "SV",
        type: FilterType.Boolean,
        nullable: true
      },
      {
        field: "hasExp",
        label: "RNA",
        type: FilterType.Boolean,
        nullable: true
      },
      {
        field: "hasExpSc",
        label: "scRNA",
        type: FilterType.Boolean,
        nullable: true
      }
    ]
  }
];

export default filters;