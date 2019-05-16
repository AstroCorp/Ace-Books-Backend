<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Imagick;

class StaticController extends Controller
{
    public function index()
    {
        return view('index');
    }

    public function info()
    {
        return view('info');
    }

    public function conditions()
    {
        return view('auth.conditions');
    }

    public function test()
    {
        $im = new Imagick(public_path().'/books/2ef6d816-b091-42c8-8d6a-d5b9d530f2d2.pdf[0]');

        $im->thumbnailImage(212, 300, true);
        $im->setImageFormat( "png32" );
        $im->setImageFormat('png');
        $im->writeImage(public_path().'/books/thumb.png');
        $im->clear();
        $im->destroy();
    }
}
