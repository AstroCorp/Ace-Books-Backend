<template>
    <div class="row">
        <pdf-thumbnail class="col-4 d-none" v-bind="{url, scale: 0.4}" />
        <pdf-document class="col" v-bind="{url, scale: 2}" />
    </div>
</template>

<script>
    export default
    {
        props: [
            'url'
        ]
    }
</script>
