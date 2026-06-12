import { generateCourse } from "../api/course"
import { useNavigate } from "react-router"
import { Outlet } from "react-router"
import { useState } from "react"

export default function Homepage(){
    
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  async function handleSubmit(e){
    e.preventDefault()
    if(loading) return
    setError('')
    setLoading(true)
    const formData = new FormData(e.target)
    const prompt = formData.get("prompt")
    try {
      const result = await generateCourse(prompt)
      navigate('/course/'+result['_id'])
    } catch (error) {
      setError('Generation Failed. Try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="flex justify-center px-6 pt-28">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl flex flex-col items-center">

        <input
          type="text"
          name="prompt"
          id="prompt"
          className="h-24 w-full rounded-2xl border border-slate-300 bg-white p-6 text-lg text-[#0f172a] placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Prompt the course you want to generate..."
        />

        <input
          type="submit"
          value={loading ? "Generating..." : "Generate Course!"}
          disabled={loading}
          className={`mt-6 mb-5 rounded-xl px-8 py-3 font-semibold text-white
            ${loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"}`}
        />

        {error && (
          <p className="text-center text-sm font-medium text-red-600">
          {error}
          </p>
        )}
      </form>
      </div>

      <Outlet />
    </>
  )
}