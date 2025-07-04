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
          <u-variant-link :id="props.value" type="sm" />
        </q-td>
      </template>

      <template v-slot:body-cell-change="props">
        <q-td :props="props">
          <u-dna-change :from="props.value.ref" :to="props.value.alt" />
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
import UVariantLink from "@/domain/omics/variants/sm/components/Link.vue";
import UDnaChange from "@/domain/omics/variants/_shared/components/DnaChange.vue";
import UEffects from "@/domain/omics/variants/_shared/variants/components/cells/Effects.vue";
import tableMixin from "@/domain/_shared/entries/components/table-mixin";

import Settings from "../settings";

export default {
  components: {
    UDataTable,
    UVariantLink,
    UDnaChange,
    UEffects
  },

  mixins: [tableMixin],

  computed: {
    scope() {
      return "sms";
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
        name: "location",
        label: "Location",
        field: (row) => this.getLocationView(row),
        sortable: false,
        align: "left"
      });

      columns.push({
        name: "change",
        label: "DNA change",
        field: (row) => row,
        sortable: false,
        align: "left"
      });

      columns.push({
        name: "length",
        label: "Length",
        field: (row) => row.length,
        sortable: false,
        align: "left",
        show: false
      });

      columns.push({
        name: "type",
        label: "Type",
        field: (row) => row.type,
        sortable: false,
        align: "left"
      });

      columns.push({
        name: "effects",
        label: "Effects",
        field: row => row.transcriptEffects,
        sortable: false,
        align: "left"
      });

      if ([Settings.domain].includes(this.$route.name)){
        columns.push({
          name: "numberOfDonors",
          label: "#Donors",
          field: (row) => row.stats?.donors,
          sortable: false
        });
      }

      return columns;
    }
  },

  methods: {
    getLocationView(variant) {
      if (variant.start == variant.end) {
        return `chr${variant.chromosome}:${variant.start}`;
      } else {
        return `chr${variant.chromosome}:${variant.start}-${variant.end}`;
      }
    },

    getDnaChangeView(variant) {
      return `${variant.ref || "-"}>${variant.alt || "-"}`;
    },
  }
}
</script>