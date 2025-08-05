<template>
    <q-dialog
      v-model="dialog"
      @keyup.esc="onClose"
      @keyup.enter="canConfirm && onConfirm()">
      <q-card>
        <q-card-section v-if="value === null">
          <div class="text-h6">Add Token</div>
        </q-card-section>
        <q-card-section v-else>
          <div class="text-h6">Token added successfully!</div>
        </q-card-section>

        <q-card-section v-if="value === null" class="q-gutter-y-sm">
          <table>
            <tbody>
              <tr>
                <td>Name</td>
                <td>
                  <q-input outlined v-model="name" label="Name" autofocus dense />
                </td>
              </tr>
              <tr>
                <td>Description</td>
                <td>
                  <q-input outlined v-model="description" label="Description" autofocus dense />
                </td>
              </tr>
              <tr>
                <td>Expiry Time</td>
                <td class="row q-gutter-x-sm">
                  <q-input outlined v-model="exDays" label="Days" autofocus dense style="width: 100px;"/>
                  <q-input outlined v-model="exHours" label="Hours" autofocus dense style="width: 100px;"/>
                  <q-input outlined v-model="exMinutes" label="Minutes" autofocus dense style="width: 100px;"/>
                </td>
              </tr>
              <tr>
                <td>
                  Permissions
                </td>
                <td>
                  <u-permissions-select v-model="permissions.value" />
                </td>
              </tr>
            </tbody>
          </table>
        </q-card-section>
        <q-card-section v-else>
          <div align="right">
            <q-btn
              flat
              dense
              size ="sm"
              icon="las la-copy"
              @click= copyToClipboard(value)
              color="primary"
            />
          </div>
          <div>
            <textarea readonly class="q-pa-sm" style="width: 600px; height: 150px; color: green">
              {{ value }}
            </textarea>
          </div>
          <div align="center" style="color: red;">Make sure to copy your personal access token now. You won't be able to see it again!</div>
        </q-card-section>
  
        <q-card-actions align="right">
          <q-btn v-if="value === null" label="Cancel" @click="onClose" dense flat no-caps />
          <q-btn v-if="value === null" label="Confirm" :disable="!canConfirm" @click="onConfirm" dense flat no-caps />
          <q-btn v-else label="Close" @click="onClose" dense flat no-caps style="height: 50px;"/>
        </q-card-actions>
        
      </q-card>
    </q-dialog>
  </template>

<script>
import UPermissionsSelect from "./PermissionsSelect.vue";
import api from "../../api/api-tokens";
import { QTable } from "quasar";
export default {
  components: {
    UPermissionsSelect
  },
  props: {
    value: Object
  },

  data() {
    return {
      dialog: false,
      exDays: null,
      exHours: null,
      exMinutes: null,
      name: null,
      description: null,
      value : null,

      permissions: {
        value: null,
        clear: () => {
          this.permissions.value = null;
        }
      },
    }
  },

  computed: {
    canConfirm() {
      return this.name?.length > 0 && (this.exMinutes?.length > 0 || this.exHours?.length > 0 || this.exDays?.length > 0);
    }
  },

  methods: {
    show() {
      this.dialog = true;
    },

    onClose() {
      this.dialog = false;
      this.value = null;
    },

    onClear() {
      this.name = null;
      this.description = null;
      this.exDays = null;
      this.exHours = null;
      this.exMinutes = null;
      this.permissions.clear();
    },

    onConfirm() {
      const expiryDate = {
        expiryDays: this.exDays ? parseInt(this.exDays) : null,
        expiryHours: this.exHours ? parseInt(this.exHours) : null,
        expiryMinutes: this.exMinutes ? parseInt(this.exMinutes) : null
      }

      const token = {
        name: this.name,
        description: this.description,
        permissions: this.permissions.value ? this.permissions.value : null,
        expiryDate: expiryDate
      };
      this.addToken(token);
      this.onClear();
    },
    
    async addToken(token) {
      this.value = await api.addToken(token);
      this.$emit("confirm");
    },

    async copyToClipboard(value) {
      navigator.clipboard.writeText(value)
        .then(() => {
          this.$q.notify({ type: 'positive', message: 'Token copied to clipboard!' })
        })
        .catch(() => {
          this.$q.notify({ type: 'negative', message: 'Failed to copy token.' })
        })
    },
      
    async onRowSelected(event, row, index) {
      if (row == this.row)
        return;
      this.row = row;
      await this.loadTokens();
    }

  }
}
</script>