<template>
  <div class="col q-gutter-sm">
    <div class="row">
      <q-breadcrumbs gutter="xs" class="text-subtitle1">
        <q-breadcrumbs-el icon="home" :to="{ name: 'home' }" />
        <q-breadcrumbs-el label="Projects" />
      </q-breadcrumbs>
    </div>

    <div class="row">
      <div class="col">
        <q-table
          title="Projects"
          :loading="loading"
          :rows="rows"
          :columns="columns"
          :pagination="{rowsPerPage: 15}"
          row-key="id"
          separator="cell"
          class="sticky-header"
          wrap-cells
          dense>

          <template v-slot:header="props">
            <!-- Header groups row -->
            <q-tr :props="props">
              <!-- No group -->
              <q-th colspan="2"></q-th>
              <!-- Donors -->
              <q-th colspan="10">#Donors</q-th>
            </q-tr>

            <!-- Headers row -->
            <q-tr :props="props">
              <q-th
                v-for="col in props.cols"
                :key="col.name"
                :props="props">
                {{ col.label }}
              </q-th>
            </q-tr>
          </template>

          <template v-slot:body-cell-project="props">
            <q-td :props="props">
              <router-link class="u-link" :to="{ name: 'project', params: { id: props.value.id.toString() }}">
                {{ props.value.name }}
              </router-link>
            </q-td>
          </template>

        </q-table>
      </div>
    </div>
  </div>
</template>

<script>
import Permissions from "@/_models/admin/enums/permissions";
import api from "./api";

export default {
  data() {
    return {
      loading: false,
      selected: [],
      rows: [],
      columns: [
        {
          name: "project",
          label: "Project",
          field: row => row,
          align: "left",
          style: "width: 15%;"
        },
        {
          name: "description",
          label: "Description",
          field: row => this.getShortDescription(row.description),
          align: "left",
          style: "width: 50%;",
        },
        {
          name: "total",
          label: "Total",
          field: row => row.data.total || "-",
          align: "center",
          style: "width: 2%;",
        },
        // Images
        {
          name: "mri",
          label: "MRI",
          field: row => row.data.mri || "-",
          align: "center",
          style: "width: 2%;",
        },
        {
          name: "ct",
          label: "CT",
          field: row => row.data.ct || "-",
          align: "center",
          style: "width: 2%;",
        },
        // Specimens
        {
          name: "tissues",
          label: "Tissues",
          field: row => row.data.tissues || "-",
          align: "center",
          style: "width: 4%;",
        },
        {
          name: "cells",
          label: "Cell Lines",
          field: row => row.data.cells || "-",
          align: "center",
          style: "width: 4%;",
        },
        {
          name: "organoids",
          label: "Organoids",
          field: row => row.data.organoids || "-",
          align: "center",
          style: "width: 4%;",
        },
        {
          name: "xenografts",
          label: "Xenografts",
          field: row => row.data.xenografts || "-",
          align: "center",
          style: "width: 4%;",
        },
        // Sequencing data
        {
          name: "ssm",
          label: "SSM",
          field: row => row.data.ssm || "-",
          style: "width: 2%;",
          align: "center",
        },
        {
          name: "cnv",
          label: "CNV",
          field: row => row.data.cnv || "-",
          style: "width: 2%;",
          align: "center",
        },
        {
          name: "sv",
          label: "SV",
          field: row => row.data.sv || "-",
          style: "width: 2%;",
          align: "center",
        }
      ]
    }
  },

  computed: {
    account() {
      return this.$store.state.identity.account;
    }
  },

  async mounted() {
    try {
      this.loading = true;
      this.rows = await api.search();
    } finally {
      this.loading = false;
    }
  },

  methods: {
    getShortDescription(description) {
      var words = description?.split(" ");
      var firstWords = words?.slice(0, 70);
      if (words?.length > firstWords?.length) {
        return firstWords.join(" ") + " ...";
      } else {
        return description;
      }
    }
  }
}
</script>