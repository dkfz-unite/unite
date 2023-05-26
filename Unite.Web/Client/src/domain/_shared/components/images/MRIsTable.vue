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
      <template v-slot:header-right>
        <slot name="header-right">
        </slot>
      </template>

      <template v-slot:body-cell-id="props">
        <q-td :props="props">
          <u-image-link :id="props.value" type="mri" />
        </q-td>
      </template>

      <template v-slot:body-cell-donorId="props">
        <q-td :props="props">
          <u-donor-link :id="props.value" />
        </q-td>
      </template>
    </u-data-table>
  </div>
</template>

<script>
import UDataTable from "@/_shared/components/table/DataTable.vue";
import UImageLink from "@/_shared/components/ImageLink.vue";
import UDonorLink from "@/_shared/components/DonorLink.vue";
import tableMixin from "@/domain/_shared/table-mixin";

export default {
  components: {
    UDataTable,
    UImageLink,
    UDonorLink
  },

  mixins: [tableMixin],

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
        field: (row) => row.mriImage?.referenceId,
        sortable: false,
        align: "left",
        show: false
      });

      if (!["donor", "tissue"].includes(this.$route.name)) {
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
        field: (row) => row.mriImage?.wholeTumor?.toFixed(3),
        sortable: false
      });

      columns.push({
        name: "contrastEnhancing",
        label: "Contrast Enhancing (cm³)",
        field: (row) => row.mriImage?.contrastEnhancing?.toFixed(3),
        sortable: false
      });

      columns.push({
        name: "nonContrastEnhancing",
        label: "Non Contrast Enhancing (cm³)",
        field: (row) => row.mriImage?.nonContrastEnhancing?.toFixed(3),
        sortable: false
      });

      columns.push({
        name: "medianAdcCe",
        label: "Median ADC CE",
        field: (row) => row.mriImage?.medianAdcCe?.toFixed(3),
        sortable: false,
        align: "right",
        show: false
      });

      columns.push({
        name: "medianAdcEdema",
        label: "Median ADC Edema",
        field: (row) => row.mriImage?.medianAdcEdema?.toFixed(3),
        sortable: false,
        align: "right",
        show: false
      });

      columns.push({
        name: "medianAdcTumor",
        label: "Median ADC Tumor",
        field: (row) => row.mriImage?.medianAdcTumor?.toFixed(3),
        sortable: false,
        align: "right",
        show: false
      });

      columns.push({
        name: "medianCbfCe",
        label: "Median CBF CE",
        field: (row) => row.mriImage?.medianCbfCe?.toFixed(3),
        sortable: false,
        align: "right",
        show: false
      });

      columns.push({
        name: "medianCbfEdema",
        label: "Median CBF Edema",
        field: (row) => row.mriImage?.medianCbfEdema?.toFixed(3),
        sortable: false,
        align: "right",
        show: false
      });

      columns.push({
        name: "medianCbfTumor",
        label: "Median CBF Tumor",
        field: (row) => row.mriImage?.medianCbfTumor?.toFixed(3),
        sortable: false,
        align: "right",
        show: false
      });

      columns.push({
        name: "medianMttCe",
        label: "Median MTT CE",
        field: (row) => row.mriImage?.medianMttCe?.toFixed(3),
        sortable: false,
        align: "right",
        show: false
      });

      columns.push({
        name: "medianMttEdema",
        label: "Median MTT Edema",
        field: (row) => row.mriImage?.medianMttEdema?.toFixed(3),
        sortable: false,
        align: "right",
        show: false
      });

      columns.push({
        name: "medianMttTumor",
        label: "Median MTT Tumor",
        field: (row) => row.mriImage?.medianMttTumor?.toFixed(3),
        sortable: false,
        align: "right",
        show: false
      });

      return columns;
    }
  }
};
</script>