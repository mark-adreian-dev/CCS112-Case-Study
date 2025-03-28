<?php

namespace App\Http\Controllers;
use App\Models\User;
use Dotenv\Exception\ValidationException;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();

        return response() -> json([
            "data" => $users 
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
       
       
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        try {
            if($user) {
                return response() -> json([
                    "data" => $user
                ]);
            }
        } catch (Exception $e) {
            print($e-> getMessage());
            return response() -> json([
                'message' => "User does not exist",
                'error_message' => $e -> getMessage()
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
