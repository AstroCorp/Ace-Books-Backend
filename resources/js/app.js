
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
require('./custom.js');

window.Vue = require('vue');

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i);
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));
Vue.component('library-list', require('./components/LibraryListComponent.vue').default);
Vue.component('library-menu', require('./components/LibraryMenuComponent.vue').default);
Vue.component('input-file-with-image-preview', require('./components/InputFileWithImagePreviewComponent.vue').default);
Vue.component('input-file-custom', require('./components/InputFileCustomComponent.vue').default);

Vue.component('pdf-viewer', require('./components/pdf/PDF.vue').default);
Vue.component('pdf-document', require('./components/pdf/PDFDocument.vue').default);
Vue.component('pdf-thumbnail', require('./components/pdf/PDFThumbnail.vue').default);
Vue.component('pdf-page', require('./components/pdf/PDFPage.vue').default);


/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app'
});
