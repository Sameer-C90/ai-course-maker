import ReactMarkdown from "react-markdown"
import { Link } from "react-router"
import { deleteCourse } from "../api/course"
import trash from "../assets/trash.png"

export function FormatCourse(props){

    const moduleList = props.modules.map((module, index) => (
        <details
            key={index}
            className="rounded-3xl bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
            <summary className="cursor-pointer text-xl font-semibold text-[#0f172a] marker:hidden">
                {module.title}
            </summary>

            <div className="mt-3 h-px bg-slate-200"></div>

            <div className="mt-5">
                <ReactMarkdown
                    components={{
                        h3: ({ children }) => (
                            <h3 className="mb-3 mt-5 text-xl font-bold text-[#0f172a]">
                                {children}
                            </h3>
                        ),
                        p: ({ children }) => (
                            <p className="mb-4 leading-7 text-slate-600">
                                {children}
                            </p>
                        ),
                        ul: ({ children }) => (
                            <ul className="mb-4 list-disc pl-6 text-slate-600">
                                {children}
                            </ul>
                        ),
                        li: ({ children }) => (
                            <li className="mb-2">
                                {children}
                            </li>
                        ),
                        blockquote: ({ children }) => (
                            <blockquote className="my-4 rounded-xl border-l-4 border-blue-400 bg-blue-50 p-4 text-slate-700">
                                {children}
                            </blockquote>
                        ),
                        strong: ({ children }) => (
                            <strong className="font-semibold text-[#0f172a]">
                                {children}
                            </strong>
                        )
                    }}
                >
                    {module.content}
                </ReactMarkdown>
            </div>
        </details>
    ))

    return (
        <div className="mx-auto max-w-4xl px-6 py-10">

            <h1 className="mb-3 text-center text-5xl font-extrabold tracking-tight text-[#0f172a]">
                {props.name}
            </h1>

            <p className="mx-auto mb-12 max-w-2xl text-center text-lg leading-8 text-slate-500">
                {props.description}
            </p>

            <div className="flex flex-col gap-5">
                {moduleList}
            </div>

        </div>
    )
}

export function FormatAllCourses(courses, onDelete){

    const handleDelete = (e, id)=>{
        e.preventDefault()
        e.stopPropagation()
        onDelete(id)
    }

    const courseList = courses.map((course)=>(
        <div
            key={course._id}
            className="relative min-h-44 rounded-3xl bg-white p-6 shadow-md transition hover:shadow-lg"
        >
            <Link
                to={'/course/'+course._id}
                className="block"
            >
                <div className="mb-2 text-xl font-bold text-[#0f172a] pr-14 break-words">
                    {course.name}
                </div>

                <div
                    className="line-clamp-3 text-sm text-slate-600"
                >
                    {course.description}
                </div>
            </Link>

            <button
                onClick={(e) => handleDelete(e, course._id)}
                className="absolute top-8 right-8"
            >
                <img
                    src={trash}
                    alt="Trash icon"
                    className="h-5 w-5"
                />
            </button>
        </div>
    ))

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courseList}
        </div>
    )
}