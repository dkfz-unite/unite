<template>
	<u-link :to="{ name: type.toLowerCase(), params: { id: id, tab: tab }}">
		<slot>
			{{ id }}
		</slot>
	</u-link>
</template>

<script>
import MaterialSettings from "../../../material/settings";
import LineSettings from "../../../line/settings";
import OrganoidSettings from "../../../organoid/settings";
import XenograftSettings from "../../../xenograft/settings";

export default {
	props: {
		id: {
			type: Number,
			required: true
		},
    type: {
      type: String,
      required: true,
      validator: (value) => ["Material", "Line", "Organoid", "Xenograft"].includes(value)
    },
		tab: {
			type: String,
			default: MaterialSettings.tabs.summary.domain,
			validator: (value, props) =>
				props.type == "Material" ? MaterialSettings.tabs.domains.includes(value) :
				props.type == "Line" ? LineSettings.tabs.domains.includes(value) :
				props.type == "Organoid" ? OrganoidSettings.tabs.domains.includes(value) :
				props.type == "Xenograft" ? XenograftSettings.tabs.domains.includes(value) :
				false
		}
	}
}
</script>