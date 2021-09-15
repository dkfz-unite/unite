<template>
  <q-layout view="hHh lpr fFf">

    <q-header bordered class="bg-blue-7 text-white">
      <q-toolbar>
        <div class="col">
          <div class="row justify-between">
            <div v-if="showFilters">
              <q-btn
                icon="las la-filter"
                :label="$q.screen.gt.xs ? 'Filters' : null"
                :rounded="$q.screen.lt.sm"
                dense flat
                @click="onFiltersClick"
              />
            </div>

            <div>
              <q-toolbar-title>
                <div v-if="$q.screen.lt.md">
                  UNITE
                </div>

                <q-btn
                  v-else
                  dense flat
                  :to="{ name: 'home' }">
                  <img src="/logo-white.png" width="250" />
                </q-btn>
              </q-toolbar-title>
            </div>
              
            <div>
              <q-btn
                v-if="account"
                icon="las la-user"
                :label="$q.screen.gt.xs ? 'Account' : null"
                :rounded="$q.screen.lt.sm"
                dense flat
                @click="drawers.right.show = !drawers.right.show" 
              />
            </div>
          </div>
        </div>
      </q-toolbar>

      <q-tabs dense stretch align="left" v-if="account">
        <q-route-tab :to="{ name: 'donors' }">
          <div class="row q-gutter-x-xs items-center">
            <q-icon name="las la-user-circle" size="sm"/>
            <span>Donors</span>
          </div>
        </q-route-tab>

        <q-route-tab :to="{ name: 'tissues' }">
          <div class="row q-gutter-x-xs items-center">
            <q-icon name="svguse:/icons.svg#u-tissue" size="sm" />
            <span>Tissues</span>
          </div>
        </q-route-tab>

        <q-route-tab :to="{ name: 'cells' }">
          <div class="row q-gutter-x-xs items-center">
            <q-icon name="las la-microscope" size="sm" />
            <span>Cell Lines</span>
          </div>
        </q-route-tab>

        <q-route-tab :to="{ name: 'organoids' }">
          <div class="row q-gutter-x-xs items-center">
            <q-icon name="svguse:/icons.svg#u-organoid" size="sm" />
            <span>Organoids</span>
          </div>
        </q-route-tab>

        <q-route-tab :to="{ name: 'xenografts' }">
          <div class="row q-gutter-x-xs items-center">
            <q-icon name="svguse:/icons.svg#u-mouse" size="sm" />
            <span>Xenografts</span>
          </div>
        </q-route-tab>

        <q-route-tab :to="{ name: 'genes' }">
          <div class="row q-gutter-x-xs items-center">
            <q-icon name="svguse:/icons.svg#u-gene-alt" size="sm" />
            <span>Genes</span>
          </div>
        </q-route-tab>

        <q-route-tab :to="{ name: 'mutations' }">
          <div class="row q-gutter-x-xs items-center">
            <q-icon name="svguse:/icons.svg#u-mutation-alt" size="sm" />
            <span>Mutations</span>
          </div>
        </q-route-tab>
      </q-tabs>
    </q-header>

    <q-drawer v-if="account" v-model="drawers.right.show" side="right" bordered overlay elevated>
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

    <q-footer v-if="!hideBanner" class="bg-green-5">
      <q-toolbar>
        <div class="col">
          <div class="row justify-center q-gutter-x-md">
            <div>
                <span class="text-subtitle1">
                  All information on this environment is artificial and was generated based on real examples for presentation purposes.
                </span>
            </div>

            <div>
              <q-btn label="Dismiss" class="bg-blue q-px-xs" dense @click="onDismiss" />
            </div>
          </div>
        </div>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
import settings from './settings.js';
import apiClient from './services/api/api.client.identity.js';

export default {
  data () {
    return {
      drawers: this.$store.state.drawers,
      donorsDrawer: this.$store.state.donors.drawer,
      tissuesDrawer: this.$store.state.tissues.drawer,
      cellsDrawer: this.$store.state.cells.drawer,
      organoidsDrawer: this.$store.state.organoids.drawer,
      xenograftsDrawer: this.$store.state.xenografts.drawer,
      genesDrawer: this.$store.state.genes.drawer,
      mutationsDrawer: this.$store.state.mutations.drawer,
      oncogridDrawer: this.$store.state.oncogrid.drawer,

      hideBanner: localStorage.hideBanner
    }
  },

  computed: {
    account() {
      return this.$store.state.account;
    },

    showAccount() {
      return this.$store.state.account;
    },

    showFilters() {
      let screen = this.$q.screen.lt.md;
      let routes = ["donors", "tissues", "cells", "organoids", "xenografts", "genes", "mutations", "oncogrid"];

      return screen && routes.includes(this.$route.name);
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
        location.href = "/";
      }
    }
  },

  methods: {
    async onLogOut() {
      try {
        await apiClient.signOut();
        location.href = "/";
      } catch(error) {
        location.href = "/";
      }
    },

    onFiltersClick(e) {
      switch (this.$route.name) {
        case "donors": {
          this.donorsDrawer.show = true;
          return;
        }
        case "tissues": {
          this.tissuesDrawer.show = true;
          return;
        }
        case "cells": {
          this.cellsDrawer.show = true;
          return;
        }
        case "organoids": {
          this.organoidsDrawer.show = true;
          return;
        }
        case "xenografts": {
          this.xenograftsDrawer.show = true;
          return;
        }
        case "genes": {
          this.genesDrawer.show = true;
          return;
        }
        case "mutations": {
          this.mutationsDrawer.show = true;
          return;
        }
        case "oncogrid": {
          this.oncogridDrawer.show = true;
          return;
        }
        default: return;
      }
    },

    onDismiss() {
      this.hideBanner = true;
      localStorage.hideBanner = this.hideBanner;
    },
  }
}
</script>
