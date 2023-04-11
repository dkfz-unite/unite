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
          <u-filters-toolbar domain="mris" />
          
          <q-input v-model="filter" placeholder="Search" dense debounce="300" style="width: 300px">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </template>

      <template v-slot:body-cell-id="props">
        <q-td :props="props">
          <router-link class="u-link" :to="{ name: 'mri', params: { id: props.value.toString() }}">
            {{ props.value }}
          </router-link>
        </q-td>
      </template>

      <template v-slot:body-cell-donorId="props">
        <q-td :props="props">
          <router-link class="u-link" :to="{ name: 'donor', params: { id: props.value.toString() }}">
            {{ props.value }}
          </router-link>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import UFiltersToolbar from "../../../_shared/components/filters/toolbar/FiltersToolbar.vue";
import tableMixin from "../../../_shared/table-mixin";

export default {
  components: {
    UFiltersToolbar
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
          name: "donorId",
          label: "Donor Id",
          field: (row) => row.donorId,
          sortable: false,
          align: "left"
        },
        {
          name: "wholeTumor",
          label: "Whole Tumor (cm³)",
          field: (row) => row.mriImage?.wholeTumor?.toFixed(3),
          sortable: false
        },
        {
          name: "contrastEnhancing",
          label: "Contrast Enhancing (cm³)",
          field: (row) => row.mriImage?.contrastEnhancing?.toFixed(3),
          sortable: false
        },
        {
          name: "nonContrastEnhancing",
          label: "Non Contrast Enhancing (cm³)",
          field: (row) => row.mriImage?.nonContrastEnhancing?.toFixed(3),
          sortable: false
        },
        // {
        //   name: "numberOfMutations",
        //   label: "#Mutations",
        //   field: (row) => row.numberOfMutations,
        //   sortable: false
        // },
        // {
        //   name: "numberOfGenes",
        //   label: "#Genes",
        //   field: (row) => row.numberOfGenes,
        //   sortable: false
        // }
      ]
    };
  }
}
</script>