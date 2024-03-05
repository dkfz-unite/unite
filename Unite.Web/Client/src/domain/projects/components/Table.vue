<template>
  <q-table
    title="Projects"
    row-key="id"
    separator="cell"
    class="sticky-header"
    :loading="loading"
    :rows="rows"
    :columns="columns"
    :pagination="{ rowsPerPage: 15 }"
    wrap-cells dense>

    <template v-slot:header="props">
      <!-- Header groups row -->
      <q-tr :props="props">
        <!-- No group -->
        <q-th colspan="2"></q-th>
        <!-- Donors -->
        <q-th colspan="12" title="Number of donors with specified data">#Donors</q-th>
      </q-tr>

      <!-- Headers row -->
      <q-tr :props="props">
        <q-th v-for="col in props.cols" :key="col.name" :props="props">
          {{ col.label }}
        </q-th>
      </q-tr>
    </template>

    <template v-slot:body-cell-name="props">
      <q-td :props="props">
        <template v-if="props.value.id">
          <u-link-project :id="props.value.id">
            {{ props.value.name }}
          </u-link-project>
        </template>
        <template v-else>
          {{ props.value.name }}
        </template>
      </q-td>
    </template>

  </q-table>
</template>

<script>
export default {
  props: {
    rows: {
      type: Array,
      default: () => []
    },

    loading: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      columns: [
        {
          name: "name",
          label: "Name",
          field: row => row,
          align: "left",
          style: "width: 15%;"
        },
        // {
        //   name: "studies",
        //   label: "Studies",
        //   field: row => row.studies || "-",
        //   align: "center",

        // }
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
        // {
        //   name: "ct",
        //   label: "CT",
        //   field: row => row.data.ct || "-",
        //   align: "center",
        //   style: "width: 2%;",
        // },
        // Specimens
        {
          name: "materials",
          label: "Materials",
          field: row => row.data.materials || "-",
          align: "center",
          style: "width: 4%;",
        },
        {
          name: "lines",
          label: "Cell Lines",
          field: row => row.data.lines || "-",
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
        },
        {
          name: "tra",
          label: "Transcriptomics",
          field: row => row.data.tra || "-",
          style: "width: 2%;",
          align: "center",
        }
      ]
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