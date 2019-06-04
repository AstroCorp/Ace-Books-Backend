@extends('layouts.app', ['logo' => true])

@section('content')
<div class="row m-0 justify-content-center">
    <div class="mt-4 col-10 col-xl-8">
        @if(session('message_limit'))
            <span class="alert d-block mt-1 alert-danger text-center" role="alert">
                <strong>{{ session('message_limit') }}</strong>
            </span>
        @endif

        <library-menu
            search-text="{{trans('library.search')}}"
            add-collection-text="{{trans('library.add_collection')}}"
            add-book-text="{{trans('library.add_book')}}"

            title-modal="{{trans('library.modal_delete_title')}}"
            body-modal="{{trans('library.modal_delete_body')}}"
            collection-option-modal="{{trans('library.modal_collection_option')}}"
            cancel-modal="{{trans('library.modal_delete_cancel')}}"
            delete-modal="{{trans('library.modal_delete_delete')}}"
        />
    </div>
    @if(session('status'))
        <!-- Modal -->
        <div class="modal fade" id="modalDel" tabindex="-1" role="dialog" aria-labelledby="ModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <img class="mb-3" src="./images/true.png">
                <p>{{ session('type') === 'book' ? trans('library.modal_message_book', ['name' => session('name')]) : trans('library.modal_message_collection', ['name' => session('name')]) }}</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-success" data-dismiss="modal">{{trans('library.modal_button')}}</button>
              </div>
            </div>
          </div>
        </div>

        @section('scripts')
            <script type="text/javascript">
                $(document).ready(function()
                {
                    $('#modalDel').modal('show');
                });
            </script>
        @endsection
    @endif
</div>
@endsection


