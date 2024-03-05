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
			type: String,
			required: true
		},
    type: {
      type: String,
      required: true,
      validator: (value) => ["ssm", "cnv", "sv"].includes(value)
    },
		tab: {
			type: String,
			default: null
		}
	}
}
</script>