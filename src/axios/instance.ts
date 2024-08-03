import { auth } from "@/firebase/client"
import axios from "axios"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AXIOS_BASE_URL,
  headers: { "Content-Type": "application/json" }
})

api.interceptors.request.use(
  async config => {
    const user = auth.currentUser
    if (user) {
      const token = await user.getIdTokenResult()
      if (token)
        config.headers.Authorization = `Bearer ${token.token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default api
