<template>
  <div class="col q-gutter-y-sm">
    <div class="row">
      <q-breadcrumbs gutter="xs" class="text-subtitle1">
        <q-breadcrumbs-el :icon="Settings.home.icon" :to="{ name: Settings.home.domain }" />
        <q-breadcrumbs-el :label="entries.crumb" :to="{ name: entries.domain }" />
        <q-breadcrumbs-el :label="id" />
      </q-breadcrumbs>
    </div>

    <div class="row">
      <div class="col">
        <q-separator />
        <div class="column items-center q-gutter-y-md q-py-xl text-center">
          <q-icon name="las la-search" size="64px" color="grey" />
          <div class="text-h6">{{ title }} not found</div>
          <div class="text-grey-8">
            {{ title }} with id <b>{{ id }}</b> does not exist or you do not have access to it.
          </div>
          <q-btn
            :label="`Back to ${entries.title}`"
            :icon="entries.icon"
            :to="{ name: entries.domain }"
            color="primary"
            dense flat no-caps
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Settings from "@/_settings/settings";

export default {
  props: {
    // Entity name, e.g. "Donor".
    title: {
      type: String,
      required: true
    },

    // Settings of the entries (list) page, e.g. Settings.donors.
    entries: {
      type: Object,
      required: true
    },

    id: {
      type: [String, Number],
      required: true
    }
  },

  setup() {
    return {
      Settings
    };
  }
}
</script>
