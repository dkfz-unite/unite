<template>
  <tr>
    <td class="u-text-key">{{ title }}</td>
    <td>
      <q-icon v-if="available" color="green" size="sm" name="las la-check" />
      <q-icon v-else color="grey" size="sm" name="las la-minus" />
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    title: {
      Type: String,
      required: true
    },
    available: {
      Type: Boolean,
      required: true
    }
  }
}
</script>