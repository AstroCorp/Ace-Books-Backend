@extends('layouts.app', ['logo' => true])

@section('content')
<div class="row m-0 justify-content-center">
    <div class="mt-4 col-10 col-xl-8">
        <div class="row justify-content-center">
            @if(count($books) === 0)
                <span class="col-12 alert d-block mt-1 alert-info text-center" role="alert">
                    <strong>{{trans('library.collectionEmpty')}}</strong>
                </span>
            @endif

            @foreach ($books as $book)
            <div class="flip col m-2">
                <div class="flip-1 d-flex align-items-center justify-content-center">
                    @if($book->image !== null)
                    <img src="/images/books/{{$book->image}}">
                    @else
                    <img src="/images/books/book_default.png">
                    @endif
                </div>
                <div class="flip-2">
                    <div class="flip-content d-flex justify-content-center align-items-center p-2 text-center">
                        <div>{{ $book->name }}</div>
                    </div>
                    <div class="d-flex justify-content-around">
                        <a href="#" class="delBtn" data-bookname="{{$book->name}}" data-bookid="{{$book->id}}" data-toggle="modal" data-target="#modalCenter"><span class="rounded-circle icon-centered icon-delete"></span></a>
                        <a href="/book/{{$book->id}}/edit"><span class="rounded-circle icon-centered icon-edit"></span></a>
                        <a href="/book/{{$book->id}}"><span class="rounded-circle icon-centered icon-open-book"></span></a>
                    </div>
                </div>
            </div>
            @endforeach
            <div class="col-12 p-0 mt-4">{{$books->render()}}</div>

            <!-- Modal delete -->
            <div class="modal fade" id="modalCenter" tabindex="-1" role="dialog" aria-labelledby="ModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <img class="mb-3" src="/images/false.png">
                            <h2>{{trans('library.modal_delete_title')}}<span class="modalBookName"></span>?</h2>
                            <p>{{trans('library.modal_delete_body')}}</p>
                        </div>
                        <div class="modal-footer">
                            <form class="modalForm" method="POST" action="#">
                                <input type="hidden" name="_method" value="DELETE" />
                                @csrf
                                <div class="form-group text-center">
                                    <button type="button" class="btn btn-secondary mx-1" data-dismiss="modal">{{trans('library.modal_delete_cancel')}}</button>
                                    <button type="submit" class="btn btn-danger mx-1">{{trans('library.modal_delete_delete')}}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            @if(session('status'))
                <!-- Modal delete finished -->
                <div class="modal fade" id="modalDel" tabindex="-1" role="dialog" aria-labelledby="ModalCenterTitle" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <img class="mb-3" src="/images/true.png">
                        <p>{{ session('type') === 'book' ? trans('library.modal_message_book', ['name' => session('name')]) : trans('library.modal_message_collection', ['name' => session('name')]) }}</p>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-success" data-dismiss="modal">{{trans('library.modal_button')}}</button>
                      </div>
                    </div>
                  </div>
                </div>
            @endif

            @section('scripts')
                <script type="text/javascript">
                    $(".delBtn").click(function()
                    {
                        var bookName = $(this).data('bookname');
                        var bookId = $(this).data('bookid');

                        $(".modalBookName").text(bookName);
                        $(".modalForm").attr("action", "/book/" + bookId);
                    });
                </script>

                @if(session('status'))
                    <script type="text/javascript">
                        $(document).ready(function()
                        {
                            $('#modalDel').modal('show');
                        });
                    </script>
                @endif
            @endsection
        </div>
    </div>
</div>
@endsection
