@extends('layouts.app')

@section('content')
<div class="row m-0 justify-content-center">
    <div class="mt-4 col-10 col-xl-8">
        <div id="accordion">
            <h1 class="title-form">Preguntas frecuentes</h1>
            <h3 class="mt-4 title-form">Mi cuenta de Ace Books</h3>
            <div class="card mb-1">
                <button id="heading_1" class="card-header btn collapsed" data-toggle="collapse"
                    data-target="#collapse_1" aria-expanded="false" aria-controls="collapse_1">
                    <h5 class="m-0 text-left">¿Qué ocurre si comparto contenido con copyright?</h5>
                </button>

                <div id="collapse_1" class="collapse" aria-labelledby="heading_1" data-parent="#accordion">
                    <div class="card-body">
                        <p>Si compartes contenido con copyright y este no te pertenece será eliminado de la plataforma
                            en
                            cuanto se detecta la
                            infracción, además de sumarte un "strike".</p>
                    </div>
                </div>
            </div>
            <div class="card">
                <button id="heading_2" class="card-header btn collapsed" data-toggle="collapse"
                    data-target="#collapse_2" aria-expanded="false" aria-controls="collapse_2">
                    <h5 class="m-0 text-left">¿Qué son los "strikes"?</h5>
                </button>
                <div id="collapse_2" class="collapse" aria-labelledby="heading_2" data-parent="#accordion">
                    <div class="card-body">
                        <p>Los "strikes" son una forma de evaluar el estado de tu cuenta respecto a las leyes de
                            copyright,
                            al recibir 3 strikes
                            tu cuenta será suspendida cierto tiempo.</p>
                        <p>Si detectamos que tu cuenta ha sido suspendida cierto número de veces esta será bloqueada por
                            tiempo indefinido.</p>
                    </div>
                </div>
            </div>

            <h3 class="mt-4 title-form">Tarifas</h3>
            <div class="card mb-1">
                <button id="heading_3" class="card-header btn collapsed" data-toggle="collapse"
                    data-target="#collapse_3" aria-expanded="false" aria-controls="collapse_3">
                    <h5 class="m-0 text-left">¿Puedo pedir un reembolso?</h5>
                </button>

                <div id="collapse_3" class="collapse" aria-labelledby="heading_3" data-parent="#accordion">
                    <div class="card-body">
                        <p>Si, siempre que se solicite antes de que pasen 15 días desde que se realizó el pago, el
                            proceso es atendido por una persona física, no es automático.</p>
                    </div>
                </div>
            </div>
            <div class="card mb-1">
                <button id="heading_4" class="card-header btn collapsed" data-toggle="collapse"
                    data-target="#collapse_4" aria-expanded="false" aria-controls="collapse_4">
                    <h5 class="m-0 text-left">¿Cómo cambio de tarifa?</h5>
                </button>
                <div id="collapse_4" class="collapse" aria-labelledby="heading_4" data-parent="#accordion">
                    <div class="card-body">
                        <p>Simplemente seleccione la tarifa y realice el pago, no hay ningún tipo de descuento al cambiar de
                            tarifa, pero llevamos un registro de las compras para ofrecer distintas recompensas.</p>
                    </div>
                </div>
            </div>
            <div class="card">
                <button id="heading_5" class="card-header btn collapsed" data-toggle="collapse"
                    data-target="#collapse_5" aria-expanded="false" aria-controls="collapse_5">
                    <h5 class="m-0 text-left">¿Qué pasa con mis documentos si dejo de pagar o cambio a una tarifa más barata?</h5>
                </button>
                <div id="collapse_5" class="collapse" aria-labelledby="heading_5" data-parent="#accordion">
                    <div class="card-body">
                        <p>No te preocupes, tus documentos no serán eliminados, tienes un plazo de 15 días para eliminar aquellos que
                            no necesites, en caso de no eliminar los documentos serán comprimidos y enviados a tu E-Mail.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
