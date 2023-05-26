<template>
	<u-link :to="{ name: 'donor', params: { id: id.toString(), tab: tab }}">
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
		tab: {
			type: String,
			default: null
		}
	}
}
</script>