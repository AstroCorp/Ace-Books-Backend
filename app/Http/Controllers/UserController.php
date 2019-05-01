<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Lang;
use App\Rules\ValidLanguage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Rules\currentPassword;

class UserController extends Controller
{
    // Form para editar el perfil
    public function edit_profile()
    {
        return view('settings_profile');
    }

    // Lógica del formulario del perfil
    public function update_profile(Request $request)
    {
        return Validator::make($request, [
            'username' => ['required', 'string', 'max:255'],
            'password' => ['required', 'string', 'min:8', 'confirmed', new currentPassword]
        ]);
    }

    // Form para editar los ajustes de la web
    public function edit_website()
    {
        $langs = Lang::all();

        return view('settings_website', compact('langs'));
    }

    // Lógica del formulario de los ajustes de la web
    public function update_website(Request $request)
    {
        return Validator::make($request, [
            'lang' => ['required', new ValidLanguage]
        ]);
    }
}
