@extends('layouts.app')

@section('content')
<div class="row m-0 justify-content-center">
    <div class="mt-2 col">
        <div class="row m-0">
            <div class="col-12 text-center text-md-right">
                <div id="logo" class="mx-3"></div>
            </div>
        </div>
        <div class="row m-0 justify-content-center">
            <div class="col-11 p-0 mb-5">
                <div class="main-card mx-auto">
                    <h2 class="main-title">La mejor opción para disfrutar de tu lectura</h2>
                    <a class="main-btn" href="">Empezar a leer</a>
                </div>
            </div>

            <div class="col-11 col-md-3 m-3 simple-card">
                <h5 class="simple-title">Guarda tus libros</h5>
                <div class="simple-content">Te ofrecemos el paquete básico para que empieces a disfrutar de tu lectura.</div>
            </div>
            <div class="col-11 col-md-3 m-3 simple-card">
                <h5 class="simple-title">Tu lectura en cualquier lugar</h5>
                <div class="simple-content">Accede a tus libros desde cualquier dispositivo y retoma tu lectura donde desees.
                </div>
            </div>
            <div class="col-11 col-md-3 m-3 simple-card">
                <h5 class="simple-title">Comparte lo que desees</h5>
                <div class="simple-content">Comparte fácilmente con los demás, tus libros y colecciones pueden estar
                    disponibles de forma
                    pública o privada con un clic.</div>
            </div>
        </div>
    </div>
</div>
@endsection
