<template>
  <q-list>
    <!-- Greeting -->
    <q-item>
      <q-item-section>
        <q-item-label>Hello,</q-item-label>
        <q-item-label class="text-weight-medium" lines="1">{{ account.email }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-separator />

    <!-- Submissions -->
    <q-item clickable v-close-popup :to="{ name: 'submissions' }">
      <q-item-section avatar>
        <q-icon name="las la-file-alt" />
      </q-item-section>
      <q-item-section>
        Submissions
      </q-item-section>
    </q-item>

    <!-- Admin -->
    <q-item v-if="isAdmin" clickable v-close-popup :to="{ name: 'admin' }">
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
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("identity", ["isAdmin"]),
    
    account() {
      return this.$store.state.identity.account;
    }
  },

  methods: {
    async onLogOut() {      
      await this.$store.dispatch("identity/logOut");
      this.$router.push({ name: "home" });
      this.$router.go(0); //Required to refresh the page
    }
  }
}
</script>