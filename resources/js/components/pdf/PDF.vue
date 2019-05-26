<template>
    <div id="app">
        <pdf-document v-bind="{url, scale}" />
    </div>
</template>

<script>
    export default
    {
        props: [
            'url'
        ],

        data()
        {
            return {
                scale: 2,
            }
        },
    }
</script>
