<template>
  <a class="u-link" target="blank" :href="to">
    <div class="row items-center q-gutter-x-xs">
      <div>
        <q-icon name="open_in_new" size="xs"/>
      </div>
      <div>
        <slot>{{ to }}</slot>
      </div>
    </div>
  </a>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: true
    }
  }
}
</script>