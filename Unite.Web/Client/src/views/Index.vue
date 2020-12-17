<template>
    <div class="row">
        <div class="col">
            <q-tabs v-model="tab" align="center" dense>
                <q-tab name="donors" label="Donors" />
                <q-tab name="mutations" label="Mutations" />
            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="tab">
                <q-tab-panel name="donors">
                    <donors-tab />
                </q-tab-panel>

                <q-tab-panel name="mutations">
                    <mutations-tab />
                </q-tab-panel>
            </q-tab-panels>
        </div>
    </div>
</template>

<script>
import DonorsTab from '@/components/search/DonorsTab.vue';
import MutationsTab from '@/components/search/MutationsTab.vue';

export default {
    data(){
        return{
            tab: "donors"
        }
    },

    components:{
        DonorsTab: DonorsTab,
        MutationsTab: MutationsTab
    }
}
</script>