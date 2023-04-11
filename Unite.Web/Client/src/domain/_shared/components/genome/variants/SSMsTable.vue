<template>
    <div>
      <q-table
        separator="cell" dense flat bordered
        selection="multiple"
        row-key="id"
        :class="class"
        :title="title"
        :columns="columns"
        :rows="data"
        v-model:selected="selected"
        v-model:pagination="pagination"
        :rows-per-page-options="pageOptions"
        :filter="filter"
        :loading="loading"
        @request="onRequest"
      >
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
  
        <!-- <template v-slot:body-cell-specimens="props">
          <q-td :props="props">
            <u-specimens :specimens="props.value" />
          </q-td>
        </template> -->
      </q-table>
    </div>
  </template>
  
  <script>
  import UConsequences from "./Consequences.vue";
  // import USpecimens from "../Specimens.vue";
  import tableMixin from "@/domain/_shared/table-mixin";
  
  export default {
    components: {
      UConsequences,
      // USpecimens
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
          // {
          //   name: "specimens",
          //   label: "Specimens",
          //   field: row => this.getSpecimensView(row.specimens),
          //   sortable: false,
          //   align: "left"
          // },
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
        return `chr${variant.chromosome}:${variant.start}-${variant.end}`;
      },
  
      getDnaChangeView(variant) {
        return `${variant.ref || "-"}>${variant.alt || "-"}`;
      },
  
      // getSpecimensView(specimens) {
      //   if (specimens?.length) {
      //     return {
      //       tissues: specimens.filter(specimen => !!specimen.tissue),
      //       cells: specimens.filter(specimen => !!specimen.cellLine),
      //       organoids: specimens.filter(specimen => !!specimen.organoid),
      //       xenografts: specimens.filter(specimen => !!specimen.xenograft)
      //     };
      //   } else {
      //     return null;
      //   }
      // }
    }
  }
  </script>