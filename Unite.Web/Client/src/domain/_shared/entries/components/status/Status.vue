<template>
  <div v-if="status === true" class="circle bg-green-5 q-mt-xs" title="Data is up to date">
  </div>
  <div v-if="status === false" class="circle bg-orange-5 q-mt-xs" title="Data is being updated">
  </div>
</template>

<script>
export default {
  props: {
    action: {
      type: Function,
      required: true
    }
  },

  data() {
    return {
      status: null
    }
  },

  mounted() {
    this.refresh()
  },

  methods: {
    async refresh() {
      this.status = await this.action()
    }
  }
}
</script>

<style lang="scss" scoped>
.circle {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
</style>