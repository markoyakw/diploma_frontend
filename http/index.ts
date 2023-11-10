import axios from "axios";

const $api = axios.create({
    withCredentials: true,
    baseURL: process.env.API_BASE_URL
})

if (typeof window !== 'undefined') {
    $api.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
        return config
    })
}

export default $api