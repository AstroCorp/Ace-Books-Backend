<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Lang;
use App\Rules\ValidLanguage;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Rules\currentPassword;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('verified'); // E-Mail verificado
    }
    
    public function edit_profile()
    {
        return view('settings_profile');
    }

    public function update_profile(Request $request)
    {
        $request->validate([
            'image' => ['image', 'max:2000'], // 2 MB 
            'username' => ['required', 'string', 'max:50', Rule::unique('users', 'username')->ignore(Auth::user()->id)]
        ]);

        $user = Auth::user();

        if($request->hasFile('image'))
        {
            $userImage = $request->file('image');
        
            $imageName = $user->id.".".$userImage->getClientOriginalExtension();
            $userImage->move(public_path().'/images/profiles/', $imageName);

            $user->user_image = $imageName;
        }
        
        $user->username = $request->input('username');

        $user->save();

        return redirect()->route('profile.edit')->with('status', true);
    }

    // Form para editar el perfil
    public function edit_password()
    {
        return view('settings_password');
    }

    // Lógica del formulario del perfil
    public function update_password(Request $request)
    {
        $request->validate([
            'currentpassword' => ['required', 'string', new currentPassword],
            'password' => ['required', 'string', 'min:8', 'confirmed']
        ]);

        $user = Auth::user();

        $user->password = Hash::make($request->input('password'));

        $user->save();

        return redirect()->route('password.edit')->with('status', true);
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
