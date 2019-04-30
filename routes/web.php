<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'StaticController@index')->name('index');

Auth::routes(['verify' => true]);

Route::get('/home', 'HomeController@index')->name('home');
Route::post('/library', 'HomeController@library')->name('library');

Route::get('/info', 'StaticController@info')->name('info');

Route::resource('collection', 'CollectionController')->except([
    'index'
]);

Route::resource('book', 'BookController')->except([
    'index'
]);

Route::resource('profile', 'UserController')->only([
    'edit', 'update'
]);

Route::get('/cpanel', 'UserController@index')->name('cpanel');