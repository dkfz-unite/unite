<template>
    <div>
        <pre>{{ value }}</pre>
    </div>
</template>

<script>
export default {
    name: 'JsonViewer',
    props: {
        value: {
            type: Object,
            required: true
        }
    }
}
</script>