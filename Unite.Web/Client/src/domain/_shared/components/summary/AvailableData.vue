<template>
  <q-markup-table class="table-strip" separator="cell" dense flat bordered>
    <colgroup>
      <col span="1" :style="{ width: $q.screen.lt.md ? '50%' : '30%' }" />
      <col span="1" :style="{ width: $q.screen.lt.md ? '50%' : '70%' }" />
    </colgroup>

    <tbody>
      <u-available-data-type v-for="type in types" :title="type.title" :available="type.available" />
    </tbody>
  </q-markup-table>
</template>

<script>
import UAvailableDataType from "./AvailableDataType.vue";

export default {
  components: {
    UAvailableDataType
  },

  props: {
    types: {
      type: Array,
      default: () => []
    }
  }
}
</script>