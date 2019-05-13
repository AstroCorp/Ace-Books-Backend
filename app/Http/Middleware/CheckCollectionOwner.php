<?php

namespace App\Http\Middleware;

use Closure;

class CheckCollectionOwner
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
        $collection_id = $request->collection->id;

        if($request->user()->collections->contains('id', $collection_id))
        {
            return $next($request);
        }

        return redirect()->route('home')->with('message_limit', trans('collections.ownerError'));
    }
}
