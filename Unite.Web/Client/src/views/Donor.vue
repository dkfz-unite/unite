<template>
    <div v-if="donor" class="col q-px-sm q-pt-sm q-gutter-y-sm">
        <div class="row">
            <q-breadcrumbs gutter="xs">
                <q-breadcrumbs-el icon="home" to="/" />
                <q-breadcrumbs-el label="Donors" to="/donors" />
                <q-breadcrumbs-el :label="$route.params.id"/>
            </q-breadcrumbs>
        </div>

        <!-- <div class="row">
            <span class="text-h4">{{$route.params.id}}</span>
        </div> -->

        <div class="row">
            <q-separator />

            <q-tabs v-model="tab" dense align="left">
                <q-tab name="summary" label="summary" icon="las la-user-circle" />
                <q-tab name="clinical" label="Clinical Data" icon="las la-stethoscope" />
                <q-tab name="mutations" label="Mutations" icon="las la-dna" disable />
                <q-tab name="cells" label="Cells" icon="las la-microscope" disable />
                <q-tab name="radiology" label="Radiology" icon="las la-x-ray" disable />
            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="tab" style="width:100%">
                <q-tab-panel name="summary" class="q-py-sm q-px-none">
                    <u-summary :donor="donor" />
                </q-tab-panel>    

                <q-tab-panel name="clinical" class="q-py-sm q-px-none">
                    <u-clinical-data :donor="donor" />
                </q-tab-panel>

                <q-tab-panel name="mutations" class="q-py-sm q-px-none">
                    <div class="col-12">
                        <div class="row">
                            <q-table
                                title="Samples"
                                :data="getSamples(donor.samples)"
                                dense flat bordered separator="cell"
                            />
                        </div>
                        <div class="row">
                            <q-table
                                title="Mutations" 
                                :data="donor.samples[0].mutations"
                                dense flat bordered separator="cell" 
                            />
                        </div>
                    </div>                    
                </q-tab-panel>
            </q-tab-panels>
        </div>
    </div>
</template>

<script>
import USummary from '@/components/donor/Summary.vue';
import UClinicalData from '@/components/donor/ClinicalData.vue';

import apiClient from '@/services/api/api.client.donors.js';

export default {
    data(){
        return{
            tab: "summary",
            donor: null
        }
    },

    async mounted(){
        this.donor = await apiClient.get(this.$route.params.id);
    },

    methods:{
        getSamples(){
            if(!this.donor || !this.donor.samples){
                return null;
            }

            return this.donor.samples.map(sample => {
                return {
                    name: sample.name,
                    link: sample.link,
                    type: sample.type,
                    subtype: sample.subtype
                }
            });
        }
    },

    components:{
        USummary: USummary,
        UClinicalData: UClinicalData
    }
}
</script>