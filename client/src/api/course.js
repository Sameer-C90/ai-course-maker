import axios from "axios"
const url = import.meta.env.VITE_API_URL+'course/'
const token = localStorage.getItem('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`


export async function generateCourse(prompt){
    try {
        const course = await axios.post(url, {prompt})
        return course.data.result
    } catch (error) {
        console.log(error)
    }
}

export async function learnMore(courseId){
    try {
        const more = await axios.patch(url+courseId)
        return more.data.result
    } catch (error) {
        console.log(error)
    }
}

export async function getAllCourses(){
    try {
        const courses = await axios.get(url)
        return courses.data
    } catch (error) {
        console.log(error)
    }
}

export async function getCourse(courseId){
    try {
        const course = await axios.get(url+courseId)
        return course.data.course
    } catch (error) {
        console.log(error)
    }
}

export async function deleteCourse(courseId){
    try {
        await axios.delete(url+courseId)
        return {success:true}
    } catch (error) {
        console.log(error)
    }
}

