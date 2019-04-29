<template>
    <div>
        <library-list :collections="collections" :books="books" />
        
        <div :class="{ 'active-library-menu': isActive }" class="row library-menu">

            <span @click="MenuBtn" class="icon-centered icon-storage"></span>

            <form class="col-12" @:submit.prevent>
                <input type="hidden" name="_token" :value="csrf">

                <div class="form-group mt-3">
                    <input class="form-control" type="text" name="search" v-model="search" placeholder="Buscar...">
                </div>
            </form>
            <a class="col-12 col-sm-6" href="#"><span class="icon-centered icon-add-collection">Add collection</span></a>
            <a class="col-12 col-sm-6" href="#"><span class="icon-centered icon-add-book">Add book</span></a>
        </div>
    </div>
</template>

<script>
    export default
    {
        data()
        {
            return {
                isActive: false,
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
                    this.collections = response.data.collections;
                    this.books = response.data.books;
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
