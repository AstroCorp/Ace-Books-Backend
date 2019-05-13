<?php

namespace App\Http\Middleware;

use Closure;

class CheckBookOwner
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
        $book_id = $request->book->id;

        if($request->user()->books->contains('id', $book_id))
        {
            return $next($request);
        }

        return redirect()->route('home')->with('message_limit', trans('books.ownerError'));
    }
}
