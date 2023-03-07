<template>
  <div class="q-gutter-x-xs">
    <q-icon name="svguse:/icons.svg#u-tissue" size="xs" title="Tissue" />
    <router-link class="u-link" :to="{ name: 'tissue', params: { id: specimen.id }}">
      {{specimen.tissue.referenceId}}
    </router-link>
    <slot>
      <!-- Content -->
    </slot>
  </div>
</template>

<script>
export default {
  props: {
    specimen: {
      type: Object,
      required: true
    }
  }
}
</script>