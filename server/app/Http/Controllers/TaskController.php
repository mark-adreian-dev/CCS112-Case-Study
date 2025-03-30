<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException; 
use Illuminate\Validation\ValidationException;
use Exception; 


class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($project_id)
    {   
        try {
            $project = Project::findOrFail($project_id);

            if($project) {
                $tasks = Task::where('project_id', $project_id)->get();
                return response()->json([
                    'data' => $tasks
                ]);
            }
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => "Target Project Not Found",
                'error_message'=> $e->getMessage()
            ], 404);

        } catch (Exception $e) {
            return response()->json([
                'message' => "Something went wrong on our servers try refreshing the page.",
                'error_message' => $e->getMessage()
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
                'status' => 'required|string|in:pending,in_progress,completed',
            ]);

            $project = Project::findOrFail($project_id);

            if($request && $project) {
                $task = Task::create([
                    'title' => $request->input('title'),
                    'status' => $request->input('status'),
                    'project_id' => (int) $project_id
                ]);

                return response()->json([
                    'message' => "Task Created Successfully",
                    'data' => $task
                ], 201);
            }
            
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => "Requested resources not found"
            ], 404);

        } catch (ValidationException $e) {
            return response()->json([
                'message' => "Data invalid input",
                'error_message' => $e -> getMessage()
            ], 422);

        } catch (Exception $e) {
            return response()->json([
                'message' => "Something went wrong on our servers try refreshing the page.",
                'error_message' => $e->getMessage()
            ], 500); 
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($project_id, $task_id)
    {
        try {
            $project = Project::findOrFail($project_id);

            if($project) {
                $task = Task::findOrFail($task_id);

                if($task) {
                    return response()->json([
                        'data' => $task
                    ]);
                }
                return response()->json([
                    'message' => 'task is non existent to the project'
                ]);
                
            } 
            
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => "Target data requested not found",
                'error_message' => $e->getMessage()
            ], 404);

        } catch (Exception $e) {
            return response()->json([
                'message' => "Something went wrong",
                'error_message' => $e->getMessage()
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
                'status' => 'sometimes|required|string|in:pending,in progress,completed',
            ]);

            $project = Project::findOrFail($project_id);

            if($project) {
                $task = Task::findOrFail($task_id);

                if($task) {
                    $task->update($taskUpdate);
    
                    return response()->json([
                        'message' => "Task Updated Successfully",
                        'validated_data' => $taskUpdate,
                        'data' => $task
                    ]);
                }
            }
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => "Target data requested not found"
            ], 404);
            
        } catch (ValidationException $e) {
            return response()->json([
                'message' => "Data invalid input",
                'error_message' => $e -> getMessage()
            ], 422);
        } catch (Exception $e) {
            return response()->json([
                'message' => "Something went wrong",
                'error_message' => $e->getMessage()
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

            if($project) {
                $task = Task::findOrFail($task_id);

                if($task) {
                    $task->delete();
                    return response()->json([
                        'message' => "Task successfully deleted",
                        'data' => $task
                    ]);
                }
            }
            
           

           
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => "Target data requested not found"
            ], 404);
        } catch (Exception $e) {
            return response()->json([
                'message' => "Something went wrong",
                'error_message' => $e->getMessage()
            ], 500);
        }
    }
}
