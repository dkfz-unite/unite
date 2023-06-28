<template>
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
        password: this.password.value,
        providerCode: 'default',
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