<?php

namespace App\Http\Middleware;

use Closure;

class CheckAddBook
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
        if($request->user()->n_books < $request->user()->storage->amount_books)
        {
            return $next($request);
        }

        return redirect()->route('home')->with('message_limit', trans('books.limit1'));
    }
}
