import rootReducer from "./reducers"
import { createStore, compose } from "redux"
import { createFirestoreInstance } from 'redux-firestore'
import { fbConfig } from '../firebase'
import firebase from 'firebase/compat/app'
declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
	}
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

firebase.initializeApp(fbConfig)
firebase.firestore()

const store = createStore(rootReducer, composeEnhancers())

const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true,
}

export const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance
}

export default store
