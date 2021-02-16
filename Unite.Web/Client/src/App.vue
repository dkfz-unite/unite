<template>
  <q-layout view="hHh lpr fFf">

    <q-header bordered class="bg-blue-7 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <div>DKFZ.UNITE</div>
          <!-- <q-btn :to="{ name: 'home' }" class="text-bold" flat dense>DKFZ.UNITE</q-btn> -->
        </q-toolbar-title>

        <q-space />

        <q-btn
          v-if="account"
          icon="las la-user" 
          label="Account" 
          flat 
          dense 
          @click="drawers.right.show = !drawers.right.show" 
        />

      </q-toolbar>

      <q-tabs dense stretch align="left" v-if="account">
        <q-route-tab  :to="{ name: 'donors' }">
          <div>
            <q-icon name="las la-user-circle" size="xs"/> Donors
          </div>
        </q-route-tab>

        <q-route-tab :to="{ name: 'mutations' }">
          <div>
            <q-icon name="las la-dna" size="xs" /> Mutations
          </div>
        </q-route-tab>

        <q-route-tab :to="{ name: 'cells' }" disable title="Comming soon">
          <div>
            <q-icon name="las la-microscope" size="xs" /> Cells
          </div>
        </q-route-tab>

        <q-route-tab :to="{ name: 'radiology' }" disable title="Comming soon">
          <div>
            <q-icon name="las la-x-ray" size="xs" /> Radiology
          </div>
        </q-route-tab>
      </q-tabs>
    </q-header>

    <q-drawer v-if="account" v-model="drawers.right.show" side="right" bordered overlay>
      <div class="col q-pa-sm q-gutter-y-sm">
        <div>
          <div class="text-h6">
            Hello,
          </div>
          <div class="text-hint text-uppercase">
            {{account.email}}
          </div>
        </div>
        <q-btn :to="{ name: 'account' }" class="fit" icon="las la-user" dense>Account</q-btn>
        <q-btn color="primary" class="fit" icon="logout" dense @click="onLogOut">Log out</q-btn>
      </div>
    </q-drawer>

    <q-page-container>
      <div class="q-px-md q-py-sm">
        <router-view />
      </div>
    </q-page-container>

    <!-- <q-footer class="bg-grey-3 text-white">
      <q-toolbar>
      </q-toolbar>
    </q-footer> -->

  </q-layout>
</template>

<script>
import settings from '@/settings.js';
import apiClient from '@/services/api/api.client.identity.js';

export default {
  data () {
    return {
      // account: this.$store.state.account,
      drawers: this.$store.state.drawers
    }
  },

  computed: {
    account() {
      return this.$store.state.account;
    }
  },

  async mounted() {
    var session = this.$cookies.get(settings.cookies.sessionCookieName);

    if (!session) {
      this.$store.state.account = null;
      this.$router.push({ name: "login" });
    }
    else {
      try {
        this.$store.state.account = await apiClient.getAccount();
      } catch (error) {
        this.$cookies.remove(settings.cookies.sessionCookieName);
        this.$cookies.remove(settings.cookies.tokenCookieName);
        this.$store.state.account = null;
        //this.$router.push({ name: "login" });
        location.href = "/";
      }
    }
  },

  methods: {
    async onLogOut() {
      try {
        await apiClient.signOut();
        // this.$router.push({ name: 'login' });
        location.href = "/";
      } catch(error) {
        location.href = "/";
      }
    }
  }
}
</script>
