<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .container { max-width: 600px; margin: 0 auto; }
        .logout-form { margin-top: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>THIS IS  Dashboard</h1>
        <p>Hello, {{ Auth::user()->name }}!</p>
        <p>You have successfully logged in.</p>

        <form class="logout-form" method="POST" action="{{ route('logout') }}">
            @csrf
            <button type="submit">Logout</button>
        </form>
    </div>
</body>
</html>