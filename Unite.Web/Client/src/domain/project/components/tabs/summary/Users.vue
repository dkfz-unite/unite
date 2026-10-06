<template>
  <div class="col q-gutter-y-sm" v-if="project">
    <div class="row">
      <span class="text-h5 u-text-title">Users</span>
    </div>

    <div class="row">
      <q-checkbox
        label="Public Project"
        :model-value="project.isPublic"
        :disable="updatingPublic"
        @update:model-value="setPublic"
        dense>
      </q-checkbox>
    </div>

    <div class="row">
      <u-users-add
        :project-id="project.id"
        :exclude-ids="userIds"
        @added="getData"
      />
    </div>

    <div class="row items-center">
      <div class="col">
        <span class="text-subtitle1">Project users</span>
      </div>
      <div class="col-auto">
        <q-btn
          label="Remove from project"
          icon="las la-user-minus"
          :title="`Remove selected users (${selected.length})`"
          color="negative"
          :loading="removing"
          :disable="!selected.length"
          @click="removeSelected"
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
          row-key="userId"
          no-data-label="No users added to the project"
          separator="cell"
          hide-bottom
          flat bordered dense>
        </q-table>
      </div>
    </div>
  </div>
</template>

<script>
import UUsersAdd from "./UsersAdd.vue";
import api from "../../../api";

export default {
  components: {
    UUsersAdd
  },

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
      removing: false,
      updatingPublic: false,
      rows: [],
      selected: [],
      columns: [
        {
          name: "id",
          label: "ID",
          field: row => row.userId,
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
    userIds() {
      return this.rows.map(user => user.userId);
    }
  },

  mounted() {
    this.getData();
  },

  methods: {
    async setPublic(value) {
      try {
        this.updatingPublic = true;
        await api.setPublic(this.project.id, value);
        this.project.isPublic = value;
        this.notify("positive", "Success", `Project is now ${value ? "public" : "private"}.`);
      } catch (error) {
        this.notify("negative", "Error", "Failed to change project visibility.");
      } finally {
        this.updatingPublic = false;
      }
    },

    async getData() {
      try {
        this.loading = true;
        this.rows = await api.getUsers(this.project.id) || [];
      } catch (error) {
        this.rows = [];
      } finally {
        this.loading = false;
        this.selected = [];
      }
    },

    async removeSelected() {
      const userIds = this.selected.map(user => user.userId);

      try {
        this.removing = true;
        await api.removeUsers(this.project.id, userIds);
        this.notify("positive", "Success", `Removed ${userIds.length} user(s) from the project.`);
        await this.getData();
      } catch (error) {
        this.notify("negative", "Error", "Failed to remove users from the project.");
      } finally {
        this.removing = false;
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
