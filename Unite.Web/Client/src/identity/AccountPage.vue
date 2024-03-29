<template>
  <div class="col q-pa-md">
    <div class="row justify-center">

      <div class="col-12 col-sm-6 col-md-4 q-gutter-md">
        <!-- Header -->
        <div class="text-center">
          <div class="text-h4">Account</div>
          <div class="text-subtitle1 text-grey-8">Your account information</div>
        </div>

        <!-- General info -->
        <div>
          <q-card>
            <q-card-section>
              <div class="col q-gutter-md">
                <!-- Card header -->
                <div>
                  <div class="text-h6">General</div>
                  <div class="text-subtitle2 text-grey-8">
                    General information about your account
                  </div>
                </div>

                <!-- Email -->
                <div class="row">
                  <div class="col-12 col-sm-3">
                    <span class="text-subtitle1 text-bold">
                      Email
                    </span>
                  </div>

                  <div class="col-12 col-sm-9">
                    <span class="text-subtitle1">
                      {{ account.email }}
                    </span>
                  </div>
                </div>

                <!-- Provider -->
                <div class="row">
                  <div class="col-12 col-sm-3">
                    <span class="text-subtitle1 text-bold">
                      Provider
                    </span>
                  </div>

                  <div class="col-12 col-sm-9">
                    <span class="text-subtitle1">
                      {{ account.provider }}
                    </span>
                  </div>
                </div>

                <!-- Permissions -->
                <div class="row">
                  <div class="col-12 col-sm-3">
                    <span class="text-subtitle1 text-bold">
                      Permissions
                    </span>
                  </div>

                  <div class="col-12 col-sm-9">
                    <div v-for="group in account?.permissionsGrouped" :key="group.name" class="text-subtitle1 text-weight-medium">
                      {{group.name}} <span class="text-weight-regular text-italic">({{group.values.join(', ')}}) </span>
                    </div>
                  </div>
                </div>
              </div>
            </q-card-section>

            <q-separator />

            <q-card-actions align="right" class="q-px-md">
              <q-btn color="primary" icon="logout" @click="onLogOut">Log out</q-btn>
            </q-card-actions>
          </q-card>
        </div>

        <!-- Password change -->
        <div v-if="showChangePassword">
          <q-form @submit="onChangePassword" ref="changePasswordForm">
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
                    type="password"
                    :rules="oldPassword.rules"
                    lazy-rules
                    square
                    outlined
                    dense
                  />

                  <!-- New password -->
                  <q-input
                    label="Your new password"
                    v-model="newPassword.value"
                    :type="newPassword.show ? 'text' : 'password'"
                    :rules="newPassword.rules"
                    lazy-rules
                    square
                    outlined
                    dense
                  >
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
                    square
                    outlined
                    dense
                  >
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
                    Password must be minimum <strong>8</strong> characters
                    long and contain <strong>both</strong> <strong>letters</strong> 
                    and <strong>numbers</strong>.
                  </div>

                  <!-- Error -->
                  <div v-if="!!changingPasswordError">
                    <div class="text-hint text-red-9">
                      <template v-if="changingPasswordError == 400">
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
                <div v-if="changePasswordSuccess" class="text-hint text-green q-pr-md">
                  Password has been changed!
                </div>
                <q-btn color="primary" type="submit" :disable="!canChangePassword">Change</q-btn>
              </q-card-actions>
            </q-card>
          </q-form>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
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

      changingPassword: false,
      changingPasswordError: null,
      changePasswordSuccess: false
    };
  },

  computed: {
    account() {
      return this.$store.state.identity.account;
    },

    showChangePassword() {
      const token = this.$helpers.token.get();
      return token.data.authmethod === 'default';
    },

    canChangePassword() {
      let oldPasswordIsValid = this.oldPassword.rules.every(rule => 
        rule(this.oldPassword.value) === true);

      let newPasswordIsValid = this.newPassword.rules.every(rule => 
        rule(this.newPassword.value) === true);

      let newPsswordRepeatIsValid = this.newPasswordRepeat.rules.every(rule => 
        rule(this.newPasswordRepeat.value) === true);
      
      return oldPasswordIsValid && newPasswordIsValid && newPsswordRepeatIsValid;
    }
  },

  mounted() {
    // this.$refs.changePasswordForm.resetValidation();
  },

  methods: {
    async onLogOut() {
      await this.$store.dispatch("identity/logOut");
      this.$router.push({ name: 'home' });
    },

    async onChangePassword() {
      const payload = {
        oldPassword: this.oldPassword.value,
        newPassword: this.newPassword.value,
        newPasswordRepeat: this.newPasswordRepeat.value
      };
      
      this.changingPasswordError = null;
      this.changePasswordSuccess = false;
      this.changingPassword = true;
      this.changingPasswordError = await this.$store.dispatch("identity/changePassword", payload);
      this.changePasswordSuccess = !this.changingPasswordError;
      this.changingPassword = false;
      this.$refs.changePasswordForm.resetValidation();

      if (!this.changingPasswordError) {
        await this.$store.dispatch("identity/loadAccount");
        this.oldPassword.value = null;
        this.newPassword.value = null;
        this.newPasswordRepeat.value = null;
        setTimeout(() => {
          this.changePasswordSuccess = false;
        }, 3000);
      }
    }
  }
}
</script>