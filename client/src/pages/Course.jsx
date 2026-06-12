import { getCourse, learnMore } from "../api/course"
import { useEffect, useState } from "react"
import {FormatCourse} from "../components/Format"
import { useParams } from "react-router"

export default function Course(){
    
    const [course, setCourse] = useState(null)
    const [error, setError] = useState('')
    const {id} = useParams()
    
    useEffect(()=>{
        setCourse(null)
        setError('')
        const f = async ()=>{try {
            const response = await getCourse(id)
            const display = FormatCourse(response)
            setCourse(display)
        } catch (error) {
            setError('Something went wrong. Try again.')
        }}
        f()
    }, [id])

    const [loading, setLoading] = useState(false)

    async function handleMore(e){
        e.preventDefault()
        if (loading) return
        setLoading(true)
        try {
            const response = await learnMore(id)
            const display = FormatCourse(response)
            setCourse(display)
        } catch(error){
            setError('Something went wrong. Try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {course ? course : (
                <div className="py-20 text-center text-xl font-medium text-slate-500">
                    Generating Course...
                </div>
            )}
            {course && (
                <div className="mt-1 flex justify-center">
                <button
                    onClick={handleMore}
                    disabled={loading}
                    className="rounded-full bg-blue-500 px-8 py-3 font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading ? "Generating..." : "Learn More"}
                </button>
                </div>
            )}
            {error && (
                <p className="text-center text-sm font-medium text-red-600">
                {error}
                </p>
            )}
        </>
    )
}