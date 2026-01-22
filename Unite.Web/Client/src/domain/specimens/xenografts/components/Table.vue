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
          <u-link-xenograft :id="props.value" />
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
      return Settings.domain;
    },
    columns() {
      let columns = [];

      this.addSpecimenColumns(columns, (row) => row.xenograft, true);

      columns.push({
        name: "mouseStrain",
        label: "Mouse Strain",
        field: (row) => row.xenograft?.mouseStrain,
        sortable: false,
        align: "left"
      });

      columns.push({
        name: "groupSize",
        label: "Group Size",
        field: (row) => row.xenograft?.groupSize,
        sortable: false,
        align: "left"
      });

      columns.push({
        name: "tumorigenicity",
        label: "Tumorigenicity",
        field: (row) => this.$helpers.content.toBooleanString(row.xenograft?.tumorigenicity),
        sortable: false,
        align: "left"
      });

      columns.push({
        name: "tumorGrowthForm",
        label: "Tumor Growth Form",
        field: (row) => row.xenograft?.tumorGrowthForm,
        sortable: false,
        align: "left"
      });

      columns.push({
        name: "survivalDays",
        label: "Survival Days",
        field: (row) => row.xenograft?.survivalDays,
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
}
</script>