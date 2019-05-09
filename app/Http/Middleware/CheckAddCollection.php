<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class CheckAddCollection
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
        if($request->user()->n_collections < $request->user()->storage->amount_collections)
        {
            return $next($request);
        }

        return redirect()->route('home')->with('message_limit', trans('collections.limit1'));
    }
}
