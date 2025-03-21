<?php

namespace App\Http\Controllers;


use App\Models\Project;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index($project_id)
    {
        $project = Project::findOrFail($project_id);
        $tasks = $project->tasks;
        return view('tasks.index', compact('project', 'tasks'));
    }

    public function store(Request $request, $project_id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|string|max:255',
        ]);

        $project = Project::findOrFail($project_id);
        $project->tasks()->create($request->all());
        return redirect()->route('tasks.index', $project_id)->with('success', 'Task created successfully');
    }

    public function update(Request $request, $project_id, Task $task)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|string|max:255',
        ]);

        $task->update($request->all());
        return redirect()->route('tasks.index', $project_id)->with('success', 'Task updated successfully');
    }

    public function destroy($project_id, Task $task)
    {
        $task->delete();
        return redirect()->route('tasks.index', $project_id)->with('success', 'Task deleted successfully');
    }
}
