<template>
  <div class="col">
    <q-table
      title="Mutations"
      class="sticky-header"
      separator="cell" dense flat bordered
      selection="multiple"
      row-key="id"
      :columns="columns"
      :data="data"
      :selected.sync="selected"
      :pagination.sync="pagination"
      :filter="filter"
      :loading="loading"
      @request="onRequest"
    >
      <template v-slot:top-right>
        <q-input v-model="filter" placeholder="Search" dense debounce="300" style="width: 300px">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:body-cell-id="props">
        <q-td :props="props">
          <router-link class="u-link" :to="{ name: 'mutation', params: { id: props.value.toString() }}">
            {{ props.value }}
        </router-link>
        </q-td>
      </template>

      <template v-slot:body-cell-consequences="props">
        <q-td :props="props">
          <template v-if="props.value">
            <div v-for="(consequence, i) in props.value" :key="i">
              <div>
                <span :class="getImpactColor(consequence.impact)">{{consequence.term}}: </span>
                <span>
                  <span v-for="(gene, i) in consequence.genes" :key="i">
                    <a class="u-link text-italic" :href="'http://feb2014.archive.ensembl.org/Homo_sapiens/Gene/Summary?db=core;g=' + gene.ensemblId" target="blank">{{gene.symbol}}&nbsp;&nbsp;</a>
                    <span v-if="gene.transcripts && gene.transcripts.length">
                      (<span v-for="(transcript, i) in gene.transcripts" :key="i">
                        <span>{{transcript}}</span>
                        <span v-if="i + 1 < gene.transcripts.length">, </span>
                      </span>)
                    </span>
                    <span>&nbsp;</span>
                  </span>
                </span>
              </div>
            </div>
          </template>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import App from '../../App.vue';
export default {
  components: { App },
  props: ["rows", "rowsSelected", "rowsTotal", "filters", "loading"],

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
          name: "code",
          label: "DNA change",
          field: (row) => row.code,
          sortable: false,
          align: "left"
        },
        { 
            name: "type", 
            label: "Type", 
            field: row => row.type, 
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
          name: "donors",
          label: "Donors affected",
          field: (row) => row.donors,
          sortable: false
        }
      ],

      data: [],

      selected: [],

      filter: null,

      pagination: {
        page: 1,
        rowsPerPage: 20,
        rowsNumber: 0,
      },
    };
  },

  watch: {
    rows(value) {
      this.data = value;
    },

    rowsTotal(value) {
      this.pagination.rowsNumber = value;
    },

    rowsSelected(value) {
      this.selected = value;
    },

    selected(value) {
      this.$emit("update:rowsSelected", value);
    },
  },

  mounted() {
    this.$route.params.tab = "mutation";
    this.onRequest({ pagination: this.pagination, filter: this.filter });
  },

  methods: {
    onRequest(props) {
      let filters = {
        from: this.getFrom(props.pagination.page, props.pagination.rowsPerPage),
        size: this.getSize(props.pagination.rowsPerPage),
        term: props.filter,
      };

      this.pagination.page = props.pagination.page;
      this.pagination.rowsPerPage = props.pagination.rowsPerPage;

      this.$emit("update:filters", filters);
    },

    getFrom(page, pageSize) {
      if (page != null && page != undefined) {
        return (page - 1) * pageSize;
      } else {
        return 0;
      }
    },

    getSize(pageSize) {
      if (pageSize != null && pageSize != undefined) {
        return pageSize == 0 ? 10000 : pageSize;
      } else {
        return 20;
      }
    },

    getImpactColor(impact) {
      switch(impact){
        case "High": return "text-red-8";
        case "Moderate": return "text-orange-8";
        case "Low": return "text-green-8";
        default: return "text-grey-8";
      }
    }
  },
};
</script>