<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            return response()->json([
                'data' => Project::all()
            ]);
        } catch (Exception $e) {
            return response()->json([
                'message' => "Something went wrong",
                'error_message' => $e->getMessage()
            ], 500);
        }
       
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        try {
            $isValidated = $request -> validate( [
                'title' => 'required|string|max:100',
                'description' => 'required|string',
                'status' => 'required|string',
            ]);

            if($isValidated) {
                $project = Project::create([
                    'title' => $request->input('title'),
                    'description' => $request->input('description'),
                    'status' => $request->input('status'),
                ]);
        
                return response() -> json([
                    'message' => "Project Created Successfully",
                    'data' => $project
                ], 201);
            }

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
     * Display the specified resource.
     */
    public function show($project_id)
    {   
        try {
            $project = Project::findOrFail($project_id);
            if($project) {
                return response() -> json([
                    'data' => $project
                ]);
            }
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => "Project not found"
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
    public function update(Request $request, Project $project)
    {   
        
        try {
            $projectUpdate = $request -> validate([
                'title' => 'required|string|max:100',
                'description' => 'required|string',
                'status' => 'required|string',
            ]);
            
            if($projectUpdate) {
                $project->update($projectUpdate);
                return response() -> json([
                    'message' => 'Project Updated Successfully',
                    'data' => $project
                ]);
            }
           

        } catch(ModelNotFoundException $e) {
            return response()->json([
                'message' => "Target project not found"
            ], 404); 

        } catch (ValidationException $e) {
            return response()->json([
                'message' => "Data invalid input",
                'error_message' => $e -> getMessage()
            ], 422);

        } catch (Exception $e) {
            return response()->json([
                'message' => "Something went wrong"
            ], 500); 
        }
       
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($project_id)
    {

        try {
            $project = Project::destroy($project_id);

            return response() -> json([
                'message' => "Project successfully deleted",
                'data' => $project_id
            ]);
        } catch (ModelNotFoundException $e) {
            return response() -> json([
                'message' => "Project not found",
                'data' => $project
            ], 404);
        } catch (Exception $e) {
            return response() -> json([
                'message' => 'Something Went Wrong',
                'systemErrorMessage' => $e -> getMessage()
            ], 500);
        }
    }
}
