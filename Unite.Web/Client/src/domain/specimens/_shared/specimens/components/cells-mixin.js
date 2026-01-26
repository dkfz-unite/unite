const specimensTableMixin = {
  data() {
    return {
      molecularDataColumns: [

      ]
    };
  },
  methods: {
    addSpecimenColumns(columns = [], selector = (row) => row, showParent = false) {
      columns.push({
        name: "id",
        label: "ID",
        field: (row) => row.id,
        sortable: false,
        required: true,
        align: "left"
      });

      columns.push({
        name: "referenceId",
        label: "External ID",
        field: (row) => row.referenceId,
        sortable: false,
        align: "left",
        show: false
      });

      columns.push({
        name: "donorId",
        label: "Donor ID",
        field: (row) => row.donorId,
        sortable: false,
        align: "left"
      });

      columns.push({
        name: "parentId",
        label: "Parent ID",
        field: (row) => row,
        sortable: false,
        align: "left",
        show: showParent
      });

      columns.push({
        name: "parentType",
        label: "Parent Type",
        field: (row) => this.getSpecimenTypeName(row.parentType),
        sortable: false,
        align: "left",
        show: showParent
      });

      columns.push({
        name: "category",
        label: "Category",
        field: (row) => selector(row)?.category,
        sortable: false,
        align: "left"
      });

      columns.push({
        name: "tumorType",
        label: "Tumor Type",
        field: (row) => selector(row)?.tumorType,
        sortable: false,
        align: "left"
      });

      columns.push({
        name: "tumorGrade",
        label: "Tumor Grade",
        field: (row) => selector(row)?.tumorGrade,
        sortable: false,
        align: "left",
        show: false
      });
    },

    addMolecularDataColumns(columns = []) {
      columns.push({
        name: "mgmt",
        label: "MGMT",
        field: (row) => this.getMgmt(row.molecularData?.mgmtStatus),
        sortable: false,
        align: "left",
        show: false
      });

      columns.push({
        name: "idh",
        label: "IDH",
        field: (row) => this.getIdh(row.molecularData?.idhStatus, row.molecularData?.idhMutation),
        sortable: false,
        align: "left",
        show: false
      });

      columns.push({
        name: "tert",
        label: "TERT",
        field: (row) => this.getTert(row.molecularData?.tertStatus, row.molecularData?.tertMutation),
        sortable: false,
        align: "left",
        show: false
      });

      columns.push({
        name: "expressionSubtype",
        label: "Expression Subtype",
        field: (row) => row.molecularData?.expressionSubtype,
        sortable: false,
        align: "left",
        show: false
      });

      columns.push({
        name: "methylationSubtype",
        label: "Methylation Subtype",
        field: (row) => row.molecularData?.methylationSubtype,
        sortable: false,
        align: "left",
        show: false
      });

      columns.push({
        name: "gCimpMethylation",
        label: "G-CIMP Methylation",
        field: (row) => this.$helpers.content.toBooleanString(row.molecularData?.gcimpMethylation),
        sortable: false,
        align: "left",
        show: false
      });

      columns.push({
        name: "geneKnockouts",
        label: "Gene Knockouts",
        field: (row) => row.molecularData?.geneKnockouts?.join(", "),
        sortable: false,
        align: "left",
        show: false
      });
    },

    addTumorClassificationColumns(columns = []) {
      columns.push({
        name: "tumorSuperfamily",
        label: "Tumor Superfamily",
        field: (row) => row.tumorClassification?.superfamily,
        sortable: false,
        align: "left",
        show: false
      });

      columns.push({
        name: "tumorFamily",
        label: "Tumor Family",
        field: (row) => row.tumorClassification?.family,
        sortable: false,
        align: "left",
        show: false
      });

      columns.push({
        name: "tumorClass",
        label: "Tumor Class",
        field: (row) => row.tumorClassification?.class,
        sortable: false,
        align: "left",
        show: false
      });

      columns.push({
        name: "tumorSubclass",
        label: "Tumor Subclass",
        field: (row) => row.tumorClassification?.subclass,
        sortable: false,
        align: "left",
        show: false
      });
    },

    addAvailableDataColumns(columns = []) {
      columns.push({
        name: "hasSms",
        label: "SM",
        field: (row) => this.dataView(row.data.sms),
        sortable: false,
        align: "center",
        classes: (row) => this.dataCellClass(row.data.sms),
        headerClasses: this.dataHeaderClass()
      });

      columns.push({
        name: "hasCnvs",
        label: "CNV",
        field: (row) => this.dataView(row.data.cnvs),
        sortable: false,
        align: "center",
        classes: (row) => this.dataCellClass(row.data.cnvs),
        headerClasses: this.dataHeaderClass()
      });

      columns.push({
        name: "hasSvs",
        label: "SV",
        field: (row) => this.dataView(row.data.svs),
        sortable: false,
        align: "center",
        classes: (row) => this.dataCellClass(row.data.svs),
        headerClasses: this.dataHeaderClass()
      });

      columns.push({
        name: "hasMeth",
        label: "Meth",
        field: (row) => this.dataView(row.data.meth),
        sortable: false,
        align: "center",
        classes: (row) => this.dataCellClass(row.data.meth),
        headerClasses: this.dataHeaderClass()
      });

      columns.push({
        name: "hasExp",
        label: "RNA",
        field: (row) => this.dataView(row.data.exp),
        sortable: false,
        align: "center",
        classes: (row) => this.dataCellClass(row.data.exp),
        headerClasses: this.dataHeaderClass()
      });

      columns.push({
        name: "hasExpSc",
        label: "scRNA",
        field: (row) => this.dataView(row.data.expSc),
        sortable: false,
        align: "center",
        classes: (row) => this.dataCellClass(row.data.expSc),
        headerClasses: this.dataHeaderClass()
      });
    },

    addStatsColumns(columns = []) {
      columns.push({
        name: "numberOfGenes",
        label: "#Genes",
        field: (row) => row.stats?.genes?.toLocaleString(),
        sortable: false
      });

      columns.push({
        name: "numberOfSms",
        label: "#SMs",
        field: (row) => row.stats?.sms?.toLocaleString(),
        sortable: false
      });

      columns.push({
        name: "numberOfCnvs",
        label: "#CNVs",
        field: (row) => row.stats?.cnvs?.toLocaleString(),
        sortable: false
      });

      columns.push({
        name: "numberOfSVs",
        label: "#SVs",
        field: (row) => row.stats?.svs?.toLocaleString(),
        sortable: false
      });
    },

    getSpecimenType(type) {
      switch (type) {
        case "Material": return "material";
        case "Line": return "line";
        case "Organoid": return "organoid";
        case "Xenograft": return "xenograft";
        default: return null;
      }
    },

    getSpecimenTypeName(type) {
      switch (type) {
        case "Material": return "Material";
        case "Line": return "Cell Line";
        case "Organoid": return "Organoid";
        case "Xenograft": return "Xenograft";
      }
    },

    getMgmt(mgmtStatus) {
      return this.$helpers.content.toBooleanString(mgmtStatus, "Methylated", "Unmethylated");
    },

    getIdh(idhStatus, idhMutation) {
      return !!idhMutation ? idhMutation : this.$helpers.content.toBooleanString(idhStatus, "Mutant", "wild Type");
    },

    getTert(tertStatus, tertMutation) {
      return !!tertMutation ? tertMutation : this.$helpers.content.toBooleanString(tertStatus, "Mutant", "Wild Type");
    }
  }
}

export default specimensTableMixin;