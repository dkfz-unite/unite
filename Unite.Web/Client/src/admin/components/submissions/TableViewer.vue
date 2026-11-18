<template>
  <div class="col">
    <q-table :rows="entries" :pagination="{ rowsPerPage: rows }" separator="cell" flat bordered dense>
      <template v-if="title || subtitle" v-slot:top>
        <div>
          <div v-if="title" class="text-subtitle1 text-weight-medium">{{ title }}</div>
          <div v-if="subtitle" :class="subtitleClass">{{ subtitle }}</div>
        </div>
      </template>

      <template v-slot:header-cell="props">
        <q-th :props="props" class="text-lowercase">
          {{ props.col.label || props.col.name }}
        </q-th>
      </template>

      <!-- TODO: Move to generic slot for cells -->
      <template v-slot:body-cell-gene_knockouts="props">
        <q-td :props="props">
          {{ Array.isArray(props.value) ? props.value.join(", ") : props.value }}
        </q-td>
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
    },
    title: {
      type: String,
      default: null
    },
    subtitle: {
      type: String,
      default: null
    },
    subtitleClass: {
      type: String,
      default: null
    }
  }
}
</script>
