<template>
  <u-delete-dialog
    ref="dialog"
    type="specimen"
    :id="reference"
    :action="onDelete"
    @success="$emit('deleted')">
    <template v-slot:details>
      <div class="col">
        <div>This will also delete:</div>
        <div>- all derived specimens</div>
        <div>- all specimen drugs screening data</div>
        <div>- all specimen related sequencing data</div>
      </div>
    </template>
  </u-delete-dialog>

  <q-btn
    label="Delete"
    title="Delete specimen data"
    icon="las la-trash"
    color="red"
    dense flat no-caps
    @click="$refs.dialog.show()">
  </q-btn>
</template>

<script>
import UDeleteDialog from "@/domain/_shared/entry/components/delete/DeleteDialog.vue";

import api from "../../../specimen/api";

export default {
  components: { UDeleteDialog },

  props: {
    id: {
      type: [String, Number],
      required: true 
    },
    reference: {
      type: String,
      required: true
    }
  },

  emits: ["deleted"],

  methods: {
    async onDelete() {
      await api.remove(this.id);
    }
  }
}
</script>
