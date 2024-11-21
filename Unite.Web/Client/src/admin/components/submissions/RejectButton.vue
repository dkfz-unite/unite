<template>
  <q-btn color="red" dense flat no-caps style: icon="las la-times-circle" label="Reject" @click="dialog = true" />
  
  <q-dialog
    v-model="dialog"
    @keyup.esc="onClose" 
    @keyup.enter="canConfirm && onConfirm()">
    <q-card>
      <q-card-section style="width: 400px;">
        <div class="text-h6">Reject submission {{ value }}</div>
      </q-card-section>

      <q-card-section class="q-gutter-y-sm">
        <div>
          <q-input v-model="reason" label="Enter rejection reason" autofocus dense />
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="Cancel" color="primary" dense flat no-caps @click="onClose" />
        <q-btn label="Confirm" color="red" :disable="!canConfirm" dense flat no-caps @click="onConfirm" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
  
<script>
import api from "../../api/api-submissions";

export default {
  props: {
    value: {
      type: [Number],
      required: true,
    },
  },

  data() {
    return {
      dialog: false,
      reason: null,
    };
  },

  computed: {
    canConfirm() {
      return this.reason?.length > 0;
    }
  },

  methods: {
    onClose() {
      this.reason = null;
      this.dialog = false;
    },

    async onConfirm() {
      const status = await api.updateRejectComment(this.value, this.reason);
      
      this.$emit("reject", status);
      this.onClose();
    }
  }
}
</script>