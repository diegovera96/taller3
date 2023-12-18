<?php

namespace App\Http\Controllers;

use Carbon;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Rules\ValidarRut;
use App\Rules\ValidarCorreo;

use Freshwork\ChileanBundle\Rut;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            DB::beginTransaction();

            $customMessages = [
                'required' => 'El campo :attribute es obligatorio.',
                'string' => 'El campo :attribute debe ser un texto.',
                'min' => 'El campo :attribute debe tener un mínimo de :min caracteres.',
                'max' => 'El campo :attribute debe tener un máximo de :max caracteres.',
                'unique' => 'El campo :attribute ya existe en la base de datos.',
                'before' => 'El campo :attribute debe ser una fecha anterior a la actual.',
                'after' => 'El campo :attribute debe ser una fecha posterior al 01/01/1900.',
                'date_format' => 'El campo :attribute debe tener el formato dd/mm/aaaa.',
                'date' => 'El campo :attribute debe ser una fecha válida.',
            ];

            $validator = Validator::make($request->all(), [
                'name' => 'required|string|min:10|max:150|regex:/^[a-zA-Z\s]*$/',
                'rut' => ['required', 'string', 'unique:users', new ValidarRut()],
                'email' => ['required', 'email', 'unique:users', new ValidarCorreo()],
                'birth_date' => 'required|date_format:d/m/Y|after:01/01/1900'
            ], $customMessages);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $birth_date = Carbon\Carbon::createFromFormat('d/m/Y', $request->birth_date)->format('Y-m-d');
            $password = Rut::parse($request->rut)->format(Rut::FORMAT_ESCAPED);
            $user = User::create([
                'name' => $request->name,
                'rut' => $request->rut,
                'email' => $request->email,
                'birth_date' => $birth_date,
                'password' => Hash::make($password)
            ]);

            DB::commit();
            return response()->json([
                'status' => 'success',
                'message' => 'Usuario creado correctamente.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try{
            DB::beginTransaction();
            $user = User::find($id);
            $customMessages = [
                'string' => 'El campo :attribute debe ser un texto.',
                'min' => 'El campo :attribute debe tener un mínimo de :min caracteres.',
                'max' => 'El campo :attribute debe tener un máximo de :max caracteres.',
                'unique' => 'El campo :attribute ya existe en la base de datos.',
                'before' => 'El campo :attribute debe ser una fecha anterior a la actual.',
                'after' => 'El campo :attribute debe ser una fecha posterior al 01/01/1900.',
                'date_format' => 'El campo :attribute debe tener el formato dd/mm/aaaa.',
                'date' => 'El campo :attribute debe ser una fecha válida.',
                'same' => 'El campo :attribute debe ser igual al campo :other.'
            ];

            $validator = Validator::make($request->all(), [
                'name' => 'string|min:10|max:150|regex:/^[a-zA-Z\s]*$/',
                'rut' => ['string', new ValidarRut(), Rule::unique('users')->ignore($user->id)],
                'email' => ['email', new ValidarCorreo(), Rule::unique('users')->ignore($user->id)],
                'birth_date' => 'before:today|after:01/01/1900|date_format:d/m/Y',
                'password' => 'nullable|string|min:8|max:20',
                'confirm_password' => 'same:password'
            ], $customMessages);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }
            if ($request->birth_date) {
                $birth_date = Carbon\Carbon::createFromFormat('d/m/Y', $request->birth_date)->format('Y-m-d');
                $user->birth_date = $birth_date??$user->birth_date;
            }
            $user->name = $request->name??$user->name;
            $user->rut = $request->rut??$user->rut;
            $user->email = $request->email??$user->email;
            if (!$request->password == "") {
                $user->password = Hash::make($request->password??$user->password);
            }

            $user->save();

            DB::commit();
            return response()->json([
                'status' => 'Success',
                'message' => 'Usuario actualizado correctamente.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
