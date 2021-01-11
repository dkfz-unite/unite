<template>
    <div class="col q-px-sm q-pt-sm q-gutter-y-sm">
        <div class="row">
            <q-breadcrumbs gutter="xs">
                <q-breadcrumbs-el icon="home" to="/" />
                <q-breadcrumbs-el label="Mutations" to="/mutations" />
                <q-breadcrumbs-el :label="$route.params.id"/>
            </q-breadcrumbs>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>