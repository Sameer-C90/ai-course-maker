import { FormatAllCourses } from "../components/Format"
import { getAllCourses, deleteCourse } from "../api/course"
import { useEffect, useState } from "react"

export default function Dashboard(){
  const username = localStorage.getItem('username')
  const email = localStorage.getItem('email')

  const [course, setCourses] = useState([])
  const [error, setError] = useState('')

  useEffect(()=>{
    const f = async ()=>{
      try {
        const data = await getAllCourses()
        setCourses(data.courses)
      } catch (error) {
          setError('Error occured. Please Refresh or Try Again Later.')
      }
    }
    f()
  }, [])

  const handleDelete = async (id) => {
    try {
      await deleteCourse(id)
      setCourses(prev => prev.filter(c => c._id !== id))
    } catch (error) {
        setError('Error occured. Please Refresh or Try Again Later.')
    }
  }

  return (
    <>
      <div className="mx-auto max-w-6xl px-6 pt-24">

      <div className="mb-10 flex justify-end">
        <div className="text-right">
          <h1 className="text-3xl font-bold text-slate-600">
            {username}
          </h1>

          <p className="text-sm text-slate-500">
            {email}
          </p>
        </div>
      </div>

      {FormatAllCourses(course, handleDelete)}
      {error && (
        <p className="text-center text-sm font-medium text-red-600">
        {error}
        </p>
      )}

      </div>
    </>
  )
}