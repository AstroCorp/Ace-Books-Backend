<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class CheckBookName implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public $id;

    public function __construct($id = 0)
    {
        $this->id = $id;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        // Si existe uno con ese nombre no es admitido
        return !Auth::user()->books->except($this->id)->contains('name', $value);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return trans('books.bookNameError');
    }
}
