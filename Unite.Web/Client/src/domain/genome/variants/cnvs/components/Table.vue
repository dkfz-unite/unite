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
          <u-variant-link :id="props.value" type="cnv" />
        </q-td>
      </template>

      <template v-slot:body-cell-type="props">
        <q-td :props="props">
          <span v-if="!!props.value.type">{{props.value.type}}</span><span v-else class="text-grey">N/A</span>
          <span v-if="!!props.value.loh"> LOH</span>
          <span v-if="!!props.value.del"> Del</span>
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
import UVariantLink from "@/domain/genome/variants/cnv/components/Link.vue";
import UConsequences from "@/domain/genome/variants/_shared/variants/components/cells/Consequences.vue";
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
        name: "location",
        label: "Location",
        field: (row) => this.getLocationView(row.cnv),
        sortable: false,
        align: "left"
      });

      columns.push({
        name: "length",
        label: "Length",
        field: (row) => row.length.toLocaleString(),
        sortable: false,
        align: "left"
      });

      columns.push({
        name: "c1Mean",
        label: "C1 Mean",
        field: (row) => this.$helpers.content.toDoubleString(row.cnv.c1Mean, 2, "N/A"),
        classes: (row) => !row.cnv.c1Mean ? "text-grey" : null,
        sortable: false,
        align: "left",
      });

      columns.push({
        name: "c2Mean",
        label: "C2 Mean",
        field: (row) => this.$helpers.content.toDoubleString(row.cnv.c2Mean, 2, "N/A"),
        classes: (row) => !row.cnv.c2Mean ? "text-grey" : null,
        sortable: false,
        align: "left"
      });

      columns.push({
        name: "tcnMean",
        label: "TCN Mean",
        field: (row) => this.$helpers.content.toDoubleString(row.cnv.tcnMean, 2, "N/A"),
        classes: (row) => !row.cnv.tcnMean ? "text-grey" : null,
        sortable: false,
        align: "left",
      });

      columns.push({
        name: "c1",
        label: "C1",
        field: (row) => this.getCopyNumber(row.cnv.c1) || "N/A",
        classes: (row) => !this.getCopyNumber(row.cnv.c1) ? "text-grey" : null,
        sortable: false,
        align: "left",
        show: false
      });

      columns.push({
        name: "c2",
        label: "C2",
        field: (row) => this.getCopyNumber(row.cnv.c2) || "N/A",
        classes: (row) => !this.getCopyNumber(row.cnv.c2) ? "text-grey" : null,
        sortable: false,
        align: "left",
        show: false
      });

      columns.push({
        name: "tcn",
        label: "TCN",
        field: (row) => this.getCopyNumber(row.cnv.tcn) || "N/A",
        classes: (row) => !this.getCopyNumber(row.cnv.tcn) ? "text-grey" : null,
        sortable: false,
        align: "left",
        show: false
      });

      columns.push({
        name: "genotype",
        label: "Genotype",
        field: (row) => this.getGenotype(row.cnv) || "N/A",
        classes: (row) => !this.getGenotype(row.cnv) ? "text-grey" : null,
        sortable: false,
        align: "left"
      });

      columns.push({
        name: "type",
        label: "Type",
        field: (row) => row.cnv,
        sortable: false,
        align: "left"
      });

      columns.push({
        name: "consequences",
        label: "Consequences",
        field: row => row.transcriptConsequences || null,
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
      getLocationView(variant) {
        return `chr${variant.chromosome}:${variant.start}-${variant.end}`;
      },

      getCopyNumber(value) {
        if (value == null) {
          return null;
        } else {
          return value === -1 ? "sub" : value;
        }
      },

      getGenotype(cnv) {
        if (cnv.c1 == null || cnv.c2 == null) {
          return null;
        } else {
          return `${this.getCopyNumber(cnv.c1)} : ${this.getCopyNumber(cnv.c2)}`;
        }
      }
    }
};
</script>