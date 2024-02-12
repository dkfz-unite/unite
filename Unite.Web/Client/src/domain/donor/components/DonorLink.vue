<template>
	<u-link :to="{ name: Settings.domain, params: { id: id.toString(), tab: tab }}">
		<slot>
			{{ id }}
		</slot>
	</u-link>
</template>

<script>
import Settings from "../settings";
import { Tabs } from "../settings";

export default {
	props: {
		id: {
			type: Number,
			required: true
		},
		tab: {
			type: String,
			default: Tabs.summary.domain,
			validator: (val) => Tabs.domains.includes(val)
		}
	},

	setup() {
		return {
			Settings
		};
	}
}
</script>
