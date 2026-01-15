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
          <u-link-organoid :id="props.value" />
        </q-td>
      </template>

      <template v-slot:body-cell-donorId="props">
        <q-td :props="props">
          <u-link-donor :id="props.value" />
        </q-td>
      </template>

      <template v-slot:body-cell-parentId="props">
        <q-td :props="props">
          <u-link-specimen v-if="props.value.parentId" :id="props.value.parentId" :type="props.value.parentType" />
        </q-td>
      </template>
    </u-data-table>
  </div>
</template>

<script>
import UDataTable from "@/_shared/components/table/DataTable.vue";
import tableMixin from "@/domain/_shared/entries/components/table-mixin";
import tableCellsDataMixin from "@/domain/_shared/entries/components/table-cells-data-mixin";
import tableCellsSpecimensMixin from "../../_shared/specimens/components/cells-mixin";

import Settings from "../settings";

export default {
  components: {
    UDataTable
  },
  
  mixins: [tableMixin, tableCellsDataMixin, tableCellsSpecimensMixin],

  computed: {
    scope() {
      return Settings.domain;
    },
    
    columns() {
      let columns = [];

      this.addSpecimenColumns(columns, (row) => row.organoid, true);

      // columns.push({
      //   name: "id",
      //   label: "ID",
      //   field: (row) => row.id,
      //   sortable: false,
      //   required: true,
      //   align: "left"
      // });

      // columns.push({
      //   name: "referenceId",
      //   label: "External ID",
      //   field: (row) => row.referenceId,
      //   sortable: false,
      //   align: "left",
      //   show: false
      // });

      // columns.push({
      //   name: "donorId",
      //   label: "Donor ID",
      //   field: (row) => row.donorId,
      //   sortable: false,
      //   align: "left"
      // });

      // columns.push({
      //   name: "parentId",
      //   label: "Parent ID",
      //   field: (row) => row,
      //   sortable: false,
      //   align: "left"
      // });

      // columns.push({
      //   name: "parentType",
      //   label: "Parent Type",
      //   field: (row) => this.getSpecimenTypeName(row.parentType),
      //   sortable: false,
      //   align: "left"
      // });

      columns.push({
        name: "implantedCells",
        label: "#Implanted Cells",
        field: (row) => row.organoid?.implantedCellsNumber,
        sortable: false,
        align: "left"
      });

      columns.push({
        name: "medium",
        label: "Medium",
        field: (row) => row.organoid?.medium,
        sortable: false,
        align: "left"
      });

      columns.push({
        name: "tumorigenicity",
        label: "Tumorigenicity",
        field: (row) => this.$helpers.content.toBooleanString(row.organoid?.tumorigenicity),
        sortable: false,
        align: "left"
      });

      this.addTumorClassificationColumns(columns);

      this.addMolecularDataColumns(columns);

      if ([Settings.domain].includes(this.$route.name))
        this.addAvailableDataColumns(columns);

      this.addStatsColumns(columns);

      return columns;
    }
  }
};
</script>