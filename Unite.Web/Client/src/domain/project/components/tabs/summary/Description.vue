<template>
  <div class="col q-gutter-y-sm" v-if="project">
    <div class="row">
      <div class="col">
        <span class="text-h5 u-text-title">Description</span>
      </div>
      <div class="col-auto" v-if="canWriteData">
        <q-btn
          v-if="!editing"
          icon="las la-edit"
          title="Edit" alt="Edit"
          @click="editing = true"
          flat dense>
        </q-btn>
        <q-btn
          v-if="editing"
          icon="las la-times"
          title="Revert changes"
          color="negative"
          :loading="loading"
          @click="cancelChanges" 
          flat dense>
        </q-btn>
        <q-btn
          v-if="editing"
          icon="las la-check"
          title="Save changes"
          color="secondary"
          :loading="loading"
          @click="saveChanges" 
          flat dense>
        </q-btn>
      </div>
    </div>

    <div class="row q-gutter-x-xs">
      <div class="col">
        <q-card flat bordered>
          <q-card-section v-if="!editing" @dblclick="!canWriteData || (editing = true)">
            <p v-for="paragraph in description">{{ paragraph }}</p>
          </q-card-section>

          <q-card-section v-if="editing" class="q-px-md q-pt-sm q-pb-md">
            <q-input
              v-model="model.description"
              @keydown.esc="cancelChanges"
              type="textarea"
              autofocus autogrow dense>
            </q-input>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
// import Permissions from "@/_models/admin/enums/permissions";
import { mapGetters } from "vuex";
import api from "../../../api";

export default {
  props: {
    project: {
      type: Object,
      default() {
        return null;
      }
    }
  },

  data() {
    return {
      loading: false,
      editing: false,
      model: {
        description: this.project.description
      }
    }
  },

  computed: {
    ...mapGetters("identity", ["canWriteData"]),
    // canEdit() {
    //   const account = this.$store.state.identity.account;
    //   return account?.hasPermission(Permissions.Data.Edit);
    // },

    description() {
      var paragraphs = this.project.description?.split("\n")
        .map(paragraph => paragraph.trim())
        .filter(paragraph => !!paragraph);

      return paragraphs;
    }
  },

  mounted() {
    this.getData();
  },

  methods: {
    async getData() {
      try {
        this.loading = true;
        const description = await api.getDescription(this.project.id);
        if (description != null) {
          this.project.description = description;
        }
      } finally {
        this.loading = false;
        this.model.description = this.project.description;
      }
    },

    async saveChanges() {
      try {
        this.loading = true;
        const payload = { description: this.model.description };
        const description = await api.setDescription(this.project.id, payload);
        if (description != null) {
          this.project.description = description;
        }
      } finally {
        this.loading = false;
        this.editing = false;
        this.model.description = this.project.description;
      }
    },

    async cancelChanges() {
      this.model.description = this.project.description;
      this.editing = false;
    }
  }
}
</script>