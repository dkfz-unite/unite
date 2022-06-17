<template>
  <div class="col q-pa-md">
    <div class="row justify-center">
      <div class="col-12 col-sm-6 col-md-4 q-gutter-md">
        <!-- Header -->
        <div class="text-center">
          <div class="text-h4">Login</div>
          <div class="text-subtitle1 text-grey-8">Log in to your account</div>
        </div>

        <!-- Form -->
        <div>
          <q-form @submit="onSubmit" ref="loginForm">
            <q-card>
              <q-card-section>
                <div class="col q-gutter-md">
                  <!-- Card header -->
                  <div>
                    <div class="text-h6">Credentials</div>
                    <div class="text-subtitle2 text-grey-8">
                      Enter your credentials
                    </div>
                  </div>

                  <!-- Email -->
                  <q-input
                    label="Login"
                    v-model="email.value"
                    type="text"
                    :rules="email.rules"
                    lazy-rules
                    square
                    outlined
                    dense
                  />

                  <!-- Password -->
                  <q-input
                    label="Password"
                    v-model="password.value"
                    type="password"
                    :rules="password.rules"
                    lazy-rules
                    square
                    outlined
                    dense
                  />

                  <!-- Errors -->
                  <div v-if="!!error">
                    <div class="text-hint text-red-9">
                      <template v-if="error == 400">
                        Invalid login or password. Please check your credentials
                        and try again.
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
                <q-btn :to="{ name: 'register' }" flat>Register</q-btn>
                <q-btn type="submit" color="primary" :loading="submitting" :disable="!canSubmit">Log in</q-btn>
              </q-card-actions>
            </q-card>
          </q-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "./api";

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
          (val) => !!val || "Please, enter your password"
        ]
      },

      submitting: false,
      error: null
    };
  },

  computed: {
    canSubmit() {
      let emaiIslValid = this.email.rules.every(
        (rule) => rule(this.email.value) === true
      );
      let passwordIsValid = this.password.rules.every(
        (rule) => rule(this.password.value) === true
      );

      return emaiIslValid && passwordIsValid;
    }
  },

  mounted() {
    this.$refs.loginForm.resetValidation();
  },

  methods: {
    async onSubmit() {
      const payload = {
        email: this.email.value,
        password: this.password.value
      };

      this.error = null;
      this.submitting = true;
      this.error = await this.$store.dispatch("identity/signIn", payload);
      this.submitting = false;

      if (!this.error) {
        if (this.$route.query.redirect) {
          const path = decodeURI(this.$route.query.redirect);
          this.$router.push({ path: path });
        } else {
          this.$router.push({ name: "home" });
        }
      }
    }
  }
}
</script>