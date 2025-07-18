<template>
  <q-icon
    title="Exclude"
    class="q-ma-none q-pa-none"
    :class="{ 'u-icon-neg' : exclude && !disable, 'u-icon-pos': !exclude && !disable, 'u-icon-dis': disable }"
    name="las la-minus-circle" size="22px"
  />
  <!-- :name="exclude ? 'remove_circle' : 'remove_circle_outline'" size="22px" -->
</template>

<script>
export default {
  props: {
    exclude: [Boolean, null],
    disable: [Boolean, null],
  }
}
</script>

<style lang="scss" scoped>
.u-icon-pos {
  color: $grey-6;
  &:hover {
    cursor: pointer;
    color: $grey-7;
  }
}

.u-icon-neg {
  color: $red-5;
  &:hover {
    cursor: pointer;
    color: $red-7;
  }
}

.u-icon-dis {
  color: $grey-4;
}
</style>