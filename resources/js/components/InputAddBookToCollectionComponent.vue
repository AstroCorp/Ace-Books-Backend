<template>
    <div class="form-group col-10">
        <div class="row justify-content-between">
            <div class="col-12 col-md bookCollection p-0 my-1" v-for="book in booksSelected" :key="'bs' + book.id">
                <div class="row m-0">
                    <input type="hidden" :value="book.id" name="bookCollection[]">
                    <input type="text" class="form-control col" :value="book.name" disabled>
                    <button type="button" class="col form-btn form-btn-arrow" @click="delBook(book.id)">
                        <span class="icon-delete icon-centered"></span>
                    </button>
                </div>
            </div>
        </div>
        <div :class="booksSelected.length > 0 ? 'row mt-3' : 'row'" v-if="booksNotSelected.length !== 0">
            <select class="col form-control" v-model="selected">
                <option disabled selected hidden value="0">Select a book</option>
                <option v-for="book in booksNotSelected" :value="book.id" :key="'bns' + book.id">
                    {{ book.name }}
                </option>
            </select>

            <button type="button" class="col form-btn form-btn-arrow" @click="addBook()" :disabled="selected === 0">
                <span class="icon-add icon-centered"></span>
            </button>
        </div>
    </div>
</template>

<script>
    export default
    {
        props: [
            'books'
        ],
        data()
        {
            return {
                selected: 0,
                booksNotSelected: [],
                booksSelected: [],
            }
        },
        mounted()
        {
            this.booksNotSelected = JSON.parse(this.books);
        },
        methods:
        {
            addBook()
            {
                if(this.selected !== 0)
                {
                    let index = this.booksNotSelected.findIndex(book => book.id === this.selected);

                    this.booksSelected.push(this.booksNotSelected.splice(index, 1)[0]);
                    this.selected = 0;
                }
            },
            delBook(id)
            {
                let index = this.booksSelected.findIndex(book => book.id === id);

                this.booksNotSelected.push(this.booksSelected.splice(index, 1)[0]);
                this.selected = 0;
            }
        }
    }
</script>
