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

/**
 * UserController
 *
 * Controlador para gestionar las operaciones de los usuarios.
 */

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
     * Almacena un nuevo recurso de usuario en la base de datos.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            // Inicia una transacción de base de datos
            DB::beginTransaction();

            // Define los mensajes personalizados para la validación
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

            // Crea un validador con las reglas de validación
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|min:10|max:150|regex:/^[a-zA-Z\s]*$/',
                'rut' => ['required', 'string', 'unique:users', new ValidarRut()],
                'email' => ['required', 'email', 'unique:users', new ValidarCorreo()],
                'birth_date' => 'required|date_format:d/m/Y|after:01/01/1900'
            ], $customMessages);

            // Si la validación falla, devuelve una respuesta con los errores
            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

             // Formatea la fecha de nacimiento y crea una contraseña
            $birth_date = Carbon\Carbon::createFromFormat('d/m/Y', $request->birth_date)->format('Y-m-d');
            $password = Rut::parse($request->rut)->format(Rut::FORMAT_ESCAPED);

            // Crea un nuevo usuario con los datos proporcionados
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
     * Actualiza el recurso especificado en el almacenamiento.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, string $id)
    {
        try{
            // Inicia una transacción de base de datos
            DB::beginTransaction();

            // Busca el usuario por su ID
            $user = User::find($id);

            // Define los mensajes personalizados para la validación
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

            // Crea un validador con las reglas de validación
            $validator = Validator::make($request->all(), [
                'name' => 'string|min:10|max:150|regex:/^[a-zA-Z\s]*$/',
                'rut' => ['string', new ValidarRut(), Rule::unique('users')->ignore($user->id)],
                'email' => ['email', new ValidarCorreo(), Rule::unique('users')->ignore($user->id)],
                'birth_date' => 'before:today|after:01/01/1900|date_format:d/m/Y',
                'password' => 'nullable|string|min:8|max:20',
                'confirm_password' => 'same:password'
            ], $customMessages);

            // Si la validación falla, devuelve una respuesta con los errores
            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            // Si se proporciona una fecha de nacimiento, la formatea y la asigna al usuario
            if ($request->birth_date) {
                $birth_date = Carbon\Carbon::createFromFormat('d/m/Y', $request->birth_date)->format('Y-m-d');
                $user->birth_date = $birth_date??$user->birth_date;
            }
            // Asigna los nuevos valores al usuario
            $user->name = $request->name??$user->name;
            $user->rut = $request->rut??$user->rut;
            $user->email = $request->email??$user->email;

            // Si se proporciona una contraseña, la asigna al usuario
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
