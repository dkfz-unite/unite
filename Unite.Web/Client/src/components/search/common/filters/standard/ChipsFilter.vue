<template>
    <q-select
        :label="label"
        :placeholder="placeholderText"
        :value="value"
        @input="onInput"
        multiple
        clearable
        use-input 
        use-chips
        new-value-mode="add-unique"
        square outlined dense options-dense hide-dropdown-icon>
    </q-select>
</template>

<script>
export default {
    props: ["value", "label", "placeholder"],

    computed:{
        placeholderText(){
            return this.value?.length ? null : this.placeholder;
        }
    },

    methods:{
        onInput(value){
            this.$emit("input", value);
        }
    }
}
</script>