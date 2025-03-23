<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    /** @use HasFactory<\Database\Factories\TaskFactory> */
    use HasFactory;
    protected $fillable = ['project_id', 'title', 'status'];

    public function project()
    {
    return $this->belongsTo(Project::class, 'project_id');
    }
}

