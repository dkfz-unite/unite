<template>
    <div>
        <div>
            <u-chips-filter
                label="ID"
                placeholder="e.g. ABC-123"
                v-model="criteria.id"
                @input="onInput"
            />
        </div>

        <div class="q-mt-sm">
            <u-chips-filter
                label="Diagnosis"
                placeholder="e.g. Glioblastoma"
                v-model="criteria.diagnosis"
                @input="onInput"
            />
        </div>

        <div class="q-mt-sm">
            <u-select-filter
                label="Vital Status"
                :options="$store.state.filterOptions.vitalStatuses"
                v-model="criteria.vitalStatus"
                @input="onInput"
            />
        </div>

        <div class="q-mt-sm">
            <u-select-filter
                label="Gender"
                :options="$store.state.filterOptions.genders"
                v-model="criteria.gender"
                @input="onInput"
            />
        </div>

        <div class="q-mt-sm">
            <q-expansion-item label="Age" :value="true" dense dense-toggle>
                <div class="q-mt-xs">
                    <u-select-filter
                        label="Age Category"
                        :options="$store.state.filterOptions.ageCategories"
                        v-model="criteria.ageCategory"
                        @input="onInput"
                    />
                </div>

                <div class="q-mt-sm">
                    <u-number-filter
                        label="From"
                        placeholder="e.g. 50"
                        v-model="criteria.age.from"
                        @input="onInput"
                    />
                </div>

                <div class="q-mt-sm">
                    <u-number-filter
                        label="To"
                        placeholder="e.g. 75"
                        v-model="criteria.age.to"
                        @input="onInput"
                    />
                </div>
            </q-expansion-item>
        </div>
    </div>
</template>

<script>
import UChipsFilter from './standard/ChipsFilter.vue';
import UNumberFilter from './standard/NumberFilter.vue';
import USelectFilter from './standard/SelectFilter.vue';

export default {
    props: ["value"],

    data(){
        return{
            criteria: this.value
        }
    },

    methods:{
        onInput(){
            this.criteria.sanitise();

            this.$emit('input', this.criteria);
        }
    },

    components:{
        UChipsFilter: UChipsFilter,
        UNumberFilter: UNumberFilter,
        USelectFilter: USelectFilter
    }
}
</script>