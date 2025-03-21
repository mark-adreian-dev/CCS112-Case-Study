<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tasks for {{ $project->title }}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .container { max-width: 800px; margin: 0 auto; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; border: 2px solid black; }
        th, td { border: 2px solid black; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        .form-section { margin-bottom: 20px; }
        .form-section input, .form-section textarea { width: 100%; margin: 5px 0; }
        .success { color: green; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Tasks for {{ $project->title }}</h1>
        <a href="{{ route('projects.index') }}">Back to Projects</a>

        <!-- Success Message -->
        @if (session('success'))
            <p class="success">{{ session('success') }}</p>
        @endif

        <!-- Create Form -->
        <div class="form-section">
            <h2>Add New Task</h2>
            <form method="POST" action="{{ route('tasks.store', $project->id) }}">
                @csrf
                <input type="text" name="title" placeholder="Task Title" required>
                <textarea name="description" placeholder="Description (optional)"></textarea>
                <input type="text" name="status" placeholder="Status" required>
                <button type="submit">Create Task</button>
            </form>
        </div>

        <!-- Tasks List with Edit/Delete -->
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($tasks as $task)
                    <tr>
                        <td>{{ $task->id }}</td>
                        <td>{{ $task->title }}</td>
                        <td>{{ $task->description ?? 'None' }}</td>
                        <td>{{ $task->status }}</td>
                        <td>
                            <!-- Edit Form -->
                            <form method="POST" action="{{ route('tasks.update', [$project->id, $task->id]) }}" style="display:inline;">
                                @csrf
                                @method('PUT')
                                <input type="text" name="title" value="{{ $task->title }}" required style="width: auto;">
                                <textarea name="description" style="width: auto;">{{ $task->description }}</textarea>
                                <input type="text" name="status" value="{{ $task->status }}" required style="width: auto;">
                                <button type="submit">Update</button>
                            </form>
                            <!-- Delete Form -->
                            <form method="POST" action="{{ route('tasks.update', [$project->id, $task->id]) }}" style="display:inline;">
                                @csrf
                                @method('DELETE')
                                <button type="submit" onclick="return confirm('Are you sure?')">Delete</button>
                            </form>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</body>
</html>