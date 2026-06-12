import {Navigate, Outlet} from "react-router"

export default function ProtectedRoute(){
    const token = localStorage.getItem('token')
    return token?<Outlet />:<Navigate to="/login" />
}