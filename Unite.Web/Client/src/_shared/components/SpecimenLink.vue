<template>
	<u-link :to="{ name: type.toLowerCase(), params: { id: id, tab: tab }}">
		<slot>
			{{ id }}
		</slot>
	</u-link>
</template>

<script>
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
			default: null
		}
	}
}
</script>