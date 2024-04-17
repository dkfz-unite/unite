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
          <u-summary />
        </div>

        <!-- Password change -->
        <div v-if="showChangePassword">
          <u-password />
        </div>

        <!-- Deletion -->
        <div v-if="showDeleteAccount">
          <u-deletion />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import USummary from "./components/account/Summary.vue";
import UPassword from "./components/account/Password.vue";
import UDeletion from "./components/account/Deletion.vue";

export default {
  components: {
    USummary,
    UPassword,
    UDeletion,
  },

  computed: {
    showChangePassword() {
      const token = this.$helpers.token.get();
      return token.data.authmethod === 'default';
    },

    showDeleteAccount() {
      const token = this.$helpers.token.get();
      const isDefault = token.data.authmethod === 'default';
      const isRoot = token.data.role?.includes('Root');
      return isDefault && !isRoot;
    },
  }
}
</script>