<template>
  <div class="col">
    <q-table
      :title="title"
      class="sticky-header"
      separator="cell" dense flat bordered
      selection="multiple"
      row-key="id"
      :columns="columns"
      :rows="data"
      v-model:selected="selected"
      v-model:pagination="pagination"
      :rows-per-page-options="pageOptions"
      :filter="filter"
      :loading="loading"
      @request="onRequest"
    >
      <template v-slot:top-right>
        <div class="row q-gutter-x-sm">
          <u-filters-toolbar domain="ssms" />

          <q-input v-model="filter" placeholder="Search" dense debounce="300" style="width: 300px">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </template>

      <template v-slot:body-cell-id="props">
        <q-td :props="props">
          <router-link class="u-link" :to="{ name: 'ssm', params: { id: props.value.toString() }}">
            {{ props.value }}
        </router-link>
        </q-td>
      </template>

      <template v-slot:body-cell-consequences="props">
        <q-td :props="props">
          <u-consequences :consequences="props.value" />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import UFiltersToolbar from "@/domain/_shared/components/filters/toolbar/FiltersToolbar.vue";
import UConsequences from "@/domain/_shared/components/genome/variants/Consequences.vue";
import tableMixin from "@/domain/_shared/table-mixin";

export default {
  components: {
    UFiltersToolbar,
    UConsequences 
  },

  mixins: [tableMixin],

  data() {
    return {
      columns: [
        {
          name: "id",
          label: "ID",
          field: (row) => row.id,
          sortable: false,
          required: true,
          align: "left"
        },
        {
          name: "location",
          label: "Location",
          field: (row) => this.getLocationView(row.mutation),
          sortable: false,
          align: "left"
        },
        {
          name: "change",
          label: "DNA change",
          field: (row) => this.getDnaChangeView(row.mutation),
          sortable: false,
          align: "left"
        },
        {
          name: "type",
          label: "Type",
          field: (row) => row.mutation.type,
          sortable: false,
          align: "left"
        },
        {
          name: "consequences",
          label: "Consequences",
          field: row => row.transcriptConsequences,
          sortable: false,
          align: "left"
        },
        {
          name: "numberOfDonors",
          label: "#Affected Donors",
          field: (row) => row.numberOfDonors,
          sortable: false
        }
      ]
    };
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