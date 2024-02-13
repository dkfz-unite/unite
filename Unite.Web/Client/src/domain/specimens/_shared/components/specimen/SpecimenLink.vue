<template>
	<u-link :to="{ name: type, params: { id: id, tab: tab }}">
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
      validator: (value) => ["material", "line", "organoid", "xenograft"].includes(value)
    },
		tab: {
			type: String,
			default: null
		}
	},
}
</script>