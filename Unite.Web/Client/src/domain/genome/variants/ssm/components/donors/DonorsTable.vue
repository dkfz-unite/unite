<template>
  <div>
    <q-table
      :title="title"
      class="sticky-header-slim"
      separator="cell" dense flat bordered
      selection="multiple"
      row-key="id"
      :columns="columns"
      :rows="data"
      v-model:selected="selected"
      v-model:pagination="pagination"
      :filter="filter"
      :loading="loading"
      @request="onRequest"
    >
      <template v-slot:body-cell-id="props">
        <q-td :props="props">
          <router-link class="u-link" :to="{ name: 'donor', params: { id: props.value.toString() }}">
            {{ props.value }}
          </router-link>
        </q-td>
      </template>

      <template v-slot:body-cell-treatments="props">
        <q-td :props="props">
          <div v-if="props.value && props.value.length">
            <div v-for="(treatment, i) in props.value" :key="i">
              {{ treatment.therapy }}
            </div>
          </div>
        </q-td>
      </template>

      <template v-slot:body-cell-projects="props">
        <q-td :props="props">
          <div v-if="props.value && props.value.length">
            <div v-for="(project, i) in props.value" :key="i">
              <router-link class="u-link" :to="{ name: 'project', params: { id: project.id.toString() } }">
                {{ project.name }}
              </router-link>
            </div>
          </div>
        </q-td>
      </template>

      <template v-slot:body-cell-studies="props">
        <q-td :props="props">
          <div v-if="props.value && props.value.length">
            <div v-for="(study, i) in props.value" :key="i">
              {{ study.name }}
            </div>
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import tableMixin from "@/domain/_shared/table-mixin";

export default {
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
          align: "left",
        },
        {
          name: "gender",
          label: "Sex",
          field: (row) => row.clinicalData?.gender,
          sortable: false,
          align: "left"
        },
        {
          name: "age",
          label: "Age",
          field: (row) => row.clinicalData?.age,
          sortable: false,
        },
        {
          name: "primarySite",
          label: "Primary Site",
          field: (row) => row.clinicalData?.primarySite,
          sortable: false,
        },
        {
          name: "diagnosis",
          label: "Diagnosis",
          field: (row) => row.clinicalData?.diagnosis,
          sortable: false,
          align: "left"
        },
        {
          name: "mtaProtected",
          label: "MTA",
          field: (row) => this.$helpers.content.toBooleanString(row.mtaProtected),
          sortable: false,
          align: "left"
        },
        {
          name: "projects",
          label: "Projects",
          field: (row) => row.projects,
          sortable: false,
          align: "left"
        },
        {
          name: "studies",
          label: "Studies",
          field: (row) => row.studies,
          sortable: false,
          align: "left"
        },
        {
          name: "numberOfSpecimens",
          label: "#Specimens",
          field: (row) => row.numberOfSpecimens,
          sortable: false
        },
        {
          name: "numberOfGenes",
          label: "#Genes",
          field: (row) => row.numberOfGenes,
          sortable: false
        },
        {
          name: "numberOfMutations",
          label: "#Mutations",
          field: (row) => row.numberOfMutations,
          sortable: false
        }
      ]
    };
  }
}
</script>