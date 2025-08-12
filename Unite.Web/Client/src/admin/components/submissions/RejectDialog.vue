<template>
  <q-dialog
    v-model="dialog"
    @keyup.esc="onClose"
    @keyup.enter="canConfirm && onConfirm()">
    <q-card>
      <q-card-section style="width: 400px;">
        <div class="text-h6">
          <template v-if="value != null">Reject submission {{ value }}</template>
          <template v-else>Reject all submissions</template>
        </div>
      </q-card-section>

      <q-card-section class="q-gutter-y-sm">
        <div>
          <q-input v-model="reason" label="Enter rejection reason" autofocus dense />
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="Cancel" @click="onClose" dense flat no-caps />
        <q-btn label="Confirm" :disable="!canConfirm" @click="onConfirm" dense flat no-caps />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    value: [Number, null],
  },

  data() {
    return {
      dialog: false,
      reason: null,
    }
  },

  computed: {
    canConfirm() {
      return this.reason?.length > 0;
    }
  },

  methods: {
    show() {
      this.dialog = true;
    },

    hide() {
      this.onClose();
    },

    onClose() {
      this.reason = null;
      this.dialog = false;
    },

    onConfirm() {
      const reason = this.reason;

      this.$emit("confirm", reason);
      this.reason = null;
      this.dialog = false;
    }
  }
}
</script>