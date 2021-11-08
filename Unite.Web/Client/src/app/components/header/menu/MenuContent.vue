<template>
  <q-list>
    <!-- Greeting -->
    <q-item>
      <q-item-section>
        <q-item-label>Hello,</q-item-label>
        <q-item-label class="text-weight-medium" lines="1">{{account.email}}</q-item-label>
      </q-item-section>
    </q-item>
    <q-separator />

    <!-- Account -->
    <q-item clickable v-close-popup :to="{ name: 'account' }">
      <q-item-section avatar>
        <q-icon name="las la-user" />
      </q-item-section>
      <q-item-section>
        Account
      </q-item-section>
    </q-item>

    <!-- Log out -->
    <q-item clickable v-close-popup @click="$store.dispatch('identity/logOut')">
      <q-item-section avatar>
        <q-icon name="logout" color="primary" />
      </q-item-section>
      <q-item-section>
        Log out
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>

export default {
  computed: {
    account() {
      return this.$store.state.identity.account;
    }
  }
}
</script>