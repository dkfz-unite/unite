<template>
    <div class="col" v-if="treatments">
        <div class="row">
            <span class="text-h5 u-text-title">Treatment</span>
        </div>

        <div class="q-mt-xs">
            <q-list bordered class="rounded-borders">
                <div v-for="(treatment, i) in treatments" :key="i">
                    <q-expansion-item 
                        :label="treatment.therapy"
                        header-class="u-text-key"
                        :caption="getDateRange(treatment.startDate, treatment.endDate)">
                        <q-item>
                            <q-item-section>
                                <div>
                                    <span class="text-bold">Details:</span>
                                    <span v-if="treatment.details">
                                        {{treatment.details}}
                                    </span>
                                    <span v-else>
                                        No data
                                    </span>
                                </div>
                                <div class="q-mt-xs">
                                    <span class="text-bold">Results:</span>
                                    <span v-if="treatment.results">
                                        {{treatment.results}}
                                    </span>
                                    <span v-else>
                                        No data
                                    </span>
                                </div>
                            </q-item-section>
                        </q-item>
                    </q-expansion-item>

                    <q-separator />
                </div>
            </q-list>
        </div>
    </div>
</template>

<script>
export default {
    props: ["treatments"],

    methods:{
        getDate(jsonDate){
            if(!jsonDate){
                return null;
            }

            var date = new Date(jsonDate);
            return date.toLocaleDateString();
        },

        getDateRange(startDateJson, endDateJson){
            if(!startDateJson){
                return null;
            }

            if(!endDateJson){
                return this.getDate(startDateJson);
            }
            else{
                return this.getDate(startDateJson) + ' - ' + this.getDate(endDateJson);
            }
        }
    },
}
</script>