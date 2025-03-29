<?php

namespace App\Http\Controllers;

use Dotenv\Exception\ValidationException;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Exception;

class AuthController extends Controller
{
    public function register(Request $request) {
        try {
            $isRegistrationValid = $request -> validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|unique:users,email',
                'password' => 'required|string|min:8|confirmed',
            ]);
    
            if($isRegistrationValid) {
                $user = User::create([
                    'name' => $request -> input('name'),
                    'email' => $request -> input('email'),
                    'password' =>  bcrypt($request -> input('password')),
                    'role' => 'User'
                ]);
    
                $token = $user -> createToken($user -> email);
                return response() -> json([
                    'message' => 'Welcome aboard to Project Management System',
                    'token' => $token -> plainTextToken,
                    'data' => $user
                ]); 
            }
        }  catch (ValidationException $e) {
            return response()->json([
                'message' => "Data invalid input",
                'error_message' => $e -> getMessage()
            ], 422);

        }
    }
    public function login(Request $request)
    {
        $user = User::where('email', $request->email)->first();

        if ($user) {
            if(Hash::check($request -> password, $user->password)){
                $token = $user->createToken($request->input('email'));
                return response() -> json([
                    'message' => 'Account Verified',
                    'token' => $token -> plainTextToken
                ]);
            }
        }

        return response() -> json([
            'message' => 'Invalid Credentials',
            'status_code' => 401,
            'error_code' => "UNAUTHORIZED"
        ]);
    }

    public function logout(Request $request)
    {   
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }
}
