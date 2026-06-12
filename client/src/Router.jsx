import App from "./App"
import Course from "./pages/Course"
import Homepage from "./pages/Homepage"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import { createBrowserRouter } from "react-router"
import ProtectedRoute from "./components/ProtectedRoute"

const router = createBrowserRouter([
    {
    element: <App />,
    children: [
      { path: '/signup', element: <Signup /> },
      { path: '/login', element: <Login /> },
      {element:<ProtectedRoute />, children: [
        { path: '/', element: <Homepage />, children: [
          {path:'/course/:id', element: <Course />}
        ]},
        {path: '/dashboard', element: <Dashboard />}
      ]}
    ]
  }
])

export default router