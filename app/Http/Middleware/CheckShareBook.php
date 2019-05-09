<?php

namespace App\Http\Middleware;

use Closure;

class CheckShareBook
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
        if($request->user()->storage->share_books)
        {
            return $next($request);
        }

        return redirect()->route('home')->with('message_limit', trans('books.limit2'));
    }
}
