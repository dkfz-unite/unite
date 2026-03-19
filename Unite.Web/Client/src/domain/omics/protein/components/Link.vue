<template>
  <u-link :to="{ name: Settings.domain, params: { id: id.toString(), tab: tab }}">
    <slot>
      {{ id }}
    </slot>
  </u-link>
</template>

<script>
import Settings, { Tabs } from "../settings";

export default {
  props: {
		id: {
			type: Number,
			required: true
		},
		tab: {
			type: String,
			default: null,
			validator: value => Tabs.domains.includes(value)
		}
	},

	setup() {
		return {
			Settings
		};
	}
};
</script>