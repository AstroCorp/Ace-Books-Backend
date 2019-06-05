<template>
    <div class="row justify-content-center">
        <span v-if="collections.length === 0 && books.length === 0" class="col-12 alert d-block mt-1 alert-info text-center" role="alert">
            <strong>{{emptyMessage}}</strong>
        </span>

        <div class="flip col m-2" v-for="(collection, key) in collections" :key="'c' + key">
        	<div class="flip-1 d-flex align-items-center justify-content-center">
                <img v-if="collection.image" :src="'/images/collections/' + collection.image">
                <img v-else src="/images/collections/collection_default.png">
        	</div>
        	<div class="flip-2">
                <div class="flip-content d-flex justify-content-center align-items-center p-2 text-center">
                    <div>{{ collection.name }}</div>
                </div>
                <div class="d-flex justify-content-around">
                    <a href="#" data-toggle="modal" data-target="#modalCenter" v-on:click="selectToRemove(collection.id, collection.name, 'collection')"><span class="rounded-circle icon-centered icon-delete"></span></a>
                    <a :href="'collection/' + collection.id + '/edit'"><span class="rounded-circle icon-centered icon-edit"></span></a>
                    <a :href="'collection/' + collection.id"><span class="rounded-circle icon-centered icon-open-collection"></span></a>
                </div>
            </div>
        </div>

        <div class="flip col m-2" v-for="(book, key) in books" :key="'b' + key">
        	<div class="flip-1 d-flex align-items-center justify-content-center">
                <img v-if="book.image" :src="'/images/books/' + book.image">
                <img v-else src="/images/books/book_default.png">
        	</div>
        	<div class="flip-2">
                <div class="flip-content d-flex justify-content-center align-items-center p-2 text-center">
                    <div>{{ book.name }}</div>
                </div>
                <div class="d-flex justify-content-around">
                    <a href="#" data-toggle="modal" data-target="#modalCenter" v-on:click="selectToRemove(book.id, book.name, 'book')"><span class="rounded-circle icon-centered icon-delete"></span></a>
                    <a :href="'book/' + book.id + '/edit'"><span class="rounded-circle icon-centered icon-edit"></span></a>
                    <a :href="'book/' + book.id"><span class="rounded-circle icon-centered icon-open-book"></span></a>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="modalCenter" tabindex="-1" role="dialog" aria-labelledby="ModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <img class="mb-3" v-bind:src="'./images/false.png'">
                <h2>{{titleModal}}{{name}}?</h2>
                <p>{{bodyModal}}</p>
              </div>
              <div class="modal-footer">
                <form method="POST" :action="type + '/' + id">
                    <input type="hidden" name="_method" value="DELETE" />
                    <input type="hidden" name="_token" :value="csrf">
                    <div class="form-group mb-4">
                        <label v-if="type === 'collection'" class="custom-checkbox">
                        <span class="btn-link-secondary text-dark">{{collectionOptionModal}}</span>
                            <input class="form-check-input" type="checkbox" name="collectionOption" id="collectionOption">
                        <span class="checkmark"></span>
                        </label>
                    </div>
                    <div class="form-group text-center">
                        <button type="button" class="btn btn-secondary mx-1" data-dismiss="modal">{{cancelModal}}</button>
                        <button type="submit" class="btn btn-danger mx-1">{{deleteModal}}</button>
                    </div>
                </form>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
    export default
    {
        props: [
            'collections',
            'books',

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
                csrf: document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                id: '',
                name:'',
                type: '',
            };
        },
        methods:
        {
            selectToRemove(id, name, type)
            {
                this.id = id;
                this.name = name;
                this.type = type;
            }
        }
    }
</script>
