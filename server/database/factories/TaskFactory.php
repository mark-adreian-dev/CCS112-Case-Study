<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Schema\ForeignKeyDefinition;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'project_id'=>fake()->numberBetween(1, 5),
            'title'=>implode(' ',fake()->words(3)),
            'status'=> fake()->randomElement(['pending','in progress', 'completed'])
        ];
    }
}
