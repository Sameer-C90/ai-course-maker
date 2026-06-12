import { Logged } from "../context/auth"
import { useState } from "react"
import { useNavigate } from "react-router"
import { Link } from "react-router"

export default function Login(){
  const navigate = useNavigate()
  
  const [error, setError] = useState("")

  async function handleLogin(e){
    e.preventDefault()
    const formData = new FormData(e.target)
    const { username, password } = Object.fromEntries(formData)
    setError("")
    try {
      const success = await Logged({username, password})
      if(success){ navigate('/', {replace:true}) } 
    } catch (error) {
      setError('Login Failed. Try again') 
    }
  }

  return (
    <>
      <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center bg-[#eef6ff] px-6">

        <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-md">

          <h1 className="mb-6 text-center text-2xl font-semibold text-[#0f172a]">
            Login
          </h1>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">

            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              className="rounded-xl border border-slate-300 px-4 py-3 text-[#0f172a] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />

            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="rounded-xl border border-slate-300 px-4 py-3 text-[#0f172a] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />

            <button
              type="submit"
              className="mt-2 rounded-full bg-blue-500 px-8 py-3 font-semibold text-white hover:bg-blue-600"
            >
              Login
            </button>

            {error && (
              <p className="text-center text-sm font-medium text-red-600">
              {error}
              </p>
            )}

            <p className="text-center text-sm text-slate-500">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-blue-500 hover:text-blue-600"
                >
                Sign Up
              </Link>
            </p>
          </form>

        </div>

      </div>
  </>
  )
}