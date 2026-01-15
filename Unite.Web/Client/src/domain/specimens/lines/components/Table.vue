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
          <u-link-line :id="props.value" />
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
import tableCellsSpecimenMixin from "../../_shared/specimens/components/cells-mixin";

import Settings from "../settings";

export default {
  components: {
    UDataTable
  },

  mixins: [tableMixin, tableCellsDataMixin, tableCellsSpecimenMixin],   

  computed: {
    scope() {
      return "lines";
    },
    columns() {
      let columns = [];

      this.addSpecimenColumns(columns, (row) => row.line, true);

      columns.push({
        name: "species",
        label: "Species",
        field: (row) => row.line?.cellsSpecies,
        sortable: false,
        align: "left"
      });

      columns.push({
        name: "type",
        label: "Type",
        field: (row) => row.line?.cellsType,
        sortable: false,
        align: "left"
      });

      columns.push({
        name: "cultureType",
        label: "Culture Type",
        field: (row) => row.line?.cellsCultureType,
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