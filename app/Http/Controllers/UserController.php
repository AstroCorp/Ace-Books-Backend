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
        $request->validate([
            'username' => ['required', 'string', 'max:50'],
            'currentpassword' => ['required', 'string', new currentPassword],
            'password' => ['required', 'string', 'min:8', 'confirmed']
        ]);

        $user = Auth::user();
            $user->username = $request->input('username');
            $user->password = Hash::make($request->input('password'));
        $user->save();

        return redirect()->route('profile.edit')->with('status', true);
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
        $request->validate([
            'lang' => ['required', new ValidLanguage]
        ]);

        $user = Auth::user();
            $user->lang_id = $request->input('lang');
        $user->save();

        return redirect()->route('website.edit')->with('status', true);
    }
}
