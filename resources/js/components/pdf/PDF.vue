<template>
  <div id="app">
    <pdf-document v-bind="{url, scale}" />
  </div>
</template>

<script>
export default {
  // ...
  data() {
    return {
      url: 'https://cdn.filestackcontent.com/5qOCEpKzQldoRsVatUPS', // a PDF
      scale: 2,
    }
  },
}
</script>