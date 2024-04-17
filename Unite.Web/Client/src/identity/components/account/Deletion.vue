<template>
  <q-card>
    <q-card-section>
      <div class="col q-gutter-md">
        <!-- Card header -->
        <div>
          <div class="text-h6">Deletion</div>
          <div class="text-subtitle2 text-grey-8">
            Here you can delete your account
          </div>
        </div>

        <!-- Delete account -->
        <div class="text-hint text-red-9">
          <div class="col-12 col-sm-3">
            <span class="text-red">
              Deletion of your account will remove all connected data.
            </span>
          </div>
        </div>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-actions align="right" class="q-px-md">
      <q-btn color="negative" icon="las la-trash" @click="onDelete">Delete</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("identity", ["account"])
  },

  methods: {
    ...mapActions("identity", ["deleteAccount"]),

    async onDelete() {
      await this.deleteAccount();
      this.$router.replace({ name: "home" });
    }
  },
}
</script>