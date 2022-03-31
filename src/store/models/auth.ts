import { createModel, RematchDispatch } from '@rematch/core'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { RootModel } from '.'
import { User } from '../../common/types'
import { auth as fireAuth} from "../../firebase"

type Credentials = {
    email: string,
    password: string
}

export type State = Readonly<User> | null

const auth = createModel<RootModel>()({
    state: null as State,
    reducers: {
        signedIn: (state: State, payload: Readonly<User>) => payload,
        signedOut: (state: State) => null,
    },
    effects: (dispatch: RematchDispatch<any>) => ({
        async signIn(payload: Credentials) {
            const authInstace = await signInWithEmailAndPassword(fireAuth, payload.email, payload.password)
            const signedInUser: Readonly<User> = {
                uid: authInstace.user.uid,
                email: authInstace.user.email
            }
            dispatch.auth.signedIn(signedInUser)
        },
        async signOut() {
            await fireAuth.signOut()
            dispatch.auth.signedOut()
        }
    })
})

export default auth