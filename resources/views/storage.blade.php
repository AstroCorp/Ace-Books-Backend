@extends('layouts.app', ['logo' => true])

@section('content')
<div class="row m-0 justify-content-center">
    <div class="mt-2 col">
        <div class="row m-0 justify-content-center">
            <div class="col-11 col-sm-8">
                <table class="table table-borderless">
                    <thead>
                        <tr>
                            <th></th>
                            <th class="table-option text-center">
                                <p>Paquete 1 (Gratis)</p>
                                <form method="POST" action="#"><button class="form-btn" type="submit" name="buy" value="1">Comprar</button></form>
                            </th>
                            <th class="table-option text-center">
                                <p>Paquete 2 (4.95 €)</p>
                                <form method="POST" action="#"><button class="form-btn" type="submit" name="buy" value="1">Comprar</button></form>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th class="table-option">Número de documentos</th>
                            <td class="table-data">10</td>
                            <td class="table-data">50</td>
                        </tr>
                        <tr>
                            <th class="table-option">Tamaño máximos de los documentos</th>
                            <td class="table-data">5 MB</td>
                            <td class="table-data">10 MB</td>
                        </tr>
                        <tr>
                            <th class="table-option">Compartir documentos</th>
                            <td class="table-data">Si</td>
                            <td class="table-data">Si</td>
                        </tr>
                        <tr>
                            <th class="table-option">Número de colecciones</th>
                            <td class="table-data">5</td>
                            <td class="table-data">15</td>
                        </tr>
                        <tr>
                            <th class="table-option">Compartir colecciones</th>
                            <td class="table-data">No</td>
                            <td class="table-data">Si</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
@endsection
