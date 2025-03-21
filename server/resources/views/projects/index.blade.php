<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Project CRUD</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .container { max-width: 800px; margin: 0 auto; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        .form-section { margin-bottom: 20px; }
        .form-section input, .form-section textarea { width: 100%; margin: 5px 0; }
        .success { color: green; }
    </style>
</head>
<body>
    <div class="container">
        <h1> All Projects.</h1>

        <!-- Check Connection -->
         @if (session('success'))
         <p class="success">{{session('success')}}</p>
         @endif

        <!-- Forms for CRUD -->
        <div class="form-section">
            <form action="POST" action="{{route ('projects.store')}}">
                <input type="text" name="title" placeholder="Title" required>
                <textarea name="description" placeholder="Description (optional)"></textarea>
                <input type="text" name="status" placeholder="Status" required>
                <button type="submit">Create New Project</button>
            </form>
        </div>
        <!-- Projects List with Edit/Delete -->
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
                @foreach ($projects as $project)
                    <tr>
                        <td>{{ $project->id }}</td>
                        <td>{{ $project->title }}</td>
                        <td>{{ $project->description ?? 'None' }}</td>
                        <td>{{ $project->status }}</td>
                        <td>
                            <!-- Edit Form -->
                            <form method="POST" action="{{ route('projects.update', $project) }}" style="display:inline;">
                                @csrf
                                @method('PUT')
                                <input type="text" name="title" value="{{ $project->title }}" required style="width: auto;">
                                <textarea name="description" style="width: auto;">{{ $project->description }}</textarea>
                                <input type="text" name="status" value="{{ $project->status }}" required style="width: auto;">
                                <button type="submit">Update</button>
                            </form>
                            <!-- Delete Form -->
                            <form method="POST" action="{{ route('projects.destroy', $project) }}" style="display:inline;">
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