import { BrowserRouter, Routes, Route, Navigate} from "react-router";
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import SignUp from "./pages/SignUp";
import ProjectsDashboard from "./pages/ProjectsDashboard";

function App() {
  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={"/login"} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/projects" element={<ProjectsDashboard />}/>
          <Route path="*" element={<>404 Page not found</>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
