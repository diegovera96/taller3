<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'name' => 'Diego Vera Santis',
            'rut' => '19.100.636-4',
            'email' => 'diego.vera@alumnos.ucn.cl',
            'birth_date' => '1998-10-06',
            'password' => Hash::make('password'),
        ]);
    }
}
