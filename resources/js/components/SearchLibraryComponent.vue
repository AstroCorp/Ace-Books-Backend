<template>
    <div>
        <form>
            <input type="hidden" name="_token" :value="csrf">
            
            <div class="form-group">
                <input class="form-control" type="text" name="search" v-model="search" placeholder="Buscar...">
            </div>
        </form>
        <div>
            <h1>Biblioteca:</h1>
            <div v-for="(collection, key) in collections" :key="'c' + key">
                <p>{{collection}}</p>
            </div>
            <div v-for="(book, key) in books" :key="'b' + key">
                <p>{{book}}</p>
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
