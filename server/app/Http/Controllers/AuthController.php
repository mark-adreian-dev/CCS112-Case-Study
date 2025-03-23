<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
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
        ]);
    }

    public function logout(Request $request)
    {   

        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }
}
