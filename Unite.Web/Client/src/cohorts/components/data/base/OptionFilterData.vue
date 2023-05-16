<template>
  <span>
    <q-badge color="grey-2" text-color="black" class="text-body2 text-weight-medium">
      {{ getLabel(value) }}
    </q-badge>
  </span>
</template>

<script>
export default {
  props: {
    filter: Object,
    value: [Object, String, Boolean, Number]
  },

  methods: {
    getLabel(value) {
      return this.filter.options(null).find(option => option.value == value)?.label || value;
    }
  }
}
</script>