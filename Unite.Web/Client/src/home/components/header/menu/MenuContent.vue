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

    <!-- Repository -->
    <q-item clickable v-close-popup :to="{ name: 'projects' }">
      <q-item-section avatar>
        <q-icon name="las la-database" />
      </q-item-section>
      <q-item-section>
        Repository
      </q-item-section>
    </q-item>
    <q-separator />

    <!-- Admin -->
    <q-item v-if="account?.isAdmin" clickable v-close-popup :to="{ name: 'admin' }">
      <q-item-section avatar>
        <q-icon name="las la-tools" />
      </q-item-section>
      <q-item-section>
        Admin
      </q-item-section>
    </q-item>

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
    <q-item clickable v-close-popup @click="onLogOut">
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
  },

  methods: {
    async onLogOut() {      
      await this.$store.dispatch("identity/signOut");
      this.$router.push({ name: 'home' });
      this.$router.go(0); //Required to refresh the page
    }
  }
}
</script>