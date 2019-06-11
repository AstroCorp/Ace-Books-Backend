<?php

namespace App;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use App\Book;

class Collection extends Model
{
    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function books()
    {
        return $this->hasMany('App\Book');
    }

    public function deleteWithoutBooks()
    {
        $this->books()->each(function($book, $key)
        {
            $book->collection_id = null;
            $book->save();
        });

        $this->remove();
    }

    public function deleteWithBooks()
    {
        $this->books()->each(function($book, $key)
        {
            $book->remove();
        });

        $this->remove();
    }

    private function remove()
    {
        if($this->image !== null)
        {
            unlink(public_path().'/images/collections/'.$this->image);
        }

        $this->delete();
    }

    public function setImage($image)
    {
        $imageName = Str::uuid().".".$image->getClientOriginalExtension();
        $image->move(public_path().'/images/collections/', $imageName);

        $this->image = $imageName;
    }

    public function addBooks($newBooks)
    {
        $books = Book::all()->only($newBooks);

        foreach ($books as $book)
        {
            $book->collection_id = $this->id;
            $book->save();
        }
    }

    public function updateBooks($newBooks)
    {
        DB::table('books')
            ->where('collection_id', 1)
            ->update(['collection_id' => null]);

        $this->addBooks($newBooks);
    }
}
