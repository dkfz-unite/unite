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

      <template v-slot:body-cell-effects="props">
        <q-td :props="props">
          <u-effects :effects="props.value" />
        </q-td>
      </template>
    </u-data-table>
  </div>
</template>

<script>
import UDataTable from "@/_shared/components/table/DataTable.vue";
import UVariantLink from "@/domain/genome/variants/cnv/components/Link.vue";
import UEffects from "@/domain/genome/variants/_shared/variants/components/cells/Effects.vue";
import tableMixin from "@/domain/_shared/entries/components/table-mixin";

import Settings from "../settings";

export default {
  components: {
    UDataTable,
    UVariantLink,
    UEffects
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
        field: (row) => this.getLocationView(row),
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
        field: (row) => this.$helpers.content.toDoubleString(row.c1Mean, 2, "N/A"),
        classes: (row) => !row.c1Mean ? "text-grey" : null,
        sortable: false,
        align: "left",
      });

      columns.push({
        name: "c2Mean",
        label: "C2 Mean",
        field: (row) => this.$helpers.content.toDoubleString(row.c2Mean, 2, "N/A"),
        classes: (row) => !row.c2Mean ? "text-grey" : null,
        sortable: false,
        align: "left"
      });

      columns.push({
        name: "tcnMean",
        label: "TCN Mean",
        field: (row) => this.$helpers.content.toDoubleString(row.tcnMean, 2, "N/A"),
        classes: (row) => !row.tcnMean ? "text-grey" : null,
        sortable: false,
        align: "left",
      });

      columns.push({
        name: "c1",
        label: "C1",
        field: (row) => this.getCopyNumber(row.c1) || "N/A",
        classes: (row) => !this.getCopyNumber(row.c1) ? "text-grey" : null,
        sortable: false,
        align: "left",
        show: false
      });

      columns.push({
        name: "c2",
        label: "C2",
        field: (row) => this.getCopyNumber(row.c2) || "N/A",
        classes: (row) => !this.getCopyNumber(row.c2) ? "text-grey" : null,
        sortable: false,
        align: "left",
        show: false
      });

      columns.push({
        name: "tcn",
        label: "TCN",
        field: (row) => this.getCopyNumber(row.tcn) || "N/A",
        classes: (row) => !this.getCopyNumber(row.tcn) ? "text-grey" : null,
        sortable: false,
        align: "left",
        show: false
      });

      columns.push({
        name: "genotype",
        label: "Genotype",
        field: (row) => this.getGenotype(row) || "N/A",
        classes: (row) => !this.getGenotype(row) ? "text-grey" : null,
        sortable: false,
        align: "left"
      });

      columns.push({
        name: "type",
        label: "Type",
        field: (row) => row,
        sortable: false,
        align: "left"
      });

      columns.push({
        name: "effects",
        label: "Effects",
        field: row => row.transcriptEffects || null,
        sortable: false,
        align: "left"
      });

      // columns.push({
      //   name: "numberOfDonors",
      //   label: "#Similar",
      //   field: (row) => row.stats?.donors?.toLocaleString(),
      //   sortable: false
      // });

      columns.push({
        name: "numberOfGenes",
        label: "#Genes",
        field: (row) => row.stats?.genes?.toLocaleString(),
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