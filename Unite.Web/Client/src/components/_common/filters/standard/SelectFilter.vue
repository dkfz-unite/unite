<template>
    <q-select
        :label="label"
        :value="value"
        :options="options"
        :disable="isDisabled"
        @input="onInput"
        multiple
        clearable
        use-chips
        emit-value
        map-options
        square outlined dense options-dense hide-dropdown-icon>
    </q-select>
</template>

<script>
export default {
    props: ["value", "options", "label"],

    computed:{
        isDisabled(){
            return !this.options || !this.options.length;
        }
    },

    methods:{
        onInput(value){
            this.$emit("input", value);
        }
    }
}
</script>