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
        :filter="filter"
        :loading="loading"
        @request="onRequest">
        <template v-slot:body-cell-id="props">
          <q-td :props="props">
            <router-link class="u-link" :to="{ name: 'cnv', params: { id: props.value.toString() }}">
              {{ props.value }}
            </router-link>
          </q-td>
        </template>

        <template v-slot:body-cell-c1Mean="props">
          <q-td :props="props">
            <span v-if="!!props.value">{{props.value}}</span><span v-else class="text-grey">N/A</span>
          </q-td>
        </template>

        <template v-slot:body-cell-c2Mean="props">
          <q-td :props="props">
            <span v-if="!!props.value">{{props.value}}</span><span v-else class="text-grey">N/A</span>
          </q-td>
        </template>

        <template v-slot:body-cell-genotype="props">
          <q-td :props="props">
            <span v-if="!!props.value">{{props.value}}</span><span v-else class="text-grey">N/A</span>
          </q-td>
        </template>

        <template v-slot:body-cell-type="props">
          <q-td :props="props">
            <span v-if="!!props.value.type">{{props.value.type}}</span><span v-else class="text-grey">N/A</span>
            <span v-if="!!props.value.loh"> LOH</span>
            <span v-if="!!props.value.homoDel"> HomoDel</span>
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
  import UConsequences from "./Consequences.vue";
  import tableMixin from "@/domain/_shared/table-mixin";
  
  export default {
    components: {
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
            field: (row) => this.getLocationView(row.copyNumberVariant),
            sortable: false,
            align: "left"
          },
          {
            name: "length",
            label: "Length",
            field: (row) => row.length,
            sortable: false,
            align: "left"
          },
          {
            name: "c1Mean",
            label: "C1 Mean",
            field: (row) => row.copyNumberVariant.c1Mean,
            sortable: false,
            align: "left",
          },
          {
            name: "c2Mean",
            label: "C2 Mean",
            field: (row) => row.copyNumberVariant.c2Mean,
            sortable: false,
            align: "left"
          },
          {
            name: "genotype",
            label: "Genotype",
            field: (row) => this.getGenotype(row.copyNumberVariant),
            sortable: false,
            align: "left"
          },
          {
            name: "type",
            label: "Type",
            field: (row) => row.copyNumberVariant,
            sortable: false,
            align: "left"
          },
          {
            name: "consequences",
            label: "Consequences",
            field: row => row.transcriptConsequences || null,
            sortable: false,
            align: "left"
          },
          {
            name: "numberOfGenes",
            label: "#Affected Genes",
            field: (row) => row.numberOfGenes,
            sortable: false
          }
        ]
      };
    },
  
    methods: {
      getLocationView(variant) {
        return `chr${variant.chromosome}:${variant.start}-${variant.end}`;
      },

      getGenotype(cnv) {
        if (!cnv.c1 && !cnv.c2) {
          return null;
        } else {
          return `${cnv.c1 == -1 ? "sub" : cnv.c1} : ${cnv.c2 == -1 ? "sub" : cnv.c2}`;
        }
      }
    }
  }
  </script>