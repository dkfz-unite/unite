<template>
    <q-dialog
      v-model="dialog"
      @keyup.esc="onClose"
      @keyup.enter="canConfirm && onConfirm()">
      <q-card>
        <q-card-section v-if="token === null" style="width: 500px;">
          <div class="text-h5">Extend token for {{ value?.name }}</div>
        </q-card-section>
        <q-card-section v-else style="width: 500px;">
          <div class="text-h5">Token extended successfully</div>
        </q-card-section>

        <q-card-section v-if="token === null">
          <table>
            <tbody>
              <tr>
                <td style="width: 100px;height: 40px;">Name</td>
                <td>{{ value?.name }}</td>
              </tr>
              <tr>
                <td style="width: 100px;height: 40px;">Description</td>
                <td>{{ value?.description }}</td>
              </tr>
              <tr>
                <td style="width: 100px;height: 40px;">Expiry Status</td>
                <td>{{ value?.tokenExpiryDateStatus }}</td>
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
                <td style="width: 100px;height: 40px;">Permissions</td>
                <td>
                  <u-permissions-select v-if="value" v-model="value.permissions" />
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
              {{ token }}
            </textarea>
          </div>
          <div align="center" style="color: red;">Make sure to copy your personal access token now. You won't be able to see it again!</div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn v-if="token === null" label="Cancel" @click="onClose" dense flat no-caps />
          <q-btn v-if="token === null" label="Confirm" :disable="!canConfirm" @click="onConfirm" dense flat no-caps />
          <q-btn v-else label="Close" @click="onClose" dense flat no-caps />
        </q-card-actions>

      </q-card>
    </q-dialog>
  </template>

<script>
import UPermissionsSelect from "./PermissionsSelect.vue";
import api from "../../api/api-tokens";
import { readonly } from "vue";
export default {
  components: {
    UPermissionsSelect
  },
  props: {
    value: Object,
    // modelValue: {
    //   type: Array,
    //   default: () => []
    // }
  },

  data() {
    return {
      exDays: null,
      exHours: null,
      exMinutes: null,
      dialog: false,
      extendPermissions : null,
      token: null,
    }
  },

  computed: {
    canConfirm() {
      return (this.exDays?.length > 0 || this.exHours?.length > 0 || this.exMinutes?.length > 0);
    }
  },

  methods: {
    show() {
      this.dialog = true;
    },

    hide() {
      this.token = null;
    },

    onClose() {
      this.dialog = false;
      this.resetForm();
    },

    async resetForm() {
      this.exDays = null;
      this.exHours = null;
      this.exMinutes = null;
    },

    async onConfirm() {
      const expiryDate = {
        expiryDays: this.exDays ? parseInt(this.exDays) : null,
        expiryHours: this.exHours ? parseInt(this.exHours) : null,
        expiryMinutes: this.exMinutes ? parseInt(this.exMinutes) : null
      };

      const tokenModel = {
        expiryDate: expiryDate,
        permissions: this.permissions ? this.permissions : null,
      };

      this.onExtend(tokenModel);
      await this.resetForm();
    },

    async onExtend(tokenModel) {
      this.token = await api.extendToken(this.value.id, tokenModel);
      this.$emit("confirm");
    },

    formatPermissions(permissions) {
      if (permissions != null && permissions.length > 0) {
        return permissions.map(access => "Data." + access);
      }
      return "";
    },

    async copyToClipboard(value) {
      navigator.clipboard.writeText(value)
        .then(() => {
          this.$q.notify({ type: 'positive', message: 'Token copied to clipboard!' })
        })
        .catch(() => {
          this.$q.notify({ type: 'negative', message: 'Failed to copy token.' })
        })
    }
  }
}
</script>