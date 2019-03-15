<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\App;

class WebLanguage
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        /*
        Borrar:
            $request->session()->forget('lang');
            $request->session()->flush();

        Asignar por defecto:
            if(!$request->session()->has('lang'))
            {
                $request->session()->put('lang', 'es');
            }
        */

        $lang = $request->session()->get('lang');
        App::setLocale($lang);

        return $next($request);
    }
}
