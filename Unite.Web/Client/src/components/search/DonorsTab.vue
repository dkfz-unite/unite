<template>
    <div class="row">
        <div class="col-2">
            <u-filters 
                v-model="criteria"
                selected="donor"
                @input="fetchData" />
        </div>

        <div class="col">
            <u-donors
                :loading="loading"
                :rows="rows"
                :rows-total="rowsTotal"
                :rows-selected.sync="rowsSelected"
                :filters.sync="filters"
            />
        </div>
    </div>
</template>

<script>
import UFilters from '@/components/search/common/filters/Filters.vue';
import UDonors from '@/components/search/donors/Donors.vue';

import apiClient from '@/services/api/api.client.donors.js';

export default {
    data(){
        return{
            loading: false,
            rows: [],
            rowsSelected: [],
            rowsTotal: 0,
            filters: {
                from: 0,
                size: 10,
                term: null
            },

            criteria: this.$store.state.donors.searchCriteria,
        }
    },

    watch:{
        filters(value){
            this.criteria.from = value.from;
            this.criteria.size = value.size;
            this.criteria.term = value.term;

            this.fetchData();
        }
    },

    methods:{
        async fetchData(){
            this.loading = true;

            let data = await apiClient.search(this.criteria);

            this.loading = false;

            this.rows = data ? data.rows : [];
            this.rowsTotal = data ? data.total : 0;
        }
    },

    components:{
        UFilters: UFilters,
        UDonors: UDonors
    }
}
</script>