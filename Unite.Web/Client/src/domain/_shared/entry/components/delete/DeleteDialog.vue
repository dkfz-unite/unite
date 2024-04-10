<template>
  <q-dialog
    v-model="dialog"
    @keyup.esc="dialog = false"
    persistent>

    <q-card style="width: 450px">
      <q-card-section>
        <div class="text-h6">
          Delete {{ type }}
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section class="q-gutter-y-sm">
        <div class="row">
          Are you sure you want to delete {{ type }} '<b>{{ id }}</b>'?
        </div>
        <div class="row">
          <slot name="details"></slot>
        </div>
        <div class="row">
          <b class="text-red">This action cannot be undone.</b>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right" class="text-primary">
        <q-btn
          label="Cancel"
          flat no-caps
          dense v-close-popup
        />

        <q-btn
          label="Delete"
          color="red"
          :loading="loading"
          @click="onConfirm"
          dense flat no-caps
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      retuired: true
    },
    type: {
      type: String,
      required: true
    },
    action: {
      type: Function,
      required: true
    },
  },

  emits: ["success"],

  data() {
    return {
      dialog: false,
      loading: false
    };
  },

  methods: {
    show() {
      this.dialog = true;
    },

    async onConfirm() {
      try {
        this.loading = true;
        await this.action();
        setTimeout(() => {
          this.loading = false;
          this.dialog = false;
          this.notifySuccess("Success", `Successfully deleted ${this.type} '${this.id}'.`);
          this.$emit("success");
        }, 1000);
      } catch (error) {
        this.loading = false;
        this.notifyError("Error", `Failed to delete ${this.type} '${this.id}'.`);
      }
    },

    async notifySuccess(message, caption = undefined) {
      this.$q.notify({
        type: "positive",
        position: "bottom-right",
        timeout: 1000,
        message: message,
        caption: caption
      });
    },

    async notifyError(message, caption = undefined) {
      this.$q.notify({
        type: "negative",
        position: "bottom-right",
        timeout: 2000,
        message: message,
        caption: caption
      });
    }
  }
}
</script>
