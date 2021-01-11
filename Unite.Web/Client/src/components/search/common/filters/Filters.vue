<template>
    <div>
        <q-splitter :value="16" disable>
            <template v-slot:before>
                <q-tabs v-model="tab" dense align="left" vertical class="q-pa-none" active-color="primary">
                    <q-tab name="donor" icon="las la-user-circle" />
                    <q-tab name="mutation" icon="las la-dna" />
                    <q-tab name="cell" icon="las la-microscope" disable/>
                    <q-tab name="radiology" icon="las la-x-ray" disable/>
                </q-tabs>
            </template>

            <template v-slot:after>
                <div>
                    <q-tab-panels v-model="tab" class="q-mx-sm">
                        <q-tab-panel name="donor" class="q-pa-none">
                            <div>
                                <u-donor-filters
                                    v-model="criteria.donorFilters"
                                    @input="onInput"
                                />
                            </div>
                        </q-tab-panel>

                        <q-tab-panel name="mutation" class="q-pa-none">
                            <div>
                                <u-mutation-filters
                                    v-model="criteria.mutationFilters"
                                    @input="onInput"
                                />
                            </div>

                            <div class="q-mt-sm">
                                <q-expansion-item label="Gene" :value="true" dense dense-toggle>
                                    <div class="q-mt-xs">
                                        <u-gene-filters
                                            v-model="criteria.geneFilters"
                                            @input="onInput"
                                        />
                                    </div>
                                </q-expansion-item>
                            </div>
                        </q-tab-panel>

                        <q-tab-panel name="cell" class="q-pa-none">
                            <div>
                                <u-cell-filters
                                    v-model="criteria.cellLineFilters"
                                    @input="onInput"
                                />
                            </div>
                        </q-tab-panel>
                </q-tab-panels>
                </div>
            </template>
        </q-splitter>
    </div>
</template>

<script>
import UMutationFilters from '@/components/search/common/filters/MutationFilters.vue';
import UGeneFilters from '@/components/search/common/filters/GeneFilters.vue';
import UDonorFilters from '@/components/search/common/filters/DonorFilters.vue';
import UCellFilters from '@/components/search/common/filters/CellFilters.vue';

export default {
    props: ["value", "selected"],

    data(){
        return{
            tab: this.getSelectedTab(this.selected),
            criteria: this.value
        }
    },

    methods:{
        onInput(){
            this.$emit('input', this.criteria);
        },

        getSelectedTab(value){
            switch (value) {
                case "donor": return value;
                case "mutation": return value;
                case "cell": return value;
                case "radiology": return value;
                default: return "donor";
            }
        }
    },

    components:{
        UMutationFilters: UMutationFilters,
        UGeneFilters: UGeneFilters,
        UDonorFilters: UDonorFilters,
        UCellFilters: UCellFilters
    }
}
</script>