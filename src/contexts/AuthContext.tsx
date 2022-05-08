import { onAuthStateChanged } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { useContext, useState, useEffect, createContext } from "react"
import { AppUser } from "../common/types"
import { auth, db } from "../firebase"
import store from "../store"

const AuthContext = createContext<AppUser | null>(null)

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children } : any) {
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const docRef = doc(db, "pharmacies", user.uid)
            const docSnap = await getDoc(docRef)
            store.dispatch.auth.signedIn({...user, roles: {pharmacy: docSnap.exists()}})
            setCurrentUser({...user, roles: {pharmacy: docSnap.exists()}})
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