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
      v-model:size="dataSize"
      selection="none">
      <template v-slot:header-left>
        <slot name="header-left">
        </slot>
      </template>

      <template v-slot:header-right>
        <slot name="header-right">
        </slot>
      </template>

      <template v-slot:header="props">
        <!-- Header groups row -->
        <q-tr :props="props">
          <!-- No group -->
          <q-th colspan="3"></q-th>
          <!-- Donors -->
          <q-th colspan="30" title="Number of donors with specified data">#Donors / Total</q-th>
        </q-tr>

        <!-- Headers row -->
        <q-tr :props="props">
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body-cell-name="props">
        <q-td :props="props">
          <u-link-project :id="props.value.id">{{ props.value.name }}</u-link-project>
        </q-td>
      </template>
    </u-data-table>
  </div>
</template>

<script>
import UDataTable from "@/_shared/components/table/DataTable.vue";
import tableMixin from "@/domain/_shared/entries/components/table-mixin";
import talbeCellsDataMixin from "@/domain/_shared/entries/components/table-cells-data-mixin";

import Settings from "../settings";

export default {
  components: {
    UDataTable
  },

  mixins: [tableMixin, talbeCellsDataMixin],

  computed: {
    scope() {
      return Settings.domain;
    },
    columns() {
      let columns = [];

      columns.push({
        name: "name",
        label: "Name",
        field: (row) => row,
        sortable: false,
        required: true,
        align: "left"
      });

      // columns.push({
      //   name: "description",
      //   label: "Description",
      //   field: (row) => row.description,
      //   sortable: false,
      //   align: "left"
      // });

      columns.push({
        name: "total",
        label: "Total",
        field: (row) => this.getNumber(row.stats.donors.number),
        sortable: false,
        align: "right"
      });

      columns.push({
        name: "mri",
        label: "MRI",
        field: (row) => this.getNumbers(row.stats.images.mri.number),
        sortable: false,
        align: "right"
      });

      columns.push({
        name: "material",
        label: "Material",
        field: (row) => this.getNumbers(row.stats.specimens.material.number),
        sortable: false,
        align: "right"
      });

      columns.push({
        name: "line",
        label: "Cell line",
        field: (row) => this.getNumbers(row.stats.specimens.line.number),
        sortable: false,
        align: "right"
      });

      columns.push({
        name: "organoid",
        label: "Organoid",
        field: (row) => this.getNumbers(row.stats.specimens.organoid.number),
        sortable: false,
        align: "right"
      });

      columns.push({
        name: "xenograft",
        label: "Xenograft",
        field: (row) => this.getNumbers(row.stats.specimens.xenograft.number),
        sortable: false,
        align: "right"
      });

      columns.push({
        name: "ssm",
        label: "SSM",
        field: (row) => this.getNumber(row.stats.dna.ssm.number),
        sortable: false,
        align: "right"
      });

      columns.push({
        name: "cnv",
        label: "CNV",
        field: (row) => this.getNumber(row.stats.dna.cnv.number),
        sortable: false,
        align: "right"
      });

      columns.push({
        name: "sv",
        label: "SV",
        field: (row) => this.getNumber(row.stats.dna.sv.number),
        sortable: false,
        align: "right"
      });

      columns.push({
        name: "meth",
        label: "Meth",
        field: (row) => this.getNumber(row.stats.meth.number),
        sortable: false,
        align: "right"
      });

      columns.push({
        name: "exp",
        label: "RNA",
        field: (row) =>  this.getNumber(row.stats.rna.number),
        sortable: false,
        align: "right"
      });

      columns.push({
        name: "expSc",
        label: "scRNA",
        field: (row) => this.getNumber(row.stats.rnasc.number),
        sortable: false,
        align: "right"
      });

      return columns;
    }
  },

  methods: {
    getNumber(value) {
      return value > 0 ? `${value}` : `-`;
    },
    getNumbers(value) {
      return value[0] > 0 ? `${value[0]}/${value[1]}` : `-`;
    }
  }
}
</script>