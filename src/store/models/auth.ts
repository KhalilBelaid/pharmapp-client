import { createModel, RematchDispatch } from '@rematch/core'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { RootModel } from '.'
import { auth as fireAuth} from "../../firebase"
import { db } from '../../firebase'
import { doc, getDoc } from "firebase/firestore"
import { AppUser } from '../../common/types'

type Credentials = {
    email: string,
    password: string
}

export type State = AppUser | null

const auth = createModel<RootModel>()({
    state: null as State,
    reducers: {
        signedIn: (state: State, payload: AppUser) => payload,
        signedOut: (state: State) => null,
    },
    effects: (dispatch: RematchDispatch<any>) => ({
        async signIn(payload: Credentials) {
            const authInstace = await signInWithEmailAndPassword(fireAuth, payload.email, payload.password)
            const docRef = doc(db, "pharmacies", authInstace.user.uid)
            const docSnap = await getDoc(docRef)
            dispatch.auth.signedIn({ ...authInstace.user, roles: {pharmacy: docSnap.exists()}})
        },
        async signOut() {
            await fireAuth.signOut()
            dispatch.auth.signedOut()
        }
    })
})

export default auth