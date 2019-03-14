<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use App\Lang;

class ValidLanguage implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
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
        $search_lang = Lang::find($value);

        return strlen($search_lang) > 0;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return trans('passwords.lang');
    }
}
