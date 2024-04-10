<template>
  <u-delete-dialog
    ref="dialog"
    type="image"
    :id="reference"
    :action="onDelete"
    @success="$emit('deleted')">
    <template v-slot:details>
      <div class="col">
        <div>This will also delete:</div>
        <div>- all image analysis data</div>
      </div>
    </template>
  </u-delete-dialog>

  <q-btn
    label="Delete"
    title="Delete image data"
    icon="las la-trash"
    color="red"
    dense flat no-caps
    @click="$refs.dialog.show()">
  </q-btn>
</template>

<script>
import UDeleteDialog from "@/domain/_shared/entry/components/delete/DeleteDialog.vue";

import api from "../../api";

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
