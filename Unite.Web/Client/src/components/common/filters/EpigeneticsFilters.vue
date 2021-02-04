<template>
  <div class="col q-gutter-y-sm">
    <div>
      <u-select-filter
        label="Gene Expression Sybtype"
        :options="$store.state.filterOptions.geneExpressionSubtypes"
        v-model="criteria.geneExpressionSubtype"
        @input="onInput"
      />
    </div>

    <div>
      <u-select-filter
        label="IDH Status"
        :options="$store.state.filterOptions.idhStatuses"
        v-model="criteria.idhStatus"
        @input="onInput"
      />
    </div>

    <div>
      <u-select-filter
        label="IDH Mutation"
        :options="$store.state.filterOptions.idhMutations"
        v-model="criteria.idhMutation"
        @input="onInput"
      />
    </div>

    <div>
      <u-select-filter
        label="Methylation Status"
        :options="$store.state.filterOptions.methylationStatuses"
        v-model="criteria.methylationStatus"
        @input="onInput"
      />
    </div>

    <div>
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
import USelectFilter from "@/components/search/common/filters/standard/SelectFilter.vue";

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
        USelectFilter: USelectFilter
    }
};
</script>