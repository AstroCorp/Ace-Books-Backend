<template>
    <div>
        <form class="row" v-on:submit.prevent>
            <input type="hidden" name="_token" :value="csrf">

            <div class="form-group col p-0 m-2">
                <input class="form-control" type="text" name="search" v-model="search" placeholder="Buscar...">
            </div>
        </form>
        <div class="row justify-content-center">
            <div class="flip col m-2" v-for="(collection, key) in collections" :key="'c' + key">
            	<div class="flip-1 d-flex align-items-center">
            		<div class="titulo">{{ collection.name }}</div>
            	</div>
            	<div class="flip-2">
                    <div class="flip-content d-flex justify-content-center align-items-center">
                        <div>Texto</div>
                    </div>
                    <div class="d-flex justify-content-around">
                        <a href="#"><span class="rounded-circle icon-centered icon-delete"></span></a>
                        <a href="#"><span class="rounded-circle icon-centered icon-edit"></span></a>
                        <a href="#"><span class="rounded-circle icon-centered icon-open-collection"></span></a>
                    </div>
                </div>
            </div>

            <div class="flip col m-2" v-for="(book, key) in books" :key="'b' + key">
            	<div class="flip-1 d-flex align-items-center">
            		<div class="titulo">{{ book.name }}</div>
            	</div>
            	<div class="flip-2">
                    <div class="flip-content d-flex justify-content-center align-items-center">
                        <div>Texto</div>
                    </div>
                    <div class="d-flex justify-content-around">
                        <a href="#"><span class="rounded-circle icon-centered icon-delete"></span></a>
                        <a href="#"><span class="rounded-circle icon-centered icon-edit"></span></a>
                        <a href="#"><span class="rounded-circle icon-centered icon-open-book"></span></a>
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
                axios.post('library',
                {
                    '_token': this.csrf,
                    'search': this.search
                })
                .then(function(response)
                {
                    this.collections = response.data.collections;
                    this.books = response.data.books;
                }
                .bind(this));
            }
        }
    }
</script>
