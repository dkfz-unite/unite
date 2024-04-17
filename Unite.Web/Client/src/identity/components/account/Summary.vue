<template>
  <q-card>
    <q-card-section>
      <div class="col q-gutter-md">
        <!-- Card header -->
        <div>
          <div class="text-h6">General</div>
          <div class="text-subtitle2 text-grey-8">
            General information about your account
          </div>
        </div>

        <!-- Email -->
        <div class="row">
          <div class="col-12 col-sm-3">
            <span class="text-subtitle1 text-bold">
              Email
            </span>
          </div>

          <div class="col-12 col-sm-9">
            <span class="text-subtitle1">
              {{ account.email }}
            </span>
          </div>
        </div>

        <!-- Provider -->
        <div class="row">
          <div class="col-12 col-sm-3">
            <span class="text-subtitle1 text-bold">
              Provider
            </span>
          </div>

          <div class="col-12 col-sm-9">
            <span class="text-subtitle1">
              {{ account.provider }}
            </span>
          </div>
        </div>

        <!-- Permissions -->
        <div class="row">
          <div class="col-12 col-sm-3">
            <span class="text-subtitle1 text-bold">
              Permissions
            </span>
          </div>

          <div class="col-12 col-sm-9">
            <div v-for="group in account?.permissionsGrouped" :key="group.name" class="text-subtitle1 text-weight-medium">
              {{ group.name }} <span class="text-weight-regular text-italic">({{ group.values.join(', ') }}) </span>
            </div>
          </div>
        </div>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-actions align="right" class="q-px-md">
      <q-btn color="primary" icon="logout" @click="onLogOut">Log out</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("identity", ["account"]),
  },

  methods: {
    async onLogOut() {
      await this.$store.dispatch("identity/logOut");
      this.$router.replace({ name: "home" });
    },
  }
}
</script>