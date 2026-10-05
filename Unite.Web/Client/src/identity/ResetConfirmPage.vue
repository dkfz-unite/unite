<template>
  <div class="col q-pa-md">
    <div class="row justify-center">
      <div class="col-12 col-sm-6 col-md-4 q-gutter-md">
        <!-- Header -->
        <div class="text-center">
          <div class="text-h4">Reset</div>
          <div class="text-subtitle1 text-grey-8">Reset your password</div>
        </div>

        <!-- Form -->
        <div>
          <q-form @submit="onSubmit" autocomplete="off" ref="resetForm">
            <q-card>
              <q-card-section>
                <div class="col q-gutter-md">
                  <!-- Card header -->
                  <div>
                    <div class="text-h6">Password</div>
                    <div class="text-subtitle2 text-grey-8">
                      Reset your password
                    </div>
                  </div>

                  <!-- Password -->
                  <q-input
                    label="Create your new password"
                    v-model="password.value"
                    autocomplete="off"
                    :type="password.show ? 'text' : 'password'"
                    :rules="password.rules"
                    lazy-rules square outlined dense
                  >
                    <template v-slot:append>
                      <q-icon
                        class="cursor-pointer"
                        :name="password.show ? 'visibility' : 'visibility_off'"
                        @click="password.show = !password.show"
                      />
                    </template>
                  </q-input>

                  <!-- Password repeat -->
                  <q-input
                    label="Repeat your new password"
                    v-model="passwordRepeat.value"
                    :type="passwordRepeat.show ? 'text' : 'password'"
                    :rules="passwordRepeat.rules"
                    lazy-rules square outlined dense
                  >
                    <template v-slot:append>
                      <q-icon
                        class="cursor-pointer"
                        :name="passwordRepeat.show ? 'visibility' : 'visibility_off'"
                        @click="passwordRepeat.show = !passwordRepeat.show"
                      />
                    </template>
                  </q-input>

                  <!-- Password hint -->
                  <div class="text-hint">
                    Password must be minimum <b>8</b> characters long
                    and contain <b>both</b> <b>letters</b> and <b>numbers</b>.
                  </div>

                  <!-- Errors -->
                  <div v-if="!!error">
                    <div class="text-hint text-red-9">
                      Something wrong has happened. Please, refresh the page and
                      try again.
                    </div>
                  </div>

                  <!-- Success -->
                  <div v-if="submitted">
                    <div class="text-hint text-green-9">
                      Your password has been successfully reset.<br>
                      You can now <u-link to="/login">log in</u-link> with your new password.
                    </div>
                  </div>
                </div>
              </q-card-section>

              <q-separator v-if="!submitted" />

              <q-card-actions v-if="!submitted" align="right" class="q-px-md">
                <q-btn color="primary" type="submit" :disable="!canSubmit">
                  Reset
                </q-btn>
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
      token: {
        value: this.$route.params.token,
        rules: [
          (val) => !!val || "Token is required"
        ]
      },
      password: {
        value: null,
        show: false,
        rules: [
          (val) => !!val || "Please, enter your password",
          (val) => !(val?.length < 8) || "Password should be at least 8 characters long",
          (val) => this.$helpers.string.hasLetter(val) || "Password should contain at least 1 letter",
          (val) => this.$helpers.string.hasNumber(val) || "Password should contain at least 1 number"
        ]
      },
      passwordRepeat: {
        value: null,
        show: false,
        rules: [
          (val) => !!val || "Please, repeat your password",
          (val) => val == this.password.value || "Passwords should match"
        ]
      },

      error: null,
      submitting: false,
      submitted: false
    };
  },

  computed: {
    canSubmit() {
      let results = [];

      this.password.rules.forEach((rule) => {
        results.push(rule(this.password.value) === true);
      });

      this.passwordRepeat.rules.forEach((rule) => {
        results.push(rule(this.passwordRepeat.value) === true);
      });

      return results.every((result) => result === true);
    }
  },

  mounted() {
    this.$refs.resetForm.resetValidation();
  },

  methods: {
    async onSubmit() {
      const payload = {
        token: this.token.value,
        password: this.password.value,
        passwordRepeat: this.passwordRepeat.value
      };

      this.error = null;
      this.submitting = true;
      this.submitted = false;
      this.error = await this.$store.dispatch("identity/confirmPasswordReset", payload);
      this.submitting = false;

      if (!this.error) {
        this.submitted = true;
      }
    }
  }
}
</script>