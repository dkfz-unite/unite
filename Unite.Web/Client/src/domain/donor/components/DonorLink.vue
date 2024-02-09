<template>
	<u-link :to="{ name: Settings.domain, params: { id: id.toString(), tab: tab }}">
		<slot>
			{{ id }}
		</slot>
	</u-link>
</template>

<script>
import Settings from "../settings";

export default {
	props: {
		id: {
			type: Number,
			required: true
		},
		tab: {
			type: String,
			default: null
		}
	},

	setup() {
		return {
			Settings
		};
	}
}
</script>
