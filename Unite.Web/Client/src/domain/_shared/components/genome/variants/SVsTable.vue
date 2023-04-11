<template>
    <div class="col">
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
            <router-link class="u-link" :to="{ name: 'sv', params: { id: props.value.toString() }}">
              {{ props.value }}
            </router-link>
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
            name: "breakpoint1",
            label: "1st Breakpoint",
            field: (row) => this.getBreakpoint1View(row.structuralVariant),
            sortable: false,
            align: "left"
          },
          {
            name: "breakpoint2",
            label: "2nd Breakpoint",
            field: (row) => this.getBreakpoint2View(row.structuralVariant),
            sortable: false,
            align: "left"
          },
          {
            name: "length",
            label: "Length",
            field: (row) => row.length?.toLocaleString(),
            sortable: false,
            align: "left"
          },
          {
            name: "type",
            label: "Type",
            field: (row) => row.structuralVariant.type,
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
            name: "numberOfGenes",
            label: "#Affected Genes",
            field: (row) => row.numberOfGenes?.toLocaleString(),
            sortable: false
          }
        ]
      };
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