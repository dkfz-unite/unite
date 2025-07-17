<template>
  <u-icon-exclude v-if="not" />
  
  <template v-if="value.from != null && value.to != null">
    <span>
      Between 
      <q-badge color="grey-2" text-color="black" class="text-body2 text-weight-medium">{{value.from}}</q-badge> and
      <q-badge color="grey-2" text-color="black" class="text-body2 text-weight-medium">{{value.to}}</q-badge>
    </span>
  </template>

  <template v-else-if="value.from != null && value.to == null">
    <span> 
      Greater than
      <q-badge color="grey-2" text-color="black" class="text-body2 text-weight-medium">{{value.from}}</q-badge>
    </span>
  </template>

  <template v-else-if="value.to != null && value.from == null">
    <span> 
      Less than
      <q-badge color="grey-2" text-color="black" class="text-body2 text-weight-medium">{{value.to}}</q-badge>
    </span>
  </template>

  <template v-else>
    Range is not set.
  </template>
</template>

<script>
import UIconExclude from './IconExclude.vue';

export default {
  components: {
    UIconExclude 
  },

  props: {
    filter: Object,
    value: Object,
    not: [Boolean, null]
  }
}
</script>