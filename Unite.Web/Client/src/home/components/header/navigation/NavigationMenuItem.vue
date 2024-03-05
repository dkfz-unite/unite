<template>
  <q-item :to="to" :active="active">
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
    to: {
      type: [String, Object],
      required: true
    },
    title: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    }
  },

  computed: {
    active() {
      if (typeof this.to == "string")
        return this.$route.name == this.to;
      else if (typeof this.to == "object")
        return this.$route.name == this.to.name;
      else return false;
    }
  }
}
</script>