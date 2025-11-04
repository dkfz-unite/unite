<template>
  <div class="col">
    <q-table :rows="entries" :pagination="{ rowsPerPage: rows }" separator="cell" flat bordered dense>
      <template v-slot:header-cell="props">
        <q-th :props="props" class="text-lowercase">
          {{ props.col.label || props.col.name }}
        </q-th>
      </template>
    </q-table>
  </div>
</template>

<script>
export default {
  props: {
    entries: {
      type: Array,
      required: true
    },
    rows: {
      type: Number,
      default: 10
    }
  }
}
</script>