<template>
  <q-dialog
    v-model="dialog"
    @keyup.esc="!importing && (dialog = false)"
    @hide="onClose"
    persistent>
    <q-card style="width: 800px; max-width: 90vw">
      <q-card-section>
        <div class="text-h6">Import Users</div>
      </q-card-section>

      <q-separator />

      <q-card-section class="q-gutter-y-sm">
        <div class="row items-center q-gutter-x-sm">
          <div>Download template:</div>
          <a :href="`${templatePath}.tsv`" download="template-users.tsv" class="u-link">TSV</a>
          <a :href="`${templatePath}.csv`" download="template-users.csv" class="u-link">CSV</a>
        </div>

        <q-file
          v-model="file"
          label="File (.tsv or .csv)"
          accept=".tsv,.csv"
          :disable="importing || imported"
          :error="!!fileError"
          :error-message="fileError"
          clearable square outlined dense>
          <template #prepend>
            <q-icon name="las la-paperclip" size="sm" />
          </template>
        </q-file>

        <template v-if="users.length">
          <q-table
            :rows="users"
            :columns="columns"
            v-model:pagination="pagination"
            :rows-per-page-options="[10, 25, 50, 100]"
            row-key="line"
            separator="cell"
            class="u-import-table"
            flat bordered dense>
            <template v-slot:body-cell-permissions="props">
              <q-td :props="props">
                <u-permissions-cell :permissions="props.value" />
              </q-td>
            </template>

            <template v-slot:body-cell="props">
              <q-td :props="props" :title="props.value">{{ props.value }}</q-td>
            </template>

            <template v-slot:body-cell-status="props">
              <q-td :props="props" :title="props.row.error ?? props.row.message">
                <span v-if="props.row.error" class="text-negative">{{ props.row.error }}</span>
                <span v-else-if="props.row.status == 'imported'" class="text-positive">Imported</span>
                <span v-else-if="props.row.status == 'failed'" class="text-negative">Failed: {{ props.row.message }}</span>
                <q-spinner v-else-if="props.row.status == 'importing'" color="primary" />
                <span v-else>Ready</span>
              </q-td>
            </template>
          </q-table>

          <q-linear-progress v-if="importing || imported" :value="progress" size="20px" color="primary" track-color="grey-3">
            <div class="absolute-full flex flex-center">
              <span class="text-caption text-white">{{ processedCount }} / {{ validUsers.length }}</span>
            </div>
          </q-linear-progress>

          <div class="row q-gutter-x-md">
            <div>Valid: <b>{{ validUsers.length }}</b></div>
            <div>Invalid (skipped): <b :class="{ 'text-negative': invalidCount }">{{ invalidCount }}</b></div>
            <template v-if="importing || imported">
              <div>Imported: <b class="text-positive">{{ importedCount }}</b></div>
              <div>Failed: <b :class="{ 'text-negative': failedCount }">{{ failedCount }}</b></div>
            </template>
          </div>
        </template>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn label="Close" :disable="importing" v-close-popup dense flat no-caps />
        <q-btn v-if="!imported" label="Import" :loading="importing" :disable="!validUsers.length" @click="importUsers" dense flat no-caps />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import UPermissionsCell from "./PermissionsCell.vue";
import { getFormat, readUsers } from "./users-file";
import api from "../../api/api-users";
import { mapState } from "vuex";

export default {
  components: {
    UPermissionsCell
  },

  emits: ["imported"],

  data() {
    return {
      dialog: false,
      templatePath: "/templates/identity/users",
      file: null,
      fileError: null,
      users: [],
      importing: false,
      imported: false,
      pagination: { page: 1, rowsPerPage: 10 },
      columns: [
        { name: "line", label: "Line", field: row => row.line, align: "left", style: "width: 50px" },
        { name: "email", label: "Email", field: row => row.email, align: "left", classes: "ellipsis", style: "max-width: 220px" },
        { name: "provider", label: "Provider", field: row => row.provider, align: "left", classes: "ellipsis", style: "max-width: 100px" },
        { name: "permissions", label: "Permissions", field: row => row.permissions, align: "left" },
        { name: "status", label: "Status", field: row => row.status, align: "left", classes: "ellipsis", style: "max-width: 250px" }
      ]
    }
  },

  computed: {
    ...mapState("identity", ["providers"]),

    validUsers() {
      return this.users.filter(user => !user.error);
    },

    invalidCount() {
      return this.users.length - this.validUsers.length;
    },

    importedCount() {
      return this.users.filter(user => user.status == "imported").length;
    },

    failedCount() {
      return this.users.filter(user => user.status == "failed").length;
    },

    processedCount() {
      return this.importedCount + this.failedCount;
    },

    progress() {
      return this.processedCount / this.validUsers.length;
    }
  },

  watch: {
    async file(file) {
      await this.readFile(file);
    }
  },

  methods: {
    async show() {
      if (!this.providers) {
        await this.$store.dispatch("identity/loadProviders");
      }
      this.dialog = true;
    },

    async readFile(file) {
      this.users = [];
      this.fileError = null;
      this.pagination.page = 1;

      if (!file)
        return;

      const format = getFormat(file.name);
      if (!format) {
        this.fileError = "Please, choose a .tsv or .csv file";
        return;
      }

      const content = await file.text();
      const result = readUsers(content, format, this.providers);
      if (result.error) {
        this.fileError = result.error;
      } else if (!result.users.length) {
        this.fileError = "The file has no users";
      } else {
        this.users = result.users.map(user => ({ ...user, status: null, message: null }));
      }
    },

    async importUsers() {
      this.importing = true;

      for (const user of this.validUsers) {
        await this.importUser(user);
      }

      this.importing = false;
      this.imported = true;

      if (this.importedCount)
        this.$emit("imported");
    },

    async importUser(user) {
      user.status = "importing";

      try {
        await api.create({ providerId: user.providerId, email: user.email, permissions: user.permissions });
        user.status = "imported";
      } catch (error) {
        user.status = "failed";
        user.message = this.getErrorMessage(error);
      }
    },

    // Identity returns a message string, or validation errors as { field: [messages] }.
    getErrorMessage(error) {
      const data = error?.data;

      if (!data)
        return error?.statusText || "Request failed";

      if (typeof data == "string")
        return data;

      const errors = data.errors ?? data;
      return Object.entries(errors)
        .map(([field, messages]) => `${field}: ${[].concat(messages).join(", ")}`)
        .join("; ");
    },

    onClose() {
      this.file = null;
      this.fileError = null;
      this.users = [];
      this.importing = false;
      this.imported = false;
      this.pagination = { page: 1, rowsPerPage: 10 };
    }
  }
}
</script>

<style lang="scss" scoped>
// Fixed height keeps the dialog size when the page or the page size changes; rows scroll under the sticky header.
// Long values are trimmed by the columns' ellipsis (full text in the cell tooltip), so rows keep one line.
.u-import-table {
  height: 375px;

  :deep(thead tr th) {
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: #fff;
  }
}
</style>
