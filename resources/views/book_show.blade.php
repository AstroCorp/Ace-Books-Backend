@extends('layouts.lector')

@section('content')
<div class="row m-0 justify-content-center h-100">
    <div class="col-12 p-0">
        <pdf-viewer url='/books/{{ $book->filename }}' back='{{ URL::previous() }}' id-book='{{ $book->id }}' 
        add-bookmark-text='{{ trans("books.addBookmarkText") }}'
        error-add-bookmark-text='{{ trans("books.errorAddBookmarkText") }}'
        success-add-bookmark-text='{{ trans("books.successAddBookmarkText") }}'
        delete-bookmark-text='{{ trans("books.deleteBookmarkText") }}'
        delete-message-bookmark-text='{{ trans("books.deleteMessageBookmarkText") }}'
        update-bookmark-text='{{ trans("books.updateBookmarkText") }}'
        update-message-bookmark-text='{{ trans("books.updateMessageBookmarkText") }}'
        no-results-bookmark-text='{{ trans("books.noResultsBookmarkText") }}'
        page-text='{{ trans("books.pageText") }}'
        comment-text='{{ trans("books.commentText") }}' />
    </div>
</div>
@endsection
