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

      <template v-slot:body-cell-name="props">
        <q-td :props="props">
          <u-gene-link :id="props.value.id">{{ props.value.symbol }}</u-gene-link>
        </q-td>
      </template>

      <template v-slot:header-cell-expression="props">
        <q-th :props="props">
          <span>
            Expression ( <span>Reads</span> / <span class="text-teal">TPM</span> / <span class="text-purple">FPKM</span> )
          </span>
        </q-th>
      </template>

      <template v-slot:body-cell-expression="props">
        <q-td :props="props">
          <span v-if="props.value">
            <span>{{ props.value.reads?.toLocaleString() }}</span> / <span class="text-teal">{{ props.value.tpm?.toLocaleString() }}</span> / <span class="text-purple">{{ props.value.fpkm?.toLocaleString() }}</span>
          </span>
        </q-td>
      </template>

      <template v-slot:header-cell-reads="props">
        <q-th :props="props">
          <u-expression-stats-header title="Reads" />
        </q-th>
      </template>

      <template v-slot:body-cell-reads="props">
        <q-td :props="props">
          <u-expression-stats-cell v-if="props.value" :value="props.value" />
        </q-td>
      </template>

      <template v-slot:header-cell-tpm="props">
        <q-th :props="props">
          <u-expression-stats-header title="TPM" class="text-teal"/>
        </q-th>
      </template>

      <template v-slot:body-cell-tpm="props">
        <q-td :props="props">
          <u-expression-stats-cell v-if="props.value" :value="props.value" class="text-teal" />
        </q-td>
      </template>

      <template v-slot:header-cell-fpkm="props">
        <q-th :props="props">
          <u-expression-stats-header title="FPKM" class="text-purple" />
        </q-th>
      </template>

      <template v-slot:body-cell-fpkm="props">
        <q-td :props="props">
          <u-expression-stats-cell v-if="props.value" :value="props.value" class="text-purple" />
        </q-td>
      </template>
    </u-data-table>
  </div>
</template>

<script>
import UDataTable from "@/_shared/components/table/DataTable.vue";
import UGeneLink from "@/_shared/components/GeneLink.vue";
import UExpressionStatsHeader from "./cells/ExpressionStatsHeader.vue";
import UExpressionStatsCell from "./cells/ExpressionStatsCell.vue";
import Settings from "../settings";
import tableMixin from "@/domain/_shared/table-mixin";

import Biotype from "@/_models/domain/genome/genes/enums/biotype";

export default {
  components: {
    UDataTable,
    UGeneLink,
    UExpressionStatsHeader,
    UExpressionStatsCell
  },

  props: {
    showExpressions: {
      type: Boolean,
      default: false
    },

    showStats: {
      type: Boolean,
      default: false
    }
  },

  mixins: [tableMixin],

  computed: {
    scope() {
      return Settings.domain;
    },
    
    columns() {
      var columns = [];

      columns.push({
        name: "name",
        label: "Name",
        field: (row) => row,
        sortable: false,
        align: "left",
        required: true
      });

      columns.push({
        name: "location",
        label: "Location",
        field: (row) => this.getLocation(row),
        sortable: false,
        align: "left"
      });

      columns.push({
        name: "biotype",
        label: "Biotype",
        field: (row) => this.$helpers.enum.getLabel(row.biotype, Biotype.values),
        sortable: false,
        align: "left"
      });

      if(this.showExpressions){
        columns.push({
          name: "expression",
          label: "Expression",
          field: (row) => row.expression,
          sortable: false,
          align: "right"
        });
      }

      columns.push({
        name: "reads",
        label: "Reads",
        field: (row) => row.reads,
        sortable: false,
        show: false
      });

      columns.push({
        name: "tpm",
        label: "TPM",
        field: (row) => row.tpm,
        sortable: false,
        show: false
      });

      columns.push({
        name: "fpkm",
        label: "FPKM",
        field: (row) => row.fpkm,
        sortable: false,
        show: false
      });

      if (this.showStats) {
        columns.push({
          name: "numberOfDonors",
          label: "#Donors",
          field: (row) => row.numberOfDonors,
          sortable: false
        });

        columns.push({
          name: "numberOfSsms",
          label: "#SSMs",
          field: (row) => row.numberOfSsms,
          sortable: false
        });

        columns.push({
          name: "numberOfCnvs",
          label: "#CNVs",
          field: (row) => row.numberOfCnvs,
          sortable: false
        });

        columns.push({
          name: "numberOfSvs",
          label: "#SVs",
          field: (row) => row.numberOfSvs,
          sortable: false
        });
      }

      return columns;
    }
  },

  methods: {
    getLocation(gene) {
      if (gene.chromosome && gene.start && gene.end) {
        return `chr${gene.chromosome}:${gene.start}-${gene.end}`;
      } else {
        return null;
      }
    }
  }
};
</script>