<template>
	<u-link :to="{ name: type.toLowerCase(), params: { id: id, tab: tab }}">
		<slot>
			{{ id }}
		</slot>
	</u-link>
</template>

<script>
import MrSettings from "../../../mr/settings";

export default {
	props: {
		id: {
			type: Number,
			required: true
		},
		type: {
			type: String,
			required: true,
			validator: (value) => ["Mr"].includes(value)
		},
		tab: {
			type: String,
			default: MrSettings.tabs.summary.domain,
			validator: (value, props) =>
				props.type == "Mr" ? MrSettings.tabs.domains.includes(value) :
				false
		}
	}
}
</script>