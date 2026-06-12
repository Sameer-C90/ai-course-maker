import logo from "../assets/logo.png"
import name from "../assets/Name.png"
import { useState } from "react"
import { NavLink, useNavigate, useLocation } from "react-router"

export default function Navbar() {
  const user = localStorage.getItem("username")
  const token = localStorage.getItem("token")
  const location = useLocation()
  const isDashboard = location.pathname === "/dashboard"

  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("email")

    setOpen(false)
    navigate("/login", { replace: true })
  }

  return (
    <nav className="fixed top-0 inset-x-0 z-50 flex h-16 items-center justify-between bg-[#eef6ff] px-6 shadow-md">
      
      <div className="flex items-center gap-3">
        <img src={logo} alt="Logo" className="h-12 w-auto" />
        <img src={name} alt="AI Course Maker" className="h-5 w-auto" />
      </div>

      {token ? (
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="text-base font-semibold text-[#0f172a] hover:opacity-80"
          >
            {user} ▾
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md overflow-hidden">
              
              <button
                onClick={() => {
                  setOpen(false)
                  navigate(isDashboard ? "/" : "/dashboard")
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-base font-semibold text-[#0f172a]"
              >
                {isDashboard ? "Home" : "Dashboard"}
              </button>

              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 text-base font-semibold"
              >
                Logout
              </button>

            </div>
          )}
        </div>
      ) : (
        <NavLink
          to="/login"
          className="text-base font-semibold text-[#0f172a] hover:opacity-80"
        >
          Signup/Login
        </NavLink>
      )}
    </nav>
  )
}