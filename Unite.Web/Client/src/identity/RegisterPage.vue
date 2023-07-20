<template>
  <div class="col q-pa-md">
    <div class="row justify-center">
      <div class="col-12 col-sm-6 col-md-4 q-gutter-md">
        <!-- Header -->
        <div class="text-center">
          <div class="text-h4">Register</div>
          <div class="text-subtitle1 text-grey-8">Register new account</div>
        </div>

        <!-- Form -->
        <div>
          <q-form @submit="onSubmit" autocomplete="off" ref="registerForm">
            <q-card>
              <q-card-section>
                <div class="col q-gutter-md">
                  <!-- Card header -->
                  <div>
                    <div class="text-h6">Account</div>
                    <div class="text-subtitle2 text-grey-8">
                      Enter your account data
                    </div>
                  </div>

                  <!-- Email -->
                  <q-input
                    label="Enter your email"
                    hint="Only DKFZ UNITE member emails"
                    v-model="email.value"
                    autocomplete="off"
                    type="text"
                    :rules="email.rules"
                    lazy-rules square outlined dense
                  />

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
                    Password must be minimum <strong>8</strong> characters long
                    and contain <strong>both</strong>
                    <strong>letters</strong> and <strong>numbers</strong>.
                  </div>

                  <!-- Access list hint -->
                  <div class="text-hint">
                    Please note, that only emails of DKFZ
                    <strong>UNITE</strong> project members are in access list
                    and can be used to register account. If you're member of the
                    UNITE project, but still can't register, please, contact
                    UNITE <strong>PI</strong>s.
                  </div>

                  <!-- Errors -->
                  <div v-if="!!error">
                    <div class="text-hint text-red-9">
                      <template v-if="error == 400">
                        Provided email address is not in access list or is already registered.
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

              <q-card-actions align="right" class="q-px-md">
                <q-btn :to="{ name: 'login' }" flat>Login</q-btn>
                <q-btn color="primary" type="submit" :disable="!canSubmit">
                  Register
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
      email: {
        value: null,
        rules: [
          (val) => !!val || "Please, enter your email address",
          (val) => this.$helpers.string.isEmail(val) || "Please, use valid email address"
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
    };
  },

  computed: {
    canSubmit() {
      let results = [];

      this.email.rules.forEach((rule) => {
        results.push(rule(this.email.value) === true);
      });

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
    this.$refs.registerForm.resetValidation();
  },

  methods: {
    async onSubmit() {
      const payload = {
        email: this.email.value,
        password: this.password.value,
        passwordRepeat: this.passwordRepeat.value,
      };

      this.error = null;
      this.submitting = true;
      this.error = await this.$store.dispatch("identity/createAccount", payload);
      this.submitting = false;

      if (!this.error) {
        this.$router.push({ name: "login" });
      }
    }
  }
}
</script>