<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

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
}
