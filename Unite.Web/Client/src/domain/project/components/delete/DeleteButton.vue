<template>
  <u-delete-dialog
    ref="dialog"
    type="project"
    :id="reference"
    :action="onDelete"
    @success="$emit('deleted')">
    <template v-slot:details>
      <div class="col">
        <div>This will also delete:</div>
        <div>- all project donors with</div>
        <div>- all donor images</div>
        <div>- all donor specimens</div>
        <div>- all donor related sequencing data</div>
      </div>
    </template>
  </u-delete-dialog>

  <q-btn
    label="Delete"
    title="Delete project data"
    icon="las la-trash"
    color="red"
    dense flat no-caps
    :disable="!canDelete"
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

  computed:
  {
    canDelete() {
      return this.reference !== "Other";
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
