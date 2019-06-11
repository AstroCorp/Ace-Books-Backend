<template>
    <div class="row justify-content-center">
        <span v-if="library === null || library.length === 0" class="col-12 alert d-block mt-1 alert-info text-center" role="alert">
            <strong>{{emptyMessage}}</strong>
        </span>

        <span v-for="(item, key) in library" :key="key + 1">
            <div class="flip col m-2" v-if="key >= (currentPage - 1) * nItems && key <= (nItems * currentPage - 1)">
            	<div class="flip-1 d-flex align-items-center justify-content-center">
                    <img v-if="item.image" :src="'/images/' + item.type + 's/' + item.image">
                    <img v-else :src="'/images/' + item.type + 's/' + item.type + '_default.png'">
            	</div>
            	<div class="flip-2">
                    <div class="flip-content d-flex justify-content-center align-items-center p-2 text-center">
                        <div>{{ item.name }}</div>
                    </div>
                    <div class="d-flex justify-content-around">
                        <a href="#" data-toggle="modal" data-target="#modalCenter" v-on:click="selectToRemove(item.id, item.name, item.type)"><span class="rounded-circle icon-centered icon-delete"></span></a>
                        <a :href="item.type + '/' + item.id + '/edit'"><span class="rounded-circle icon-centered icon-edit"></span></a>
                        <a :href="item.type + '/' + item.id"><span :class="'rounded-circle icon-centered icon-open-' + item.type"></span></a>
                    </div>
                </div>
            </div>
        </span>

        <v-pagination v-model="currentPage" :page-count="totalPages" v-if="totalPages > 1" :classes="bootstrapPaginationClasses"></v-pagination>

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
import vPagination from 'vue-plain-pagination';

export default
{
    components: { vPagination },
    props: [
        'library',

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

            currentPage: 1,
            totalPages: 1,
            nItems: 15,

            bootstrapPaginationClasses: {
                ul: 'pagination col-12 mt-4',
                li: 'page-item',
                liActive: 'active',
                liDisable: 'disabled',
                button: 'page-link'
            },
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
    },
    watch:
    {
        library: function()
        {
            let libLength = this.library ? 0 : this.library.length;
            this.currentPage = 1;
            this.totalPages = Math.ceil(libLength / this.nItems);
        }
    }
}
</script>
