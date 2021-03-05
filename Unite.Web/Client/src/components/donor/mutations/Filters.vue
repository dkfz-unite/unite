<template>
  <div class="col q-gutter-y-sm">
    <div class="row">
      <u-mutation-filters v-model="criteria.mutationFilters" @input="onInput" />
    </div>

    <!-- <div class="row">
      <div class="col">
        <q-expansion-item label="Gene" :value="true" dense dense-toggle>
          <u-gene-filters v-model="criteria.geneFilters" @input="onInput" />
        </q-expansion-item>
      </div>
    </div> -->
  </div>
</template>

<script>
import UMutationFilters from "@/components/common/filters/MutationFilters.vue";
import UGeneFilters from "@/components/common/filters/GeneFilters.vue";

export default {
  props: ["value"],

  data() {
    return {
      criteria: this.value,
    };
  },

  methods: {
    onInput() {
      this.$emit("input", this.criteria);
    },
  },

  components: {
    UMutationFilters: UMutationFilters,
    UGeneFilters: UGeneFilters
  },
};
</script>