<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    public function bookmarks()
    {
        return $this->hasMany('App\Bookmark');
    }

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function collection()
    {
        return $this->belongsTo('App\Collection');
    }
}
