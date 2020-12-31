<template>
    <div>
        <div class="q-mt-sm">
            <u-chips-filter
                label="Name"
                placeholder="e.g. TTN"
                v-model="criteria.name"
                @input="onInput"
            />
        </div>
    </div>
</template>

<script>
import UChipsFilter from './standard/ChipsFilter.vue';

export default {
    props: ["value"],

    data(){
        return{
            criteria: this.value
        }
    },

    methods:{
        onInput(){
            this.criteria?.sanitise();
            
            this.$emit('input', this.criteria);
        },
    },

    components:{
        UChipsFilter: UChipsFilter
    }
}
</script>