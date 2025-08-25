import axios from 'axios'


const api = axios.create({
    baseURL: 'http://localhost:5000/api'
})

// Before every request, this function runs, we're registering this here for anytime an api/... is called
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('bt_token') // localStorage is a browser feature, so it pulls the token from the user's browser
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})


export default api