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
        @request="onRequest">
        <template v-slot:body-cell-id="props">
          <q-td :props="props">
            <router-link class="u-link" :to="{ name: 'cnv', params: { id: props.value.toString() }}">
              {{ props.value }}
            </router-link>
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
            field: (row) => row.length.toLocaleString(),
            sortable: false,
            align: "left"
          },
          {
            name: "c1Mean",
            label: "C1 Mean",
            field: (row) => this.$helpers.content.toDoubleString(row.copyNumberVariant.c1Mean, 2, "N/A"),
            classes: (row) => !row.copyNumberVariant.c1Mean ? "text-grey" : null,
            sortable: false,
            align: "left",
          },
          {
            name: "c2Mean",
            label: "C2 Mean",
            field: (row) => this.$helpers.content.toDoubleString(row.copyNumberVariant.c2Mean, 2, "N/A"),
            classes: (row) => !row.copyNumberVariant.c2Mean ? "text-grey" : null,
            sortable: false,
            align: "left"
          },
          {
            name: "tcnMean",
            label: "TCN Mean",
            field: (row) => this.$helpers.content.toDoubleString(row.copyNumberVariant.tcnMean, 2, "N/A"),
            classes: (row) => !row.copyNumberVariant.tcnMean ? "text-grey" : null,
            sortable: false,
            align: "left",
          },
          {
            name: "genotype",
            label: "Genotype",
            field: (row) => this.getGenotype(row.copyNumberVariant) || "N/A",
            classes: (row) => !this.getGenotype(row.copyNumberVariant) ? "text-grey" : null,
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
            field: (row) => row.numberOfGenes?.toLocaleString(),
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