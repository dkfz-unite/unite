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
        :filter="filter"
        :loading="loading"
        @request="onRequest"
      >
        <template v-slot:body-cell-name="props">
          <q-td :props="props">
            <router-link class="u-link" :to="{ name: 'gene', params: { id: props.value.id.toString() }}">
              {{ props.value.symbol }}
            </router-link>
          </q-td>
        </template>

        <template v-slot:header-cell-expression="props">
          <q-th :props="props">
              Expression ( <span>Raw</span> / <span class="text-teal">TPM</span> / <span class="text-purple">FPKM</span> )
          </q-th>
        </template>

        <template v-slot:body-cell-expression="props">
          <q-td :props="props">
            <u-expression :expression="props.value" />
          </q-td>
        </template>

        <template v-slot:header-cell-expressions="props">
          <q-th :props="props">
              Expression ( <span>Raw</span> / <span class="text-teal">TPM</span> / <span class="text-purple">FPKM</span> )
          </q-th>
        </template>

        <template v-slot:body-cell-expressions="props">
          <q-td :props="props">
            <u-specimen v-for="(specimen, i) in props.value" :specimen="specimen">
              ( <u-expression :expression="specimen.expression" /> )
            </u-specimen>
          </q-td>
        </template>

      </q-table>
    </div>
  </template>
  
  <script>
  import USpecimen from "../Specimen.vue";
  import UExpression from "../Expression.vue";
  import tableMixin from "@/domain/_shared/table-mixin";
  
  import Biotype from "@/_models/domain/genome/genes/enums/biotype";
  
  export default {
    components: {
      USpecimen,
      UExpression
    },
  
    mixins: [tableMixin],
  
    data() {
      return {
        columns: [
          {
            name: "name",
            label: "Name",
            field: (row) => row,
            sortable: false,
            align: "left",
          },
          {
            name: "location",
            label: "Location",
            field: (row) => this.getLocation(row),
            sortable: false,
            align: "left",
          },
          {
            name: "biotype",
            label: "Biotype",
            field: (row) => this.$helpers.enum.getLabel(row.biotype, Biotype.values),
            sortable: false,
            align: "left",
          },
          {
            name: "numberOfDonors",
            label: "#Affected Donors",
            field: (row) => row.numberOfDonors,
            sortable: false,
          },
          {
            name: "numberOfSsms",
            label: "#SSMs",
            field: (row) => row.numberOfMutations,
            sortable: false,
          },
          {
            name: "numberOfCnvs",
            label: "#CNVs",
            field: (row) => row.numberOfCopyNumberVariants,
            sortable: false,
          },
          {
            name: "numberOfSvs",
            label: "#SVs",
            field: (row) => row.numberOfStructuralVariants,
            sortable: false,
          }
        ]
      };
    },

    mounted() {
      if (["donor", "image"].includes(this.$route.name)){
        this.columns.splice(3, 0, {
          name: "expressions",
          field: (row) => row.specimens,
          sortable: false,
          align: "left"
        });
      } else if (["tissue", "cell", "organoid", "xenograft"].includes(this.$route.name)){
        this.columns.splice(3, 0, {
          name: "expression",
          field: (row) => row.expression,
          sortable: false,
          align: "left"
        });
      }
    },
  
    methods: {
      getLocation(gene) {
        if (gene.chromosome && gene.start && gene.end) {
          return `chr${gene.chromosome}:${gene.start}-${gene.end}`;
        } else {
          return null;
        }
      },

      orderSpecimens(specimens) {
      }
    }
  }
  </script>