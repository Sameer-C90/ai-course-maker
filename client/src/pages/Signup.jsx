import { Signin } from "../context/auth"
import { useNavigate } from "react-router"
import { Link } from "react-router"
import { useState } from "react"

export default function Signup(){
  const navigate = useNavigate()

  const [error, setError] = useState("")

  async function handleSignup(e){
    e.preventDefault()
    const formData = new FormData(e.target)
    const { username, email, password } = Object.fromEntries(formData)
    
    setError("")
    try {
      const success = await Signin({username, email, password})
      if(success){ navigate('/', {replace:true}) } 
    } catch (error) {
      setError('Signup Failed. Try again.') 
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center bg-[#eef6ff] px-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-md">

        <h1 className="mb-6 text-center text-2xl font-semibold text-[#0f172a]">
          Create an Account
        </h1>

        <form onSubmit={handleSignup} className="flex flex-col gap-4">

          <input
            type="text"
            name="username"
            placeholder="Username"
            className="rounded-xl border border-slate-300 px-4 py-3 text-[#0f172a] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="rounded-xl border border-slate-300 px-4 py-3 text-[#0f172a] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="rounded-xl border border-slate-300 px-4 py-3 text-[#0f172a] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          <button
            type="submit"
            className="mt-2 rounded-full bg-blue-500 px-8 py-3 font-semibold text-white hover:bg-blue-600"
          >
            Sign Up
          </button>

          {error && (
            <p className="text-center text-sm font-medium text-red-600">
            {error}
            </p>
          )}

          <p className="text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-500 hover:text-blue-600"
            >
              Login
            </Link>
          </p>

        </form>

      </div>
  </div>
  )
}