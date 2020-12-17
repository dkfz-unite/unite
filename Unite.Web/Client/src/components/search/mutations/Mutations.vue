<template>
    <div>
        <q-table
            title="Mutations"
            class="sticky-header" separator="cell" dense
            selection="multiple"
            row-key="id"
            :columns="columns"
            :data="data"
            :selected.sync="selected"
            :pagination.sync="pagination"
            :filter="filter"
            :loading="loading"
            @request="onRequest">
            
            <template v-slot:top-right>
                <q-input v-model="filter" placeholder="Search" dense debounce="300" style="width: 300px">
                    <template v-slot:append>
                        <q-icon name="search" />
                    </template>
                </q-input>
            </template>

            <template v-slot:body-cell-id="props">
                <q-td :props="props">
                    <router-link class="u-link" :to="'mutation/'+props.value">{{props.value}}</router-link>
                </q-td>
            </template>

            <template v-slot:body-cell-gene="props">
                <q-td :props="props">
                    <router-link class="u-link" :to="'gene/'+props.value.id">{{props.value.name}}</router-link>
                </q-td>
            </template>
        </q-table>
    </div>
</template>

<script>
export default {
    props: ["rows", "rowsSelected", "rowsTotal", "filters", "loading"],

    data(){
        return{
            columns: [
                { name: "id", label: "ID", field: row => row.id, sortable: false, required: true, align: 'left' },
                { name: "code", label: "DNA change", field: row => row.code, sortable: false },
                { name: "type", label: "Type", field: row => row.type, sortable: false },
                { name: "gene", label: "Gene", field: row => row.gene, sortable: false },
                { name: "donors", label: "Donors affected", field: row => row.donors, sortable: false }
            ],

            data: [],

            selected: [],

            filter: null,

            pagination: {
                page: 1,
                rowsPerPage: 10,
                rowsNumber: 0
            }
        }
    },

    watch:{
        rows(value){
            this.data = value;
        },

        rowsTotal(value){
            this.pagination.rowsNumber = value;
        },

        rowsSelected(value){
            this.selected = value;
        },


        selected(value){
            this.$emit('update:rowsSelected', value);
        },
    },

    mounted(){
        this.onRequest({pagination: this.pagination, filter: this.filter});
    },

    methods:{
        onRequest(props){
            let filters = {
                from: this.getFrom(props.pagination.page, props.pagination.rowsPerPage),
                size: this.getSize(props.pagination.rowsPerPage),
                term: props.filter
            };

            this.pagination.page = props.pagination.page;
            this.pagination.rowsPerPage = props.pagination.rowsPerPage;

            this.$emit('update:filters', filters);
        },

        getFrom(page, pageSize){
            if(page != null && page != undefined){
                return (page - 1) * pageSize + 1;
            }
            else{
                return 0;
            }
        },

        getSize(pageSize){
            if(pageSize != null && pageSize != undefined){
                return pageSize == 0 ? 10000 : pageSize;
            }
            else{
                return 10;
            }
        }
    }
}
</script>

<style lang="sass">
@import '@/styles/quasar.variables.scss'

.sticky-header
  /* height or max-height is important */
  height: 420px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #ffff

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

.u-link
    color: $blue-8
    text-decoration: none
    .u-link:visited
        color: $blue-8
        text-decoration: none

</style>