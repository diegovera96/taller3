<?php

namespace App\Rules;

include(base_path('vendor/autoload.php'));
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;


class ValidarCorreo implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $allowedDomains = ['alumnos.ucn.cl', 'ucn.cl', 'disc.ucn.cl', 'ce.ucn.cl'];
        $domain = substr(strrchr($value, "@"), 1);
        if (!in_array($domain, $allowedDomains)) {
            $allowedDomainsString = implode(', ', $allowedDomains);
            $fail("Los dominios permitidos son: $allowedDomainsString");
        }
    }
}
