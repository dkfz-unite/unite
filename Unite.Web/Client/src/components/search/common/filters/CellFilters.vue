<template>
    <div>
        <div>
            <u-chips-filter
                label="ID"
                placeholder="e.g. 23"
                v-model="criteria.id"
                @input="onInput"
            />
        </div>

        <div class="q-mt-sm">
            <u-chips-filter
                label="Name"
                placeholder="e.g. TTSL"
                v-model="criteria.name"
                @input="onInput"
            />
        </div>

        <div class="q-mt-sm">
            <u-select-filter
                label="Type"
                :options="$store.state.filterOptions.cellLineTypes"
                v-model="criteria.type"
                @input="onInput"
            />
        </div>

        <div class="q-mt-sm">
            <u-select-filter
                label="Species"
                :options="$store.state.filterOptions.species"
                v-model="criteria.species"
                @input="onInput"
            />
        </div>

        <div class="q-mt-sm">
            <u-select-filter
                label="Gene Expression Sybtype"
                :options="$store.state.filterOptions.geneExpressionSubtypes"
                v-model="criteria.geneExpressionSubtype"
                @input="onInput"
            />
        </div>

        <div class="q-mt-sm">
            <u-select-filter
                label="IDH Status"
                :options="$store.state.filterOptions.idhStatuses"
                v-model="criteria.idhStatus"
                @input="onInput"
            />
        </div>

        <div class="q-mt-sm">
            <u-select-filter
                label="IDH Mutation"
                :options="$store.state.filterOptions.idhMutations"
                v-model="criteria.idhMutation"
                @input="onInput"
            />
        </div>

        <div class="q-mt-sm">
            <u-select-filter
                label="Methylation Status"
                :options="$store.state.filterOptions.methylationStatuses"
                v-model="criteria.methylationStatus"
                @input="onInput"
            />
        </div>

        <div class="q-mt-sm">
            <u-select-filter
                label="Methylation Subtype"
                :options="$store.state.filterOptions.methylationSubtypes"
                v-model="criteria.methylationSubtype"
                @input="onInput"
            />
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

    methods: {
        onInput(){
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