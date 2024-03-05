<template>
  <u-array v-if="studies" :items="studies" v-slot="{item}">
    {{ item.name }}
  </u-array>
</template>

<script>
export default {
  props: {
    studies: {
      type: [Array, null],
      required: false
    }
  }
}
</script>