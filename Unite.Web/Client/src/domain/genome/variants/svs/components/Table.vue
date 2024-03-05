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
          <u-variant-link :id="props.value" type="sv" />
        </q-td>
      </template>

      <template v-slot:body-cell-length="props">
        <q-td :props="props">
          <span v-if="props.value">{{props.value}}</span>
          <span v-else class="text-grey">N/A</span>
        </q-td>
      </template>

      <template v-slot:body-cell-consequences="props">
        <q-td :props="props">
          <u-consequences :consequences="props.value" />
        </q-td>
      </template>
    </u-data-table>
  </div>
</template>

<script>
import UDataTable from "@/_shared/components/table/DataTable.vue";
import UVariantLink from "../../sv/components/Link.vue";
import UConsequences from "../../_shared/variants/components/cells/Consequences.vue";
import tableMixin from "@/domain/_shared/entries/components/table-mixin";

import Settings from "../settings";

export default {
  components: {
    UDataTable,
    UVariantLink,
    UConsequences
  },

  mixins: [tableMixin],

  computed: {
    scope() {
      return Settings.domain;
    },

    columns() {
      let columns = [];

      columns.push({
        name: "id",
        label: "ID",
        field: (row) => row.id,
        sortable: false,
        required: true,
        align: "left"
      });

      columns.push({
        name: "breakpoint1",
        label: "1st Breakpoint",
        field: (row) => this.getBreakpoint1View(row.sv),
        sortable: false,
        align: "left"
      });

      columns.push({
        name: "breakpoint2",
        label: "2nd Breakpoint",
        field: (row) => this.getBreakpoint2View(row.sv),
        sortable: false,
        align: "left"
      });

      columns.push({
        name: "length",
        label: "Length",
        field: (row) => row.length?.toLocaleString(),
        sortable: false,
        align: "left"
      });

      columns.push({
        name: "type",
        label: "Type",
        field: (row) => row.sv.type,
        sortable: false,
        align: "left"
      });

      columns.push({
        name: "consequences",
        label: "Consequences",
        field: row => row.transcriptConsequences,
        sortable: false,
        align: "left"
      });

      columns.push({
        name: "numberOfGenes",
        label: "#Genes",
        field: (row) => row.numberOfGenes?.toLocaleString(),
        sortable: false
      });

      return columns;
    }
  },

  methods: {
    getBreakpoint1View(variant) {
      if (variant.end - variant.start == 1) {
        return `chr${variant.chromosome}:${variant.start}`;
      } else {
        return `chr${variant.chromosome}:${variant.start}-${variant.end}`;
      }
    },

    getBreakpoint2View(variant) {
      if (variant.otherEnd - variant.otherStart == 1) {
        return `chr${variant.otherChromosome}:${variant.otherEnd}`;
      } else {
        return `chr${variant.otherChromosome}:${variant.otherStart}-${variant.otherEnd}`;
      }
    }
  }
}
</script>