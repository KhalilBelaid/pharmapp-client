import { createModel, RematchDispatch } from '@rematch/core'
import { signInWithEmailAndPassword, User } from 'firebase/auth'
import { RootModel } from '.'
import { auth as fireAuth} from "../../firebase"

type Credentials = {
    email: string,
    password: string
}

export type State = User | null

const auth = createModel<RootModel>()({
    state: null as State,
    reducers: {
        signedIn: (state: State, payload: User) => payload,
        signedOut: (state: State) => null,
    },
    effects: (dispatch: RematchDispatch<any>) => ({
        async signIn(payload: Credentials) {
            const authInstace = await signInWithEmailAndPassword(fireAuth, payload.email, payload.password)
            dispatch.auth.signedIn(authInstace.user)
        },
        async signOut() {
            await fireAuth.signOut()
            dispatch.auth.signedOut()
        }
    })
})

export default auth