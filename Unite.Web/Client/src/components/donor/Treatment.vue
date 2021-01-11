<template>
    <div class="col" v-if="treatments">
        <div class="row">
            <span class="text-h5">Treatment</span>
        </div>

        <div class="q-mt-xs">
            <q-list bordered class="rounded-borders">
                <div v-for="treatment in treatments" :key="treatment.therapy.id">
                    <q-expansion-item 
                        :label="treatment.therapy.name"
                        caption="START DATE - END DATE">
                        <q-item>
                            <q-item-section>
                                <div>
                                    <span class="text-bold">Description:</span>
                                    <span v-if="treatment.description">
                                        {{treatment.description}}
                                    </span>
                                    <span v-else>
                                        No data
                                    </span>
                                </div>
                                <div class="q-mt-xs">
                                    <span class="text-bold">Results:</span>
                                    <span v-if="treatment.description">
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
    props: ["treatments"]
}
</script>