<template>
    <div>
        <form v-on:submit.prevent>
            <input type="hidden" name="_token" :value="csrf">
            
            <div class="form-group">
                <input class="form-control" type="text" name="search" v-model="search" placeholder="Buscar...">
            </div>
        </form>
        <div class="row">
            <h1 class="title-form col-12">Biblioteca:</h1>
            <div v-for="(collection, key) in collections" :key="'c' + key">
                <div class="flip col m-2">
                	<div class="flip-1">
                		<div class="titulo">{{ collection.name }}</div>
                		<div class="img">{{ collection.image }}</div>
                	</div>
                	<div class="flip-2">
                        <a href="#"><span class="icon-centered icon-delete"></span></a>
                        <a href="#"><span class="icon-centered icon-edit"></span></a>
                        <a href="#"><span class="icon-centered icon-open-collection"></span></a>
                    </div>
                </div>
            </div>
            <div v-for="(book, key) in books" :key="'b' + key">
                <div class="flip col m-2">
                	<div class="flip-1">
                		<div class="titulo">{{ book.name }}</div>
                		<div class="img">{{ book.image }}</div>
                	</div>
                	<div class="flip-2">
                        <a href="#"><span class="icon-centered icon-delete"></span></a>
                        <a href="#"><span class="icon-centered icon-edit"></span></a>
                        <a href="#"><span class="icon-centered icon-open-book"></span></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default
    {
        data()
        {
            return {
                csrf: document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                search: '',

                collections: [],
                books: []
            }
        },
        mounted()
        {
            this.search_POST();
        },
        watch:
        {
            search(after, before)
            {
                this.search_POST();
            }
        },
        methods:
        {
            search_POST()
            {
                console.log(this.csrf);

                axios.post('library',
                {
                    '_token': this.csrf,
                    'search': this.search
                })
                .then(function(response)
                {
                    this.collections = response.data.collections;
                    this.books = response.data.books;
                }.bind(this));
            }
        }
    }
</script>
