<template>
  <div class="col">
    <u-data-table
      :class="class"
      :title="title"
      :loading="loading"
      :scope="scope"
      :columns="columns"
      :rows="rows"
      :rows-total="rowsTotal"
      v-model:rows-selected="dataSelected"
      v-model:from="dataFrom"
      v-model:size="dataSize">
      <template v-slot:header-left>
        <slot name="header-left">
        </slot>
      </template>
      
      <template v-slot:header-right>
        <slot name="header-right">
        </slot>
      </template>

      <template v-slot:body-cell-id="props">
        <q-td :props="props">
          <u-link-mri :id="props.value" />
        </q-td>
      </template>

      <template v-slot:body-cell-donorId="props">
        <q-td :props="props">
          <u-link-donor :id="props.value" />
        </q-td>
      </template>
    </u-data-table>
  </div>
</template>

<script>
import UDataTable from "@/_shared/components/table/DataTable.vue";
import tableCellsDataMixin from "@/domain/_shared/entries/components/table-cells-data-mixin";
import tableMixin from "@/domain/_shared/entries/components/table-mixin";

export default {
  components: {
    UDataTable
  },

  mixins: [tableMixin, tableCellsDataMixin],

  computed: {
    scope() {
      return "mris";
    },
    
    columns() {
      var columns = [];

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
        label: "Reference ID",
        field: (row) => row.mri?.referenceId,
        sortable: false,
        align: "left",
        show: false
      });

      if (!["donor", "material"].includes(this.$route.name)) {
        columns.push({
          name: "donorId",
          label: "Donor ID",
          field: (row) => row.donorId,
          sortable: false,
          align: "left"
        });
      }

      columns.push({
        name: "wholeTumor",
        label: "Whole Tumor (cm³)",
        field: (row) => row.mri?.wholeTumor?.toFixed(3),
        sortable: false
      });

      columns.push({
        name: "contrastEnhancing",
        label: "Contrast Enhancing (cm³)",
        field: (row) => row.mri?.contrastEnhancing?.toFixed(3),
        sortable: false
      });

      columns.push({
        name: "nonContrastEnhancing",
        label: "Non Contrast Enhancing (cm³)",
        field: (row) => row.mri?.nonContrastEnhancing?.toFixed(3),
        sortable: false
      });

      columns.push({
        name: "medianAdcCe",
        label: "Median ADC CE",
        field: (row) => row.mri?.medianAdcCe?.toFixed(3),
        sortable: false,
        align: "right",
        show: false
      });

      columns.push({
        name: "medianAdcEdema",
        label: "Median ADC Edema",
        field: (row) => row.mri?.medianAdcEdema?.toFixed(3),
        sortable: false,
        align: "right",
        show: false
      });

      columns.push({
        name: "medianAdcTumor",
        label: "Median ADC Tumor",
        field: (row) => row.mri?.medianAdcTumor?.toFixed(3),
        sortable: false,
        align: "right",
        show: false
      });

      columns.push({
        name: "medianCbfCe",
        label: "Median CBF CE",
        field: (row) => row.mri?.medianCbfCe?.toFixed(3),
        sortable: false,
        align: "right",
        show: false
      });

      columns.push({
        name: "medianCbfEdema",
        label: "Median CBF Edema",
        field: (row) => row.mri?.medianCbfEdema?.toFixed(3),
        sortable: false,
        align: "right",
        show: false
      });

      columns.push({
        name: "medianCbfTumor",
        label: "Median CBF Tumor",
        field: (row) => row.mri?.medianCbfTumor?.toFixed(3),
        sortable: false,
        align: "right",
        show: false
      });

      columns.push({
        name: "medianMttCe",
        label: "Median MTT CE",
        field: (row) => row.mri?.medianMttCe?.toFixed(3),
        sortable: false,
        align: "right",
        show: false
      });

      columns.push({
        name: "medianMttEdema",
        label: "Median MTT Edema",
        field: (row) => row.mri?.medianMttEdema?.toFixed(3),
        sortable: false,
        align: "right",
        show: false
      });

      columns.push({
        name: "medianMttTumor",
        label: "Median MTT Tumor",
        field: (row) => row.mri?.medianMttTumor?.toFixed(3),
        sortable: false,
        align: "right",
        show: false
      });

      if (["mris"].includes(this.$route.name)){
        columns.push({
          name: "hasSsms",
          label: "SSM",
          field: (row) => this.dataView(row.data.ssms),
          sortable: false,
          align: "center",
          classes: (row) => this.dataCellClass(row.data.ssms),
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
          name: "hasGeneExp",
          label: "RNA",
          field: (row) => this.dataView(row.data.geneExp),
          sortable: false,
          align: "center",
          classes: (row) => this.dataCellClass(row.data.geneExp),
          headerClasses: this.dataHeaderClass()
        });
      }

      if (["mris"].includes(this.$route.name)){
        columns.push({
          name: "numberOfGenes",
          label: "#Genes",
          field: (row) => row.numberOfGenes?.toLocaleString(),
          sortable: false
        });
        
        columns.push({
          name: "numberOfSsms",
          label: "#SSMs",
          field: (row) => row.numberOfSsms?.toLocaleString(),
          sortable: false
        });

        columns.push({
          name: "numberOfCnvs",
          label: "#CNVs",
          field: (row) => row.numberOfCnvs?.toLocaleString(),
          sortable: false
        });

        columns.push({
          name: "numberOfSvs",
          label: "#SVs",
          field: (row) => row.numberOfSvs?.toLocaleString(),
          sortable: false
        }); 
      }

      return columns;
    }
  }
};
</script>