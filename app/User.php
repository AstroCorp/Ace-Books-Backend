<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function storage()
    {
        return $this->belongsTo('App\Storage');
    }

    public function lang()
    {
        return $this->belongsTo('App\Lang');
    }

    public function rank()
    {
        return $this->belongsTo('App\Rank');
    }

    public function collections()
    {
        return $this->hasMany('App\Collection');
    }

    public function books()
    {
        return $this->hasMany('App\Book');
    }
}
