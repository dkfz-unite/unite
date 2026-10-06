<template>
  <div class="col q-gutter-y-sm">
    <div class="row items-center">
      <div class="col">
        <span class="text-subtitle1">Available users</span>
      </div>
      <div class="col-auto">
        <q-btn
          label="Add to project"
          icon="las la-user-plus"
          :title="`Add selected users (${selected.length})`"
          color="secondary"
          :loading="adding"
          :disable="!selected.length"
          @click="addSelected"
          flat dense no-caps>
        </q-btn>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <q-table
          :rows="rows"
          :columns="columns"
          :loading="loading"
          selection="multiple"
          v-model:selected="selected"
          :pagination="{ rowsPerPage: 0 }"
          row-key="id"
          no-data-label="No users available to add"
          separator="cell"
          hide-bottom
          flat bordered dense>
        </q-table>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../../api";
import usersApi from "@/admin/api/api-users";

export default {
  props: {
    projectId: {
      type: [String, Number],
      required: true
    },
    // IDs of users already in the project; they are hidden from this list.
    excludeIds: {
      type: Array,
      default() {
        return [];
      }
    }
  },

  emits: ["added"],

  data() {
    return {
      loading: false,
      adding: false,
      users: [],
      selected: [],
      columns: [
        {
          name: "id",
          label: "ID",
          field: row => row.id,
          align: "left",
          style: "width: 60px",
          sortable: true
        },
        {
          name: "email",
          label: "Email",
          field: row => row.email,
          align: "left",
          sortable: true
        }
      ]
    }
  },

  computed: {
    rows() {
      const excluded = new Set(this.excludeIds);
      return this.users.filter(user => !excluded.has(user.id));
    }
  },

  watch: {
    // Drop selections of users that became project members.
    rows(rows) {
      this.selected = this.selected.filter(user => rows.includes(user));
    }
  },

  mounted() {
    this.getData();
  },

  methods: {
    async getData() {
      try {
        this.loading = true;
        this.users = await usersApi.search() || [];
      } catch (error) {
        this.users = [];
      } finally {
        this.loading = false;
        this.selected = [];
      }
    },

    async addSelected() {
      const userIds = this.selected.map(user => user.id);

      try {
        this.adding = true;
        await api.addUsers(this.projectId, userIds);
        this.notify("positive", "Success", `Added ${userIds.length} user(s) to the project.`);
        this.$emit("added");
        await this.getData();
      } catch (error) {
        this.notify("negative", "Error", "Failed to add users to the project.");
      } finally {
        this.adding = false;
      }
    },

    notify(type, message, caption = undefined) {
      this.$q.notify({
        type: type,
        position: "bottom-right",
        timeout: type === "positive" ? 1000 : 2000,
        message: message,
        caption: caption
      });
    }
  }
}
</script>
