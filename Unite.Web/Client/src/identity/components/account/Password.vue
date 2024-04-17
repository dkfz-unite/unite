<template>
  <q-form @submit="onChange" ref="form">
    <q-card>
      <q-card-section>
        <div class="col q-gutter-md">
          <!-- Card header -->
          <div>
            <div class="text-h6">Password</div>
            <div class="text-subtitle2 text-grey-8">
              Here you can change your password
            </div>
          </div>

          <!-- Old password -->
          <q-input
            label="Your current password"
            v-model="oldPassword.value"
            :type="'password'"
            :rules="oldPassword.rules"
            lazy-rules square outlined dense
          />

          <!-- New password -->
          <q-input
            label="Your new password"
            v-model="newPassword.value"
            :type="newPassword.show ? 'text' : 'password'"
            :rules="newPassword.rules"
            lazy-rules square outlined dense>
            <template v-slot:append>
              <q-icon
                class="cursor-pointer"
                :name="newPassword.show ? 'visibility' : 'visibility_off'"
                @click="newPassword.show = !newPassword.show"
              />
            </template>
          </q-input>

          <!-- New password repeat -->
          <q-input
            label="Repeat your new password"
            v-model="newPasswordRepeat.value"
            :type="newPasswordRepeat.show ? 'text' : 'password'"
            :rules="newPasswordRepeat.rules"
            lazy-rules
            square outlined dense>
            <template v-slot:append>
              <q-icon
                class="cursor-pointer"
                :name="newPasswordRepeat.show ? 'visibility' : 'visibility_off'"
                @click="newPasswordRepeat.show = !newPasswordRepeat.show"
              />
            </template>
          </q-input>

          <!-- Password hint -->
          <div class="text-hint">
            Password must be minimum <b>8</b> characters
            long and contain <b>both</b> <b>letters</b> 
            and <b>numbers</b>.
          </div>

          <!-- Error -->
          <div v-if="!!error">
            <div class="text-hint text-red-9">
              <template v-if="error == 400">
                Provided current password is not correct. Please check your 
                current password and try again.
              </template>
              <template v-else>
                Something wrong has happened. Please, refresh the page and
                try again.
              </template>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right" class="q-mx-sm">
        <div v-if="success" class="text-hint text-green q-pr-md">
          Password has been changed!
        </div>
        <q-btn color="primary" type="submit" :disable="!canChange">Change</q-btn>
      </q-card-actions>
    </q-card>
  </q-form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      oldPassword: {
        value: null,
        rules: [(val) => !!val || "Please, enter your current password"]
      },

      newPassword: {
        value: null,
        show: false,
        rules: [
          (val) => !!val || "Please, enter your new password",
          (val) => !(val.length < 8) || "Password should be at least 8 characters long",
          (val) => this.$helpers.string.hasLetter(val) || "Password should contain at least 1 letter",
          (val) => this.$helpers.string.hasNumber(val) || "Password should contain at least 1 number"
        ]
      },

      newPasswordRepeat: {
        value: null,
        show: false,
        rules: [
          (val) => !!val || "Please, repeat your new password",
          (val) => val == this.newPassword.value || "Passwords should match"
        ]
      },

      loading: false,
      success: false,
      error: null,
      
    };
  },

  computed: {
    ...mapGetters("identity", ["account"]),

    canChange() {
      let oldPasswordIsValid = this.oldPassword.rules.every(rule => 
        rule(this.oldPassword.value) === true);

      let newPasswordIsValid = this.newPassword.rules.every(rule => 
        rule(this.newPassword.value) === true);

      let newPsswordRepeatIsValid = this.newPasswordRepeat.rules.every(rule => 
        rule(this.newPasswordRepeat.value) === true);
      
      return oldPasswordIsValid && newPasswordIsValid && newPsswordRepeatIsValid;
    }
  },

  methods: {
    ...mapActions("identity", ["changePassword", "loadAccount"]),

    async onChange() {
      const payload = {
        oldPassword: this.oldPassword.value,
        newPassword: this.newPassword.value,
        newPasswordRepeat: this.newPasswordRepeat.value
      };
      
      this.error = null;
      this.success = false;
      this.changing = true;
      this.error = await this.changePassword(payload);
      this.success = !this.error;
      this.changing = false;
      this.$refs.form.resetValidation();

      if (this.success) {
        await this.loadAccount();
        this.oldPassword.value = null;
        this.newPassword.value = null;
        this.newPasswordRepeat.value = null;
        setTimeout(() => {
          this.success = false;
        }, 3000);
      }
    }
  }
}
</script>