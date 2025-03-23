<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TaskController;


Route::post('login', [AuthController::class, 'login'])->name('login');
Route::post('register', [AuthController::class, 'register'])->name('register');

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('projects', ProjectController::class);
    Route::apiResource('users', UserController::class);
    
    // Nest tasks under projects
    Route::prefix('projects/{project_id}')->group(function () {
        Route::apiResource('tasks', TaskController::class);
    });

    Route::post('logout', [AuthController::class, 'logout']);
});