<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
           'name'=> fake()->name(),
           'email'=> fake()->email(),
           'password'=>fake()->password(),
           'role'=>fake()->randomElement(['admin', 'user'])
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
}
