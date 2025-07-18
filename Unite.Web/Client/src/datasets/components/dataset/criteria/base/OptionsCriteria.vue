<template>
  <u-icon-exclude v-if="not" />
  
  <span v-for="(value, i) in values" :key="i">
    <span v-if="i != 0"> or </span>
    <q-badge color="grey-2" text-color="black" class="text-body2 text-weight-medium">
      {{ getLabel(value) }}
    </q-badge>
  </span>
</template>

<script>
import UIconExclude from './IconExclude.vue';

export default {
  components: {
    UIconExclude 
  },

  props: {
    filter: Object,
    values: Array,
    not: [Boolean, null]
  },

  methods: {
    getLabel(value) {
      return this.filter.options(null).find(option => option.value == value)?.label || value;
    }
  }
}
</script>