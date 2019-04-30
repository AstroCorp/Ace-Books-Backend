<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Notifications\CustomResetPasswordNotification;
use App\Notifications\CustomValidationEmailNotification;

class User extends Authenticatable implements MustVerifyEmail
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'email', 'password'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'remember_token',
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

    public function booksWithoutCollection()
    {
        return $this->books()->where('collection_id', '=', NULL);
    }

    public function sendEmailVerificationNotification()
    {
        $this->notify(new CustomValidationEmailNotification());
    }

    public function sendPasswordResetNotification($token)
    {
       $this->notify(new CustomResetPasswordNotification($token));
    }
}
