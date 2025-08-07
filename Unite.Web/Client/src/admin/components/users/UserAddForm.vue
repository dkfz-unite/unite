<template>
  <div class="col">
    <div class="row q-gutter-x-xs items-start">
      <div class="q-pt-xs">
        <span class="text-h6 text-weight-regular">Add</span>
      </div>

      <div>
        <q-input
          ref="email"
          label="Email"
          type="text"
          autocomplete="off"
          debounce="500"
          style="min-width: 250px"
          v-model="email.value"
          :loading="email.loading"
          :rules="email.rules"
          @clear="email.clear"
          @change="validateForm"
          lazy-rules clearable outlined dense
        />
      </div>

      <div>
        <q-select
          ref="provider"
          label="Provider"
          style="min-width: 200px"
          v-model="provider.value"
          :options="providers"
          dense options-dense outlined
        />
      </div>

      <div class="u-pt-1">
        <u-permissions-select v-model="permissions.value" />
      </div>

      <div class="u-pt-1">
        <q-btn
          title="Add User"
          icon="las la-plus-circle"
          :loading="loading"
          :disable="!valid"
          @click="submitForm"
        />
      </div>
    </div>
  </div>
</template>

<script>
import UPermissionsSelect from "./PermissionsSelect.vue";
import api from "../../api/api-users";
import { mapState } from 'vuex';

export default {
  components: {
    UPermissionsSelect
  },

  emits: ["submit"],

  data() {
    return {
      loading: false,
      valid: false,

      email: {
        value: null,
        loading: false,
        rules: [
          this.emailIsNotEmpty, 
          this.emailIsValid, 
          this.emailIsUnique 
        ],
        clear: () => {
          this.email.value = null;
          this.$refs.email.resetValidation();
          this.valid = false;
        }
      },
      provider: {
        value: null,
        clear: () => {
          this.provider.value = this.providers[0];
        }
      },
      permissions: {
        value: null,
        clear: () => {
          this.permissions.value = null;
        }
      }
    }
  },

  computed: {
    ...mapState("identity", ["providers",]),
  },

  async mounted() {
    if (!this.providers) {
      await this.$store.dispatch("identity/loadProviders");
    }
    this.provider.value = this.providers[0];
  },

  methods: {
    async emailIsNotEmpty(email) {
      return !!email || "Please, enter your email address";
    },

    async emailIsValid(email) {
      return this.$helpers.string.isEmail(email) || "Please, use valid email address";
    },

    async emailIsUnique(email) {
      let isValid = await this.emailIsValid(email);
      if (isValid !== true) 
        return false;

      let provider = this.provider.value;
      if (!provider) 
        return "Please, select provider";

      try {
        this.email.loading = true;
        let user = { providerId: this.provider.value.id,  email: email };
        let unique = await api.check(user);
        return unique || "Email address is already in use";
      } catch (error) {
        return "Could not check email availability";
      } finally {
        this.email.loading = false;
      }
    },

    async validateForm() {
      let results = [];

      for (let i = 0; i < this.email.rules.length; i++) {
        let rule = this.email.rules[i];
        let result = await rule(this.email.value);
        results.push(result === true);
      }

      this.valid = results.every(result => result === true);
    },

    async resetForm() {
      this.email.clear();
      this.provider.clear();
      this.permissions.clear();
    },

    async submitForm() {
      try {
        this.loading = true;
        await api.create({
          providerId: this.provider.value.id,
          email: this.email.value,
          permissions: this.permissions.value
        });
        await this.resetForm();
        this.$emit("submit");
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.u-pt-1 {
  padding-top: 1px;
}
</style>