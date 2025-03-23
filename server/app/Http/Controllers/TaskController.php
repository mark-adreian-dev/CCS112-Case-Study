<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException; 
use Exception; 
use Illuminate\Support\Facades\Auth; 


class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($project_id)
    {
        try {
            $project = Project::findOrFail($project_id);
            return response()->json([
                'data' => $project->tasks()->get()
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => "Project not found"
            ], 404);
        } catch (Exception $e) {
            return response()->json([
                'message' => "Something Went Wrong!",
                'systemErrorMessage' => $e->getMessage()
            ], 500); 
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $project_id)
    {
        try {
            $request->validate([
                'title' => 'required|string|max:100',
                'description' => 'nullable|string',
                'status' => 'required|string|in:pending,in_progress,completed',
            ]);

            $project = Project::findOrFail($project_id);

            $task = $project->tasks()->create([
                'title' => $request->input('title'),
                'description' => $request->input('description'),
                'status' => $request->input('status'),
                'user_id' => Auth::id(), // Assuming Sanctum auth
            ]);

            return response()->json([
                'message' => "Task Created Successfully",
                'TaskData' => $task
            ], 201);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => "Project not found"
            ], 404);
        } catch (Exception $e) {
            return response()->json([
                'message' => "Task Creation Unsuccessful",
                'systemErrorMessage' => $e->getMessage()
            ], 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($project_id, $task_id)
    {
        try {
            $project = Project::findOrFail($project_id);
            $task = $project->tasks()->findOrFail($task_id);

            return response()->json([
                'data' => $task
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => "Task or Project not found"
            ], 404);
        } catch (Exception $e) {
            return response()->json([
                'message' => "Something went wrong",
                'systemErrorMessage' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $project_id, $task_id)
    {
        try {
            $taskUpdate = $request->validate([
                'title' => 'sometimes|required|string|max:100',
                'description' => 'nullable|string',
                'status' => 'sometimes|required|string|in:pending,in_progress,completed',
            ]);

            $project = Project::findOrFail($project_id);
            $task = $project->tasks()->findOrFail($task_id);

            $task->update($taskUpdate);

            return response()->json([
                'message' => "Task Updated Successfully",
                'validated_data' => $taskUpdate
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => "Task or Project not found"
            ], 404);
        } catch (Exception $e) {
            return response()->json([
                'message' => "Something went wrong",
                'systemErrorMessage' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($project_id, $task_id)
    {
        try {
            $project = Project::findOrFail($project_id);
            $task = $project->tasks()->findOrFail($task_id);
            $task->delete();

            return response()->json([
                'message' => "Task successfully deleted",
                'data' => $task
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => "Task or Project not found"
            ], 404);
        } catch (Exception $e) {
            return response()->json([
                'message' => "Something Went Wrong",
                'systemErrorMessage' => $e->getMessage()
            ], 500);
        }
    }
}
