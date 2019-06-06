<template>
    <div>
        <library-list :library="library" :emptyMessage="emptyMessage"
            :titleModal="titleModal" :bodyModal="bodyModal" :cancelModal="cancelModal" :deleteModal="deleteModal"
            :collectionOptionModal="collectionOptionModal" />

        <div :class="{ 'active-library-menu': isActive }" class="library-menu">

            <span @click="MenuBtn" id="toggle-library" class="icon-centered icon-menu"></span>

            <form class="row search-bar justify-content-center m-0" @:submit.prevent>
                <input type="hidden" name="_token" :value="csrf">

                <div class="col-12 form-group mt-3">
                    <input class="form-control" type="text" name="search" v-model="search" :placeholder="searchText">
                </div>

                <a class="col-8 library-menu-option p-2 m-2" href="book/create"><span class="mb-2 icon-centered icon-open-book"></span>{{addBookText}}</a>
                <a class="col-8 library-menu-option p-2 m-2" href="collection/create"><span class="mb-2 icon-centered icon-open-collection"></span>{{addCollectionText}}</a>
            </form>
        </div>
    </div>
</template>

<script>
    export default
    {
        props: [
            'searchText',
            'addCollectionText',
            'addBookText',

            'titleModal',
            'bodyModal',
            'collectionOptionModal',
            'cancelModal',
            'deleteModal',
            'emptyMessage',
        ],
        data()
        {
            return {
                isActive: true,
                csrf: document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                search: '',

                library: ['null']
            }
        },
        mounted()
        {
            this.search_POST();
        },
        watch:
        {
            search: _.debounce(function()
            {
                this.search_POST();
            },
            200)
        },
        methods:
        {
            search_POST()
            {
                axios.post('library',
                {
                    '_token': this.csrf,
                    'search': this.search
                })
                .then(function(response)
                {
                    let collections = response.data.collections;
                    let books = response.data.books;

                    collections.forEach(collection => collection.type = "collection");
                    books.forEach(book => book.type = "book");

                    this.library = collections.concat(books);
                }
                .bind(this));
            },

            MenuBtn()
            {
                this.isActive = !this.isActive;
            }
        }
    }
</script>
