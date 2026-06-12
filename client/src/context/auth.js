import axios from "axios"
const url=import.meta.env.VITE_API_URL+'auth'

export async function Signin(data){
    const response = await axios.post(url+'/signup', {
        name: data.username,
        email: data.email,
        password: data.password,
    })
    localStorage.setItem('token', response.data.token)
    localStorage.setItem('username', response.data.user.name)
    localStorage.setItem('email', response.data.user.email)
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
    return {success:true}
}

export async function Logged(data){
    const response = await axios.post(url+'/login', {
        name: data.username,
        password: data.password,
    })
    localStorage.setItem('token', response.data.token)
    localStorage.setItem('username', response.data.user.name)
    localStorage.setItem('email', response.data.user.email)
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
    return {success:true}
}