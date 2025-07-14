<template>
    <q-dialog
      v-model="dialog"
      @keyup.esc="onClose"
      @keyup.enter="canConfirm && onConfirm()">
      <q-card>
        <q-card-section style="width: 400px;">
          <div class="text-h6">Add token for {{ value?.name }}</div>
        </q-card-section>
  
        <q-card-section class="q-gutter-y-sm">
          <div>
            <q-input v-model="exMinutes" label="Expiry Minutes" autofocus dense />
          </div>
          <div>
            <q-input v-model="exHours" label="Expiry Hours" autofocus dense />
          </div>
          <div>
            <q-input v-model="exDays" label="Expiry Days" autofocus dense />
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
    value: Object,
  },

  data() {
    return {
      dialog: false,
      exDays: null,
      exHours: null,
      exMinutes: null,
    }
  },

  computed: {
    canConfirm() {
      return (this.exMinutes?.length > 0 || this.exHours?.length > 0 || this.exDays?.length > 0);
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

      const token = {
        expiryDays: this.exDays ? parseInt(this.expiryDays) : null,
        expiryHours: this.exHours ? parseInt(this.expiryHours) : null,
        expiryMinutes: this.exMinutes ? parseInt(this.exMinutes) : null,
      };

      this.$emit("confirm", token);
      this.expiry = null;
      this.dialog = false;
    }
  }
}
</script>