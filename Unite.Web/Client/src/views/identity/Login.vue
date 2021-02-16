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
import stringHelpers from "@/services/helpers/helpers.strings.js";
import apiClient from "@/services/api/api.client.identity.js";

export default {
  data() {
    return {
      email: {
        value: null,
        rules: [
          (val) => !!val || "Please, enter your email address",
          (val) => stringHelpers.isEmail(val) || "Please, use valid email address"
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
      var emaiIslValid = this.email.rules.every(
        (rule) => rule(this.email.value) === true
      );
      var passwordIsValid = this.password.rules.every(
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
      try {
        this.submitting = true;
        this.error = null;
        await apiClient.signIn(this.email.value, this.password.value);
        this.submitting = false;
        // this.$router.push({ name: "home" });
        location.href = "/";
      } catch (error) {
        this.submitting = false;
        this.error = error.status;
      }
    }
  }
};
</script>