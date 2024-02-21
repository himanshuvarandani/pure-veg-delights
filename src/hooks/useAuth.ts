import { AuthContext } from "@/context/AuthContext"
import { useContext } from "react"

const useAuth = () => {
  const { user, cart, setCart } = useContext(AuthContext)

  return { user, cart, setCart }
}

export default useAuth
