<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function showLoginForm()
    {
            return view('/welcome'); // Assumes you have a login.blade.php view
    }
    // Handle login
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            // Login successful, redirect to a dashboard or home page
            return redirect()->intended('/dashboard');
        }

        // Login failed, redirect back with an error
        return redirect()->back()->with('error', 'Invalid credentials');
    }
    // Handle logout
    public function logout(Request $request)
    {
        Auth::logout(); // End the session
        return redirect('/login'); // Redirect to login page
    }
}
