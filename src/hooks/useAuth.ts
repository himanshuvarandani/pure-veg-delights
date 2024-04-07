import { AuthContext } from "@/context/AuthContext"
import { useContext } from "react"

const useAuth = () => {
  const { isLoading, user, cart, setCart } = useContext(AuthContext)

  return { isLoading, user, cart, setCart }
}

export default useAuth
