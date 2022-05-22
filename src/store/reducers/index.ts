import { combineReducers } from "redux"
import { firebaseReducer, FirebaseReducer } from "react-redux-firebase"
import { FirestoreReducer, firestoreReducer } from "redux-firestore"

interface User {
	firstName: string
	lastName: string
	email: string
	role?: string
}

interface FirestoreDatabase {
	pharmacies: Pharmacies
	requests: Requests
}

interface Pharmacies {
    id: string
    name: string
}

interface Requests {
	id: string
    fileUid: string
    pharmacy: string
	uid: string
}

export interface RootState {
	firebase: FirebaseReducer.Reducer<User>
	firestore: FirestoreReducer.Reducer<FirestoreDatabase>
}

const rootReducer = combineReducers<RootState>({
	firebase: firebaseReducer,
	firestore: firestoreReducer,
})

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer
