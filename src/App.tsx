import {BrowserRouter, Routes, Route} from "react-router-dom"
import PrivateRoute from "./components/PrivateRoute"
import Dashboard from "./components/pharmacy/Dashboard"
import SignInScreen from './components/SignInScreen'
import SignUpScreen from './components/SignUpScreen'
import { AuthProvider } from "./contexts/AuthContext"

export default function App() : JSX.Element {
  return (
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/signin" element={<SignInScreen />} />
            <Route path="/signup" element={<SignUpScreen />} />
            <Route path="/" element={<PrivateRoute outlet={<Dashboard />}/> } />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
  )
}