import { useSelector } from 'react-redux'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import PrivateRoute from "./components/PrivateRoute"
import Dashboard from "./components/Dashboard"
import { RootState } from './store'
import SignInScreen from './components/SignInScreen'
import SignUpScreen from './components/SignUpScreen'

export default function App() : JSX.Element {
  const isAuthenticated = useSelector((state: RootState) => state.auth) !== null
  return (
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignInScreen />} />
            <Route path="/signup" element={<PrivateRoute cond={!isAuthenticated} outlet={<SignUpScreen />} /> } />
            <Route path="/dashboard" element={<PrivateRoute cond={isAuthenticated} outlet={<Dashboard />} /> } />
          </Routes>
      </BrowserRouter>
  )
}