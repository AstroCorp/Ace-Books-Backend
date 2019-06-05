<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

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
}
