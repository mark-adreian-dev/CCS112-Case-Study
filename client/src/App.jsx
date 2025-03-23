import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Login from './pages/Login'
function App() {
  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={"/login"} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard">
            <Route index element={<>Dashboard</>} />
            <Route path="projects">
              <Route index element={<>Project</>} />
              <Route path="tasks" element={<>tasks</>}/>
            </Route>
          </Route>
          <Route path="*" element={<>404 Page not found</>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
