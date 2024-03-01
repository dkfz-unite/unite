<template>
  <q-item :active="active" :disable="disable">
    <q-item-section>
      <div class="row q-gutter-x-sm q-py-sm">
        <q-icon :name="icon" size="sm" />
        <div>
          <slot>{{ title }}</slot>
        </div>
      </div>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  props: {
    title: {
      type: [String, null],
      default: null
    },

    icon: {
      type: [String, null],
      default: null
    },

    active: {
      type: Boolean,
      default: false
    },

    disable: {
      type: Boolean,
      default: false
    },
  }
}
</script>