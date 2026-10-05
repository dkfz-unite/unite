<template>
  <div class="col q-pa-md">
    <div class="row justify-center">
      <div class="col-12 col-sm-6 col-md-4 q-gutter-md">
        <!-- Header -->
        <div class="text-center">
          <div class="text-h4">Reset</div>
          <div class="text-subtitle1 text-grey-8">Reset your password</div>
        </div>

        <q-card v-if="!passwordResetAvailable">
          <q-card-section>
            Password reset is unavailable on this instance.
          </q-card-section>
          <q-card-actions align="right">
            <q-btn :to="{ name: 'login' }" flat>Back to login</q-btn>
          </q-card-actions>
        </q-card>

        <!-- Form -->
        <div v-else>
          <q-form @submit="onSubmit" autocomplete="off" ref="resetForm">
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
                    label="Enter your email"
                    v-model="email.value"
                    autocomplete="off"
                    type="text"
                    :rules="email.rules"
                    :disable="submitted"
                    lazy-rules square outlined dense
                  />

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
                      Reset link has been sent to your email.
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
import { mapState } from "vuex";

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

      error: null,
      submitting: false,
      submitted: false
    };
  },

  computed: {
    ...mapState("identity", ["passwordResetAvailable"]),

    canSubmit() {
      let results = [];

      this.email.rules.forEach((rule) => {
        results.push(rule(this.email.value) === true);
      });

      return results.every((result) => result === true);
    }
  },

  async mounted() {
    await this.$store.dispatch("identity/loadPasswordResetAvailability");
    await this.$nextTick();
    this.$refs.resetForm?.resetValidation();
  },

  methods: {
    async onSubmit() {
      const payload = {
        email: this.email.value
      };

      this.error = null;
      this.submitting = true;
      this.submitted = false;
      this.error = await this.$store.dispatch("identity/requestPasswordReset", payload);
      this.submitting = false;

      if (!this.error) {
        this.submitted = true;
      }
    }
  }
}
</script>
