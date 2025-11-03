<template>
  <div class="col">
    <q-table :rows="entries" separator="cell" flat bordered dense>
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
    }
  }
}
</script>