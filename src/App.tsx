import { BrowserRouter, Routes, Route } from "react-router-dom"
import PrivateRoute from "./components/login/PrivateRoute"
import Dashboard from "./components/pharmacy/Dashboard"
import SignIn from "./components/login/SignIn"
import SignUp from "./components/login/SignUp"

export default function App(): JSX.Element {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/signin" element={<SignIn />} />
				<Route path="/signup" element={<SignUp />} />
				<Route
					path="/"
					element={<PrivateRoute outlet={<Dashboard />} />}
				/>
			</Routes>
		</BrowserRouter>
	)
}
