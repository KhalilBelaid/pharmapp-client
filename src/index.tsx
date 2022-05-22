import 'bootstrap/dist/css/bootstrap.min.css'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import 'firebase/compat/firestore'
import store, { rrfProps } from './store'
import App from './App'

ReactDOM.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <App />
        </ReactReduxFirebaseProvider>
    </Provider>,
document.getElementById('root'))