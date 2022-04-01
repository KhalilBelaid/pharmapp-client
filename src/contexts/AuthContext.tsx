import { onAuthStateChanged, User } from "firebase/auth"
import { useContext, useState, useEffect, createContext } from "react"
import { auth } from "../firebase"
import store from "../store"

const AuthContext = createContext<User | null>(null)

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children } : any) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            store.dispatch.auth.signedIn(user)
            setCurrentUser(user)
            setLoading(false)
        }
        else {
            store.dispatch.auth.signedOut()
            setCurrentUser(user)
            setLoading(false)
        }
    })
  }, [])
  return (
    <AuthContext.Provider value={currentUser}>
      {!loading && children}
    </AuthContext.Provider>
  )
}