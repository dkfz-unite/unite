<template>
  <q-dialog
    v-model="dialog"
    @keyup.esc="onClose"
    @keyup.enter="canConfirm && onConfirm()">
    <q-card>
      <q-card-section style="width: 400px;">
        <div class="text-h6">
          <template v-if="ids.length === 1">Reject submission {{ ids[0] }}</template>
          <template v-else>Reject {{ ids.length }} submissions</template>
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
  data() {
    return {
      dialog: false,
      ids: [],
      reason: null
    }
  },

  computed: {
    canConfirm() {
      return this.reason?.length > 0;
    }
  },

  methods: {
    show(ids) {
      this.ids = ids;
      this.reason = null;
      this.dialog = true;
    },

    hide() {
      this.onClose();
    },

    onClose() {
      this.ids = [];
      this.reason = null;
      this.dialog = false;
    },

    onConfirm() {
      this.$emit("confirm", this.ids, this.reason);

      this.onClose();
    }
  }
}
</script>