<?php

namespace App\Rules;

use App\Storage;
use Illuminate\Contracts\Validation\Rule;

class CheckValidStorage implements Rule
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
        $storages = Storage::all();

        return $storages->contains($value);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return trans('storage.buyError');
    }
}
