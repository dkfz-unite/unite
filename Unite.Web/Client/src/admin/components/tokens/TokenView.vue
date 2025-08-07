<template>
  <div class="col q-gutter-sm">
    <div class="row">
      <div class="col">
        <span class="text-positive">{{ message }}</span>
      </div>
      <div class="col-auto">
        <q-btn icon="las la-copy" title="Copy" color="primary" size="sm" flat dense @click= copyToClipboard(value) />
      </div>
    </div>

    <div class="row">
      <div class="col">
        <q-input v-model="token" type="textarea" autogrow readonly outlined square dense />
      </div>
    </div>

    <div class="row">
      <div class="col">
        <span class="text-orange-6">Make sure to copy the token now. You won't be able to see it again!</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [String],
      required: true
    },

    message: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      token: this.value
    };
  },

  methods: {
    async copyToClipboard(value) {
      try {
        await navigator.clipboard.writeText(value);
        this.$q.notify({ type: "positive", position: "bottom-right", timeout: 3000, message: "Token copied to clipboard." });
      } catch (error) {
        this.$q.notify({ type: "negative", position: "bottom-right", timeout: 3000, message: "Failed to copy token." });
      }
    }
  }
}
</script>