<template>
	<u-link :to="{ name: type.toLowerCase(), params: { id: id, tab: tab }}">
		<slot>
			{{ id }}
		</slot>
	</u-link>
</template>

<script>
import MriSettings from "../../../mri/settings";

export default {
	props: {
		id: {
			type: Number,
			required: true
		},
    type: {
      type: String,
      required: true,
      validator: (value) => ["Mri"].includes(value)
    },
		tab: {
			type: String,
			default: MriSettings.tabs.summary.domain,
			validator: (value, props) =>
				props.type == "Mri" ? MriSettings.tabs.domains.includes(value) :
				false
		}
	}
}
</script>