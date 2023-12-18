<?php

namespace App\Rules;

include(base_path('vendor/autoload.php'));
use Freshwork\ChileanBundle\Rut;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;


class ValidarRut implements ValidationRule
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

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        //Correcto formato 12.345.678-9
        if($value !== Rut::parse($value)->quiet()->format(Rut::FORMAT_COMPLETE)){
            $fail('Ingrese rut con puntos, guión y K mayúscula.');
        }

        //Validar número verificador
        if(!Rut::parse($value)->quiet()->validate()){
            $fail('Rut inválido.');
        }
    }
}
