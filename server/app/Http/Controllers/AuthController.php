<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function showLoginForm()
    {
            return view('/welcome'); 
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            return redirect()->intended('/dashboard');
        }

        return redirect()->back()->with('error', 'Invalid credentials');
    }

    public function logout(Request $request)
    {
        Auth::logout(); // End the session
        return redirect('/login'); 
    }
}
