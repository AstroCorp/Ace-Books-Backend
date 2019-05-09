<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class CheckShareCollection
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
        if($request->user()->storage->share_collections)
        {
            return $next($request);
        }

        return redirect()->route('home')->with('message_limit', trans('collections.limit2'));
    }
}
